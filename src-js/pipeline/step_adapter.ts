import type { YType } from '../index.js'
import { type DefinedStepItem, type InputType, type OutputType } from './pipeline.js'

/**
 * Wraps a step to handle both XType and DataFrame transparently
 */
class StepAdapter {
  constructor(
    private step: DefinedStepItem,
    private stepName: string,
  ) {}

  fit(x: InputType, y: YType): void {
    this.step.fit(x, y)
  }

  transform(x: InputType): OutputType {
    if ('transform' in this.step) {
      return this.step.transform(x)
    }
    throw new Error(`Step '${this.stepName}' does not have a transform method.`)
  }

  fitTransform(x: InputType, y: YType): OutputType {
    this.fit(x, y)
    return this.transform(x)
  }

  predict(x: InputType): YType {
    if ('predict' in this.step) {
      return this.step.predict(x)
    }
    throw new Error(`Step '${this.stepName}' does not have a predict method`)
  }

  get name(): string {
    return this.stepName
  }

  get isTransformer(): boolean {
    return 'transform' in this.step
  }

  get isPredictor(): boolean {
    return 'predict' in this.step
  }
}

export { StepAdapter }
