import { utilities, type InputType, type YType } from '../index.js'
import { type RsPredictor } from '../estimator.js'
import { DataFrame } from '../data_frame.js'
import {
  ExtraTreesRegressor as LibExtraTreesRegressor,
  ExtraTreesRegressorBuilder,
  type DenseMatrixType,
  type ExtraTreesRegressorPredictOutputType,
  type TypedArrayType,
} from '../core-bindings/index.js'

interface IExtraTreesRegressorBaseParameters {
  maxDepth?: number
  minSamplesLeaf?: bigint | number
  minSamplesSplit?: bigint | number
  nTrees?: bigint | number
  m?: bigint | number
  keepSamples?: boolean
  seed?: bigint | number
}

interface IExtraTreesRegressorParameters extends IExtraTreesRegressorBaseParameters {
  fitDataXType?: DenseMatrixType
  fitDataYType?: ExtraTreesRegressorPredictOutputType
  columns?: string[]
}

interface HasColumns {
  columns: string[] | null
}

class ExtraTreesRegressor implements HasColumns {
  public static readonly className = 'ExtraTreesRegressor'
  public readonly name: string = ExtraTreesRegressor.className
  public readonly config: IExtraTreesRegressorParameters

  private _isFitted: boolean = false
  private estimator: RsPredictor | null = null

  constructor(params?: IExtraTreesRegressorParameters) {
    this.config = params || {}
    this.config.fitDataXType = this.config.fitDataXType ?? ('F32' as DenseMatrixType)
    this.config.fitDataYType = this.config.fitDataYType ?? ('F32' as ExtraTreesRegressorPredictOutputType)
  }

  get columns(): string[] | null {
    return this.config.columns ?? null
  }

  private get fitDataXType(): DenseMatrixType {
    return this.config.fitDataXType ?? ('F32' as DenseMatrixType)
  }

  private get fitDataYType(): TypedArrayType {
    return (this.config.fitDataYType ?? 'F32') as TypedArrayType
  }

  fit(x: InputType, y: YType): this {
    let matrix = utilities.inputTypeToDenseMatrix(x, {
      columns: this.config.columns,
      numberType: this.config.fitDataXType,
    })
    let yWrapped = utilities.arrayToTypedArray(y, { numberType: this.fitDataYType })
    const builder = new ExtraTreesRegressorBuilder(matrix, yWrapped)
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
    return `ExtraTreesRegressor${index + 1}`
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
      const matrix = utilities.dataFrameToDenseMatrix(x, { columns, numberType: this.fitDataXType })
      return this.estimator!.predict(matrix).field0
    }
    const matrixRs = utilities.inputTypeToDenseMatrix(x, {
      columns: this.config.columns,
      numberType: this.fitDataXType,
    })
    return this.estimator!.predict(matrixRs).field0
  }

  serialize(): Buffer {
    this.ensureFitted('serialize')
    return this.estimator!.serialize()
  }

  static deserialize(data: Buffer): ExtraTreesRegressor {
    const instance = new ExtraTreesRegressor()
    instance.estimator = LibExtraTreesRegressor.deserialize(data)
    instance._isFitted = true
    return instance
  }
}

export { ExtraTreesRegressor, type IExtraTreesRegressorBaseParameters }
