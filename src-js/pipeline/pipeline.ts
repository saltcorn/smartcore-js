import { dataFrame, type XType, type YType } from '../index.js'
import type { Estimator, Predictor, Transformer } from './index.js'
import { StepAdapter } from './step_adapter.js'

type DataFrame = dataFrame.DataFrame

type InputType = XType | DataFrame
type OutputType = XType | DataFrame

type TransformerType = Estimator<any, any, any> & Transformer<any>
type PredictorType = Estimator<any, any, any> & Predictor<any, any>

type StepItem = PredictorType | TransformerType | 'passthrough' | null
type NamedStep = [string, StepItem]
type DefinedStepItem = PredictorType | TransformerType
type Step = NamedStep | DefinedStepItem

interface PipelineConfig {
  verbose?: boolean
  memory?: boolean // For caching intermediate results
  validateOnConstruction?: boolean
}

class Pipeline {
  private readonly _steps: NamedStep[]
  private readonly _config: Required<PipelineConfig>
  private _isFitted: boolean = false
  private _cachedResults: Map<string, OutputType> = new Map()

  constructor(steps: Step[], config?: PipelineConfig) {
    this._config = {
      verbose: config?.verbose ?? false,
      memory: config?.memory ?? false,
      validateOnConstruction: config?.validateOnConstruction ?? true,
    }

    this._steps = this._normalizeSteps(steps)

    if (this._config.validateOnConstruction) {
      this._validateSteps()
    }
  }

  /**
   * Normalizes steps to named tuples
   * @param steps
   */
  private _normalizeSteps(steps: Step[]): NamedStep[] {
    if (steps.length === 0) {
      throw new Error('Pipeline cannot be empty. Provide at least one step.')
    }

    return steps.map((step, idx) => {
      // Already a named step
      if (Array.isArray(step)) {
        const [name, stepItem] = step
        if (typeof name !== 'string' || name.trim() === '') {
          throw new Error(`Step at index ${idx} has an invalid name: '${name}'.`)
        }
        return [name, stepItem] as NamedStep
      }

      // Create name from step
      if (step && typeof step === 'object' && 'name' in step) {
        return [`${step.name}${idx}`, step] as NamedStep
      }

      throw new Error(`Invalid step at index ${idx}. Expected NamedStep or object with 'name' property.`)
    })
  }

  private _validateSteps(): void {
    this._validateNotEmpty()
    this._validateUniqueNames()
    this._validateTransformers()
    this._validateFinalStep()
  }

  private _validateNotEmpty(): void {
    if (this._steps.length === 0) {
      throw new Error('Pipeline is empty. Please add at least one step.')
    }
  }

  private _validateUniqueNames(): void {
    const names = this._steps.map(([name]) => name)
    const uniqueNames = new Set(names)

    if (uniqueNames.size !== names.length) {
      const duplicates = names.filter((name, idx) => names.indexOf(name) !== idx)
      throw new Error(
        `Pipeline step names must be unique. Duplicate names found: ${[...new Set(duplicates)].join(', ')}.`,
      )
    }
  }

  private _validateTransformers(): void {
    const transformerSteps = this._steps.slice(0, -1)

    for (const [name, step] of transformerSteps) {
      if (step === null || step === 'passthrough') {
        continue
      }

      if (typeof step === 'string') {
        throw new Error(
          `Step '${name}' is an invalid string: '${step}'. Only 'passthrough' is allowed as a string value.`,
        )
      }

      if (!('transform' in step)) {
        throw new Error(
          `Intermediate step: '${name}' must be a transformer with a 'transform' method. Got: ${step.constructor?.name || typeof step}.`,
        )
      }

      if (!('fit' in step)) {
        throw new Error(`Step '${name}' must have a 'fit' method. Got: ${typeof step}`)
      }
    }
  }

  private _validateFinalStep(): void {
    const [name, finalStep] = this._steps[this._steps.length - 1]

    if (finalStep === null || finalStep === 'passthrough') {
      return
    }

    if (typeof finalStep === 'string') {
      throw new Error(
        `Final step '${name}' is an invalid string: '${finalStep}'. Only 'passthrough' is allowed as a string value.`,
      )
    }

    if (!('fit' in finalStep)) {
      throw new Error(`Final step '${name}' must have a 'fit' method. Got: ${typeof finalStep}`)
    }
  }

  /**
   * Iterates over pipeline steps
   * @param {boolean} withFinal - include the final step in the yielded values
   * @param {boolean} filterPassthrough - exclude steps whose value is 'passthrough' from the yielded steps
   */
  private *_iter(withFinal = true, filterPassthrough = true): Generator<[number, string, StepItem]> {
    let stopIdx = withFinal ? this._steps.length : this._steps.length - 1

    for (let i = 0; i < stopIdx; i++) {
      let [stepName, stepItem] = this._steps[i]

      // Skip null steps
      if (stepItem === null) {
        continue
      }

      // Handle passthrough
      if (stepItem === 'passthrough') {
        if (!filterPassthrough) {
          yield [i, stepName, stepItem]
        }
        continue
      }

      // Invalid string
      if (typeof stepItem === 'string') {
        throw new Error(`Invalid step '${stepName}': unexpected string '${stepItem}'`)
      }

      yield [i, stepName, stepItem]
    }
  }

  private _logMessage(stepName: string, stepIdx: number, totalSteps: number): void {
    if (!this._config.verbose) {
      return
    }
    const progress = totalSteps > 0 ? `(${stepIdx + 1}/${totalSteps})` : ''
    console.log(`[Pipeline] ${progress} Processing step: ${stepName}`)
  }

  private _logDataShape(data: InputType, label: string): void {
    if (!this._config.verbose) {
      return
    }

    if (data instanceof dataFrame.DataFrame) {
      console.log(`\t${label}: Dataframe(${data.rowsCount} x ${data.columnsCount})`)
    } else if (Array.isArray(data)) {
      console.log(`\tArray(${data.length} x ${data[0]?.length || 0})`)
    } else {
      console.log(`\t${label}: ${data?.constructor?.name || typeof data}`)
    }
  }

  /**
   * Fits and transforms a single step
   */
  private _fitTransformOne(adapter: StepAdapter, x: InputType, y: YType, stepIdx: number): OutputType {
    this._logMessage(adapter.name, stepIdx, this._steps.length)
    this._logDataShape(x, 'Input')

    const result = adapter.fitTransform(x, y)

    // Cache if memory is enabled
    if (this._config.memory) {
      this._cachedResults.set(adapter.name, result)
    }

    this._logDataShape(result, 'Output')
    return result
  }

  /**
   * Fits all estimators except the last one (transformers)
   */
  private _fit(x: InputType, y: YType): OutputType {
    let Xt: InputType | OutputType = x

    for (const [stepIdx, stepName, step] of this._iter(false, false)) {
      // Handle passthrough
      if (step === 'passthrough' || step === null) {
        this._logMessage(stepName, stepIdx, this._steps.length - 1)
        continue
      }

      const adapter = new StepAdapter(step, stepName)
      if (adapter.isTransformer) {
        Xt = this._fitTransformOne(adapter, Xt as InputType, y, stepIdx)
      } else {
        adapter.fit(Xt as InputType, y)
      }
    }

    return Xt as OutputType
  }

  /**
   * Fits the pipeline to data
   */
  fit(x: InputType, y: YType): Pipeline {
    if (this._config.verbose) {
      console.log(`[Pipeline] Starting fit with ${this._steps.length} steps`)
    }

    // Fit all transformers
    const Xt = this._fit(x, y)

    // Fit final estimator
    const [predictorName, predictor] = this._steps[this._steps.length - 1]

    if (predictor !== null && predictor !== 'passthrough') {
      if (typeof predictor === 'string') {
        throw new Error(`Invalid final step '${predictorName}': unexpected string '${predictor}'`)
      }

      this._logMessage(predictorName, this._steps.length - 1, this._steps.length)
      predictor.fit(Xt, y)
    }

    this._isFitted = true

    if (this._config.verbose) {
      console.log('[Pipeline] Fit complete')
    }

    return this
  }

  /**
   * Transforms data through fitted pipeline
   */
  transform(x: InputType): OutputType {
    if (!this._isFitted) {
      throw new Error("Pipeline must be fitted before calling 'transform'. Call 'fit' first.")
    }

    let Xt: InputType | OutputType = x

    for (const [stepIdx, stepName, step] of this._iter(false, false)) {
      if (step === 'passthrough' || step === null) {
        continue
      }

      const adapter = new StepAdapter(step, stepName)
      if (adapter.isTransformer) {
        Xt = this._transformOne(adapter, Xt as InputType, stepIdx)
      }
    }

    return Xt as OutputType
  }

  /**
   * Transforms data through a fitted step
   */
  private _transformOne(adapter: StepAdapter, x: InputType, stepIdx: number): OutputType {
    this._logMessage(adapter.name, stepIdx, this._steps.length)

    // Use cache if available
    if (this._config.memory && this._cachedResults.has(adapter.name)) {
      if (this._config.verbose) {
        console.log(`\tUsing cached result for '${adapter.name}'`)
      }
      return this._cachedResults.get(adapter.name)!
    }

    return adapter.transform(x)
  }

  /**
   * Predicts using the final estimator
   */
  predict(x: InputType): YType {
    if (!this._isFitted) {
      throw new Error("Pipeline must be fitted before calling 'predict'. Call 'fit' first.")
    }

    // Transform through all steps except final
    const Xt = this.transform(x)

    // Predict with final estimator
    let [predictorName, predictor] = this._steps[this._steps.length - 1]

    if (predictor === null || predictor === 'passthrough') {
      throw new Error('Cannot predict: final step is to null or passthrough. Pipeline must end with a predictor')
    }

    if (typeof predictor === 'string') {
      throw new Error(`Invalid final step '${predictorName}': unexpected string '${predictor}'`)
    }

    const adapter = new StepAdapter(predictor, predictorName)
    if (!adapter.isPredictor) {
      throw new Error(
        `Final step '${predictorName}' does not have a 'predict' method. Got: ${predictor.constructor?.name || typeof predictor}`,
      )
    }

    return adapter.predict(Xt)
  }
}

export type { Step, DefinedStepItem, InputType, OutputType, PipelineConfig, StepItem, NamedStep }
export { Pipeline, StepAdapter }
