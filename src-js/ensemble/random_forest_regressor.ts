import {
  RandomForestRegressorF64BigI64,
  RandomForestRegressorF64BigU64,
  RandomForestRegressorF64I64,
  RandomForestRegressorParameters,
} from '../../core-bindings/index.js'
import type { SplitCriterion } from '../../core-bindings/index.js'
import type { YType } from '../index.js'
import { DenseMatrix, type DenseMatrixRs } from '../linalg/index.js'
import { BasePredictor } from '../base_predictor.js'
import { type YTypeKey } from '../base_estimator.js'

interface IRandomForestRegressorParameters {
  criterion?: SplitCriterion
  maxDepth?: number
  minSamplesLeaf?: bigint
  minSamplesSplit?: bigint
  nTrees?: number
  m?: number
  keepSamples?: boolean
  seed?: number
}

type RandomForestRegressorRs =
  | RandomForestRegressorF64I64
  | RandomForestRegressorF64BigI64
  | RandomForestRegressorF64BigU64

type RandomForestRegressorParametersRs = RandomForestRegressorParameters

interface RandomForestRegressorSerializedData {
  columns: string[] | null
  data: Buffer
  params: IRandomForestRegressorParameters
  yType: YTypeKey
}

interface EstimatorClass {
  fit(matrix: DenseMatrixRs, y: YType, params: RandomForestRegressorParametersRs): RandomForestRegressorRs
  deserialize(data: Buffer): RandomForestRegressorRs
}

class RandomForestRegressor extends BasePredictor<RandomForestRegressorRs, RandomForestRegressorParametersRs, YType> {
  public static readonly className = 'RandomForestRegressor'
  public readonly name: string = RandomForestRegressor.className
  public readonly config: IRandomForestRegressorParameters

  private estimatorClasses: Record<YTypeKey, EstimatorClass | null>

  constructor(params?: IRandomForestRegressorParameters) {
    const parameters = new RandomForestRegressorParameters()
    const config = params || {}
    if (config) {
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
      if (config.seed !== undefined) {
        parameters.withSeed(config.seed)
      }
    }
    super(parameters)
    this.config = config
    this.estimatorClasses = {
      bigI64: RandomForestRegressorF64BigI64,
      bigU64: RandomForestRegressorF64BigU64,
      i64: RandomForestRegressorF64I64,
      f64: null,
    }
  }

  protected fitEstimator(matrix: DenseMatrix, y: YType): RandomForestRegressorRs {
    const EstimatorClass = this.estimatorClasses[this._yType!]
    if (EstimatorClass !== null) {
      return EstimatorClass.fit(matrix.asF64(), y, this.parameters)
    } else {
      throw new Error(`${this.name}: Unsupported data type for y '${y.constructor?.name || typeof y}'`)
    }
  }

  protected getComponentColumnName(index: number): string {
    return `RFR${index + 1}`
  }

  predictMatrix(matrix: DenseMatrix): YType {
    return this.estimator!.predict(matrix.asF64())
  }

  serialize(): RandomForestRegressorSerializedData {
    this.ensureFitted('serialize')

    return {
      columns: this.columns,
      data: this.estimator!.serialize(),
      params: this.config,
      yType: this._yType!,
    }
  }

  static deserialize(data: RandomForestRegressorSerializedData): RandomForestRegressor {
    let instance = new RandomForestRegressor(data.params)
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

export { RandomForestRegressor }
