import { utilities, type InputType, type YType } from '../../index.js'
import { type RsPredictor } from '../../estimator.js'
import { DataFrame } from '../../data_frame.js'
import {
  RandomForestRegressorBuilder,
  RandomForestRegressor as LibRandomForestRegressor,
  type DenseMatrixType,
  type TypedArrayType,
} from '../../core-bindings/index.js'

interface IRandomForestRegressorBaseParameters {
  maxDepth?: number
  minSamplesLeaf?: bigint | number
  minSamplesSplit?: bigint | number
  nTrees?: number
  m?: number
  keepSamples?: boolean
  seed?: number
}

interface IRandomForestRegressorParameters extends IRandomForestRegressorBaseParameters {
  fitDataXType?: DenseMatrixType
  fitDataYType?: TypedArrayType
  columns?: string[]
}

interface RandomForestRegressorSerializedData {
  config: IRandomForestRegressorParameters
  data: Buffer
}

interface HasColumns {
  columns: string[] | null
}

class RandomForestRegressor implements HasColumns {
  public static readonly className = 'RandomForestRegressor'
  public readonly name: string = RandomForestRegressor.className
  public readonly config: IRandomForestRegressorParameters

  private _isFitted: boolean = false
  private estimator: RsPredictor | null = null

  constructor(params?: IRandomForestRegressorParameters) {
    this.config = params || {}
    this.config.fitDataXType = this.config.fitDataXType ?? ('F32' as DenseMatrixType)
    this.config.fitDataYType = this.config.fitDataYType ?? ('F32' as TypedArrayType)
  }

  get columns(): string[] | null {
    return this.config.columns ?? null
  }

  fit(x: InputType, y: YType): this {
    let matrix
    if (x instanceof DataFrame && this.columns !== null && this.columns.length !== 0)
      matrix = utilities.dataFrameToDenseMatrix(x, this.columns)
    else matrix = utilities.inputTypeToDenseMatrix(x)
    const yWrapped = utilities.wrapTypedArray(utilities.arrayToTypedArray(y))
    const builder = new RandomForestRegressorBuilder(matrix, yWrapped)
    if (this.config.maxDepth !== undefined) {
      builder.withMaxDepth(this.config.maxDepth)
    }
    if (this.config.minSamplesLeaf !== undefined) {
      builder.withMinSamplesLeaf(BigInt(this.config.minSamplesLeaf))
    }
    if (this.config.minSamplesSplit !== undefined) {
      builder.withMinSamplesSplit(BigInt(this.config.minSamplesSplit))
    }
    if (this.config.nTrees !== undefined) {
      builder.withNTrees(BigInt(this.config.nTrees))
    }
    if (this.config.m !== undefined) {
      builder.withM(BigInt(this.config.m))
    }
    if (this.config.keepSamples !== undefined) {
      builder.withKeepSamples(this.config.keepSamples)
    }
    if (this.config.seed !== undefined) {
      builder.withSeed(BigInt(this.config.seed))
    }
    this.estimator = builder.build()
    this._isFitted = true
    return this
  }

  protected getComponentColumnName(index: number): string {
    return `RandomForestRegressor${index + 1}`
  }

  protected ensureFitted(methodName: string): void {
    if (!this._isFitted || this.estimator === null) {
      throw new Error(`${this.name}: Cannot call '${methodName}' before calling 'fit'. Please fit the model first.`)
    }
  }

  predict(x: InputType): YType {
    this.ensureFitted('predict')
    if (x instanceof DataFrame) {
      const columns = Array.isArray(this.columns) ? this.columns : x.columnNames
      const matrix = utilities.dataFrameToDenseMatrix(x, columns)
      return this.estimator!.predict(matrix).field0
    }
    const matrixRs = utilities.inputTypeToDenseMatrix(x)
    return this.estimator!.predict(matrixRs).field0
  }

  serialize(): RandomForestRegressorSerializedData {
    this.ensureFitted('serialize')

    return {
      data: this.estimator!.serialize(),
      config: this.config,
    }
  }

  private _deserialize(data: Buffer): this {
    if (this._isFitted) {
      throw new Error("Cannot call 'deserialize' on a fitted instance!")
    }
    this.estimator = LibRandomForestRegressor.deserialize(data)
    return this
  }

  static deserialize(data: RandomForestRegressorSerializedData): RandomForestRegressor {
    let instance = new RandomForestRegressor(data.config)
    instance._deserialize(data.data)
    instance._isFitted = true
    return instance
  }
}

export { RandomForestRegressor, type IRandomForestRegressorBaseParameters }
