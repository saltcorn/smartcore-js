import {
  RandomForestClassifierF64BigI64,
  RandomForestClassifierF64BigU64,
  RandomForestClassifierF64I64,
  RandomForestClassifierParameters,
  type SplitCriterion,
} from '../core-bindings/index.js'
import type { YType } from '../index.js'
import { DenseMatrix, type DenseMatrixRs } from '../linalg/index.js'
import { BasePredictor } from '../base_predictor.js'
import { type YTypeKey } from '../base_estimator.js'

interface IRandomForestClassifierParameters {
  criterion?: SplitCriterion
  maxDepth?: number
  minSamplesLeaf?: bigint
  minSamplesSplit?: bigint
  nTrees?: number
  m?: number
  keepSamples?: boolean
}

type RandomForestClassifierRs =
  | RandomForestClassifierF64I64
  | RandomForestClassifierF64BigI64
  | RandomForestClassifierF64BigU64

type RandomForestClassifierParametersRs = RandomForestClassifierParameters

interface RandomForestClassifierSerializedData {
  columns: string[] | null
  data: Buffer
  params: IRandomForestClassifierParameters
  yType: YTypeKey
}

interface EstimatorClass {
  fit(matrix: DenseMatrixRs, y: YType, params: RandomForestClassifierParametersRs): RandomForestClassifierRs
  deserialize(data: Buffer): RandomForestClassifierRs
}

class RandomForestClassifier extends BasePredictor<
  RandomForestClassifierRs,
  RandomForestClassifierParametersRs,
  YType
> {
  public static readonly className = 'RandomForestClassifier'
  public readonly name: string = RandomForestClassifier.className
  public readonly config: IRandomForestClassifierParameters

  private estimatorClasses: Record<YTypeKey, EstimatorClass | null>

  constructor(params?: IRandomForestClassifierParameters) {
    const parameters = new RandomForestClassifierParameters()
    const config = params || {}
    if (config) {
      if (config.criterion !== undefined) {
        parameters.withCriterion(config.criterion)
      }
      if (config.maxDepth !== undefined) {
        parameters.withMaxDepth(config.maxDepth)
      }
      if (config.minSamplesLeaf !== undefined) {
        parameters.withMinSamplesLeaf(config.minSamplesLeaf)
      }
      if (config.minSamplesSplit !== undefined) {
        parameters.withMinSamplesSplit(config.minSamplesSplit)
      }
      if (config.nTrees !== undefined) {
        parameters.withNTrees(config.nTrees)
      }
      if (config.m !== undefined) {
        parameters.withM(config.m)
      }
      if (config.keepSamples !== undefined) {
        parameters.withKeepSamples(config.keepSamples)
      }
    }
    super(parameters)
    this.config = config
    this.estimatorClasses = {
      bigI64: RandomForestClassifierF64BigI64,
      bigU64: RandomForestClassifierF64BigU64,
      i64: RandomForestClassifierF64I64,
      f64: null,
    }
  }

  protected fitEstimator(matrix: DenseMatrix, y: YType): RandomForestClassifierRs {
    const EstimatorClass = this.estimatorClasses[this._yType!]
    if (EstimatorClass !== null) {
      return EstimatorClass.fit(matrix.asF64(), y, this.parameters)
    } else {
      throw new Error(`${this.name}: Unsupported data type for y '${y.constructor?.name || typeof y}'`)
    }
  }

  protected getComponentColumnName(index: number): string {
    return `RFC${index + 1}`
  }

  predictMatrix(matrix: DenseMatrix): YType {
    return this.estimator!.predict(matrix.asF64())
  }

  serialize(): RandomForestClassifierSerializedData {
    this.ensureFitted('serialize')

    return {
      columns: this.columns,
      data: this.estimator!.serialize(),
      params: this.config,
      yType: this._yType!,
    }
  }

  static deserialize(data: RandomForestClassifierSerializedData): RandomForestClassifier {
    let instance = new RandomForestClassifier(data.params)
    const EstimatorClass = instance.estimatorClasses[data.yType]
    if (EstimatorClass === null) {
      throw new Error(`${this.name}: Unexpected yType value '${data.yType}'`)
    }
    instance.estimator = EstimatorClass.deserialize(data.data)
    instance._isFitted = true
    instance._yType = data.yType
    return instance
  }
}

export { RandomForestClassifier }
