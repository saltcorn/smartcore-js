import type { XType, YType } from '../index.js'
import type { Estimator, Predictor, Transformer } from './index.js'

type TransformerType = Estimator<any, any, any> & Transformer<any>
type PredictorType = Estimator<any, any, any> & Predictor<any, any>

type StepItem = PredictorType | TransformerType | string | null

type NamedStep = [string, StepItem]
type DefinedStepItem = PredictorType | TransformerType
type Step = NamedStep | DefinedStepItem

class Pipeline {
  steps: NamedStep[]
  verbose = false

  constructor(steps: Step[]) {
    let namedSteps = steps.map((step, idx) => {
      if (step instanceof Array) return step
      return [`${step.name}${idx}`, step] as NamedStep
    })
    this.steps = namedSteps
  }

  private _validateNames(names: string[]) {
    let namesSet = new Set(names)
    if (namesSet.size !== names.length) {
      throw new Error(`Names provided are not unique: ${names.join(', ')}`)
    }
  }

  private _makeErrorMessage(t: any): string {
    return `All intermediate steps should be transformers and implement fit and transform
or be the string 'passthrough'. '${t}' (type ${typeof t}) doesn't/isn't`
  }

  private _validateSteps() {
    if (this.steps.length === 0) {
      throw new Error('The pipeline is empty. Please add steps.')
    }

    let [names, estimators] = this.steps.reduce(
      (acc: [string[], StepItem[]], c) => {
        acc[0].push(c[0])
        acc[1].push(c[1])
        return acc
      },
      [[], []] as [string[], StepItem[]],
    )

    this._validateNames(names)

    let transformers = estimators.slice(0, -1)
    let estimator = estimators.slice(-1)[0]

    for (let t of transformers) {
      if (t === null || t === 'passthorough') {
        continue
      }
      if (typeof t === 'string') {
        throw new Error(this._makeErrorMessage(t))
      }
      if (!('transform' in t)) {
        throw new Error(this._makeErrorMessage(t))
      }
    }

    if (estimator !== null && estimator !== 'passthrough') {
      if (typeof estimator === 'string') {
        throw new Error(this._makeErrorMessage(estimator))
      }
    }
  }

  private *_iter(withFinal = true, filterPassthrough = true): Generator<[number, string, StepItem]> {
    let stop = this.steps.length
    if (!withFinal) {
      stop -= 1
    }
    for (let i = 0; i < stop; i++) {
      let stepName = this.steps[i][0]
      let stepItem = this.steps[i][1]
      if (stepItem === null || (typeof stepItem === 'string' && stepItem !== 'passthrough')) {
        continue
      }
      if (typeof stepItem === 'string' && stepItem !== 'passthrough') {
        throw new Error(this._makeErrorMessage(stepItem))
      }
      if (!filterPassthrough) {
        yield [i, stepName, stepItem]
      } else if (stepItem !== 'passthrough') {
        yield [i, stepName, stepItem]
      }
    }
  }

  private _logMessage(name: string, idx: number, total: number) {
    if (!this.verbose) {
      return
    }
    console.log(`(step ${idx} of ${total}) Processing ${name}`)
  }

  private _fitTransformOne(transformer: TransformerType, x: XType, y: YType): XType {
    return transformer.fit(x, y).transform(x)
  }

  private _fit(x: XType, y: YType): XType {
    this._validateSteps()
    for (let [stepIdx, name, transformer] of this._iter(false, false)) {
      if (transformer === null || transformer === 'passthrough') {
        this._logMessage(name, stepIdx, this.steps.length - 1)
        continue
      }
      if (typeof transformer === 'string') {
        throw new Error(this._makeErrorMessage(transformer))
      }
      if ('transform' in transformer) {
        x = this._fitTransformOne(transformer, x, y)
      }
    }
    return x
  }

  fit(x: XType, y: YType): Pipeline {
    let Xt = this._fit(x, y)
    let [predictorName, predictor] = this.steps.slice(-1)[0]
    if (predictor === null || predictor === 'passthrough') {
      return this
    }
    if (typeof predictor === 'string') {
      throw new Error(this._makeErrorMessage(predictor))
    }
    this._logMessage(predictorName, this.steps.length - 1, this.steps.length - 1)
    predictor.fit(Xt, y)
    return this
  }

  predict(x: XType): YType {
    let [, predictor] = this.steps.slice(-1)[0]
    if (predictor === null || predictor === 'passthrough') {
      throw new Error('Predictor is set to null or passthrough.')
    }
    if (typeof predictor === 'string') {
      throw new Error(this._makeErrorMessage(predictor))
    }
    if (!('predict' in predictor)) {
      throw new Error('Supplied predictor is missing the "predict" function.')
    }
    return predictor.predict(x)
  }
}

export type { Step }
export { Pipeline }

// let pipeline = new Pipeline([
//   ['bfr', new BaseForestRegressor()],
//   ['bfc', new BaseForestClassifier()],
// ])
