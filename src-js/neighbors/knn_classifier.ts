import { utilities, type InputType, type YType } from '../index.js'
import { type RsPredictor } from '../estimator.js'
import { DataFrame } from '../data_frame.js'
import {
  type KNNAlgorithmName,
  type KNNWeightFunction,
  KNNClassifier as LibKNNClassifier,
  KNNClassifierBuilder,
  type DenseMatrixType,
  type TypedArrayType,
  type DistanceVariantType,
} from '../core-bindings/index.js'

interface IKNNClassifierBaseParameters {
  k?: number
  algorithm?: KNNAlgorithmName
  weight?: KNNWeightFunction
  data?: InputType
  p?: number
}

interface IKNNClassifierParameters extends IKNNClassifierBaseParameters {
  fitDataXType?: DenseMatrixType
  fitDataYType?: TypedArrayType
  distanceType?: DistanceVariantType
  columns?: string[]
}

interface HasColumns {
  columns: string[] | null
}

class KNNClassifier implements HasColumns {
  public static readonly className = 'KNNClassifier'
  public readonly name: string = KNNClassifier.className
  public readonly config: IKNNClassifierParameters = {}

  private _isFitted: boolean = false
  private estimator: RsPredictor | null = null

  constructor(params?: IKNNClassifierParameters) {
    this.config = params ?? {}
  }

  private get fitDataXType(): DenseMatrixType {
    return this.config.fitDataXType ?? ('F32' as DenseMatrixType)
  }

  private get fitDataYType(): TypedArrayType {
    return (this.config.fitDataYType ?? 'I32') as TypedArrayType
  }

  get columns(): string[] | null {
    return this.config.columns ?? null
  }

  fit(x: InputType, y: YType): this {
    const matrix = utilities.inputTypeToDenseMatrix(x, {
      columns: this.config.columns,
      numberType: this.fitDataXType,
    })
    const yWrapped = utilities.arrayToTypedArray(y, { numberType: this.fitDataYType })
    const builder = new KNNClassifierBuilder(matrix, yWrapped)
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
    return `KNNClassifier${index + 1}`
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

  static deserialize(data: Buffer): KNNClassifier {
    const instance = new KNNClassifier()
    instance.estimator = LibKNNClassifier.deserialize(data)
    instance._isFitted = true
    return instance
  }
}

export { KNNClassifier, type IKNNClassifierBaseParameters }
