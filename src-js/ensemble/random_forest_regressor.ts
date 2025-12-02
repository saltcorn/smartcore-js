import { utilities, type InputType, type YType } from '../index.js'
import { type RsPredictor } from '../estimator.js'
import { DataFrame } from '../data_frame.js'
import {
  RandomForestRegressorBuilder,
  RandomForestRegressor as LibRandomForestRegressor,
  type DenseMatrixType,
  type TypedArrayType,
} from '../core-bindings/index.js'

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
    let matrix = utilities.inputTypeToDenseMatrix(x, {
      columns: this.config.columns,
      numberType: this.config.fitDataXType,
    })
    const yWrapped = utilities.wrapTypedArray(utilities.arrayToTypedArray(y, { numberType: this.config.fitDataYType }))
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
      const matrix = utilities.dataFrameToDenseMatrix(x, { columns, numberType: this.config.fitDataXType })
      return this.estimator!.predict(matrix).field0
    }
    const matrixRs = utilities.inputTypeToDenseMatrix(x, {
      columns: this.config.columns,
      numberType: this.config.fitDataXType,
    })
    return this.estimator!.predict(matrixRs).field0
  }

  serialize(): Buffer {
    this.ensureFitted('serialize')
    return this.estimator!.serialize()
  }

  static deserialize(data: Buffer): RandomForestRegressor {
    let instance = new RandomForestRegressor()
    instance.estimator = LibRandomForestRegressor.deserialize(data)
    instance._isFitted = true
    return instance
  }
}

export { RandomForestRegressor, type IRandomForestRegressorBaseParameters }
