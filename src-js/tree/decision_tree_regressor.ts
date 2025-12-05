import { utilities, type InputType, type YType } from '../index.js'
import { type RsPredictor } from '../estimator.js'
import { DataFrame } from '../data_frame.js'
import {
  DecisionTreeRegressorBuilder,
  DecisionTreeRegressor as LibDecisionTreeRegressor,
  type DenseMatrixType,
  type TypedArrayType,
} from '../core-bindings/index.js'

interface IDecisionTreeRegressorBaseParameters {
  maxDepth?: number
  minSamplesLeaf?: bigint | number
  minSamplesSplit?: bigint | number
}

interface IDecisionTreeRegressorParameters extends IDecisionTreeRegressorBaseParameters {
  fitDataXType?: DenseMatrixType
  fitDataYType?: TypedArrayType
  columns?: string[]
}

interface HasColumns {
  columns: string[] | null
}

class DecisionTreeRegressor implements HasColumns {
  public static readonly className = 'DecisionTreeRegressor'
  public readonly name: string = DecisionTreeRegressor.className
  public readonly config: IDecisionTreeRegressorParameters

  private _isFitted: boolean = false
  private estimator: RsPredictor | null = null

  constructor(params?: IDecisionTreeRegressorParameters) {
    this.config = params || {}
  }

  private get fitDataXType(): DenseMatrixType {
    return this.config.fitDataXType ?? ('F32' as DenseMatrixType)
  }

  private get fitDataYType(): TypedArrayType {
    return (this.config.fitDataYType ?? 'F32') as TypedArrayType
  }

  get columns(): string[] | null {
    return this.config.columns ?? null
  }

  fit(x: InputType, y: YType): this {
    let matrix = utilities.inputTypeToDenseMatrix(x, {
      columns: this.config.columns,
      numberType: this.fitDataXType,
    })
    const yWrapped = utilities.arrayToTypedArray(y, { numberType: this.fitDataYType })
    const builder = new DecisionTreeRegressorBuilder(matrix, yWrapped)
    if (this.config.maxDepth !== undefined) {
      builder.withMaxDepth(this.config.maxDepth)
    }
    if (this.config.minSamplesLeaf !== undefined) {
      builder.withMinSamplesLeaf(BigInt(this.config.minSamplesLeaf))
    }
    if (this.config.minSamplesSplit !== undefined) {
      builder.withMinSamplesSplit(BigInt(this.config.minSamplesSplit))
    }
    this.estimator = builder.build()
    this._isFitted = true
    return this
  }

  protected getComponentColumnName(index: number): string {
    return `DecisionTreeRegressor${index + 1}`
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

  static deserialize(data: Buffer): DecisionTreeRegressor {
    let instance = new DecisionTreeRegressor()
    instance.estimator = LibDecisionTreeRegressor.deserialize(data)
    instance._isFitted = true
    return instance
  }
}

export { DecisionTreeRegressor, type IDecisionTreeRegressorBaseParameters }
