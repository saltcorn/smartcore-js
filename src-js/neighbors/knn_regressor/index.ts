import { utilities, type InputType, type YType } from '../../index.js'
import { type RsPredictor } from '../../estimator.js'
import { DataFrame } from '../../data_frame.js'
import {
  KNNRegressor as LibKNNRegressor,
  KNNRegressorBuilder,
  type DenseMatrixType,
  type TypedArrayType,
  type KNNAlgorithmName,
  type KNNWeightFunction,
  type DistanceVariantType,
} from '../../core-bindings/index.js'

interface IKNNRegressorBaseParameters {
  k?: number
  algorithm?: KNNAlgorithmName
  weight?: KNNWeightFunction
  data?: InputType
  p?: number
}

interface IKNNRegressorParameters extends IKNNRegressorBaseParameters {
  fitDataXType?: DenseMatrixType
  fitDataYType?: TypedArrayType
  distanceType?: DistanceVariantType
  columns?: string[]
}

interface KNNRegressorSerializedData {
  config: IKNNRegressorParameters
  data: Buffer
}

interface HasColumns {
  columns: string[] | null
}

class KNNRegressor implements HasColumns {
  public static readonly className = 'KNNRegressor'
  public readonly name: string = KNNRegressor.className
  public readonly config: IKNNRegressorParameters = {}

  private _isFitted: boolean = false
  private estimator: RsPredictor | null = null

  constructor(params?: IKNNRegressorParameters) {
    this.config = params ?? {}
    this.config.fitDataXType = this.config.fitDataXType ?? ('F32' as DenseMatrixType)
    this.config.fitDataYType = this.config.fitDataYType ?? ('F32' as TypedArrayType)
  }

  get columns(): string[] | null {
    return this.config.columns ?? null
  }

  fit(x: InputType, y: YType): this {
    const matrix = utilities.inputTypeToDenseMatrix(x, {
      columns: this.config.columns,
      numberType: this.config.fitDataXType,
    })
    const yWrapped = utilities.wrapTypedArray(utilities.arrayToTypedArray(y, { numberType: this.config.fitDataYType }))
    const builder = new KNNRegressorBuilder(matrix, yWrapped)
    if (this.config.k !== undefined) {
      builder.withK(BigInt(this.config.k))
    }
    if (this.config.algorithm !== undefined) {
      builder.withAlgorithm(this.config.algorithm)
    }
    if (this.config.weight !== undefined) {
      builder.withWeight(this.config.weight)
    }
    if (this.config.distanceType !== undefined) {
      builder.withDistanceType(this.config.distanceType)
    }
    if (this.config.p !== undefined) {
      builder.withP(this.config.p)
    }
    if (this.config.data !== undefined) {
      builder.withData(utilities.inputTypeToDenseMatrix(this.config.data))
    }
    this.estimator = builder.build()
    this._isFitted = true
    return this
  }

  protected getComponentColumnName(index: number): string {
    return `KNNRegressor${index + 1}`
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

  serialize(): KNNRegressorSerializedData {
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
    this.estimator = LibKNNRegressor.deserialize(data)
    return this
  }

  static deserialize(data: KNNRegressorSerializedData): KNNRegressor {
    let instance = new KNNRegressor(data.config)
    instance._deserialize(data.data)
    instance._isFitted = true
    return instance
  }
}

export { KNNRegressor, type IKNNRegressorBaseParameters }
