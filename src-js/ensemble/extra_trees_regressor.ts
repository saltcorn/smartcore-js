import {
  ExtraTreesRegressorF64BigU64,
  ExtraTreesRegressorF64BigI64,
  ExtraTreesRegressorF64I64,
  ExtraTreesRegressorParameters,
  ExtraTreesRegressorF64F64,
} from '../../core-bindings/index.js'
import type { YType } from '../index.js'
import { DenseMatrix, type DenseMatrixRs } from '../linalg/index.js'
import { BasePredictor } from '../base_predictor.js'
import { type YTypeKey } from '../base_estimator.js'

interface IExtraTreesRegressorParameters {
  maxDepth?: number
  minSamplesLeaf?: bigint
  minSamplesSplit?: bigint
  nTrees?: number
  m?: number
  keepSamples?: boolean
  seed?: number
}

type ExtraTreesRegressorRs =
  | ExtraTreesRegressorF64I64
  | ExtraTreesRegressorF64BigI64
  | ExtraTreesRegressorF64F64
  | ExtraTreesRegressorF64BigU64

type ExtraTreesRegressorParametersRs = ExtraTreesRegressorParameters

interface EstimatorClass {
  fit(matrix: DenseMatrixRs, y: YType, params: ExtraTreesRegressorParametersRs): ExtraTreesRegressorRs
  deserialize(data: Buffer): ExtraTreesRegressorRs
}

interface ExtraTreesRegressorSerializedData {
  columns: string[] | null
  data: Buffer
  params: IExtraTreesRegressorParameters
  yType: YTypeKey
}

class ExtraTreesRegressor extends BasePredictor<ExtraTreesRegressorRs, ExtraTreesRegressorParametersRs, YType> {
  public static readonly className = 'ExtraTreesRegressor'
  public readonly name: string = ExtraTreesRegressor.className
  public readonly config: IExtraTreesRegressorParameters
  private estimatorClasses: Record<YTypeKey, EstimatorClass>

  constructor(params?: IExtraTreesRegressorParameters) {
    const parameters = new ExtraTreesRegressorParameters()
    const config = params || {}
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
    super(parameters)
    this.config = config

    this.estimatorClasses = {
      i64: ExtraTreesRegressorF64I64,
      bigI64: ExtraTreesRegressorF64BigI64,
      f64: ExtraTreesRegressorF64F64,
      bigU64: ExtraTreesRegressorF64BigU64,
    }
  }

  protected fitEstimator(matrix: DenseMatrix, y: YType): ExtraTreesRegressorRs {
    const EstimatorClass = this.estimatorClasses[this._yType!]
    if (EstimatorClass !== null) {
      return EstimatorClass.fit(matrix.asF64(), y, this.parameters)
    } else {
      throw new Error(`${this.name}: Unsupported data type for y '${y.constructor?.name || typeof y}'`)
    }
  }

  protected getComponentColumnName(index: number): string {
    return `LR${index + 1}`
  }

  predictMatrix(matrix: DenseMatrix): YType {
    return this.estimator!.predict(matrix.asF64())
  }

  serialize(): ExtraTreesRegressorSerializedData {
    this.ensureFitted('serialize')

    return {
      columns: this.columns,
      data: this.estimator!.serialize(),
      params: this.config,
      yType: this._yType!,
    }
  }

  static deserialize(data: ExtraTreesRegressorSerializedData): ExtraTreesRegressor {
    let instance = new ExtraTreesRegressor(data.params)
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

export { ExtraTreesRegressor }
