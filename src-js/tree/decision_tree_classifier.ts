import { utilities, type InputType, type YType } from '../index.js'
import { type RsPredictor } from '../estimator.js'
import { DataFrame } from '../data_frame.js'
import {
  DecisionTreeClassifier as LibDecisionTreeClassifier,
  DecisionTreeClassifierBuilder,
  type DenseMatrixType,
  type SplitCriterion,
  type TypedArrayType,
} from '../core-bindings/index.js'

interface IDecisionTreeClassifierBaseParameters {
  splitCriterion?: SplitCriterion
  maxDepth?: number
  minSamplesLeaf?: bigint | number
  minSamplesSplit?: bigint | number
}

interface IDecisionTreeClassifierParameters extends IDecisionTreeClassifierBaseParameters {
  fitDataXType?: DenseMatrixType
  fitDataYType?: TypedArrayType
  columns?: string[]
}

interface HasColumns {
  columns: string[] | null
}

class DecisionTreeClassifier implements HasColumns {
  public static readonly className = 'DecisionTreeClassifier'
  public readonly name: string = DecisionTreeClassifier.className
  public readonly config: IDecisionTreeClassifierParameters

  private _isFitted: boolean = false
  private estimator: RsPredictor | null = null

  constructor(params?: IDecisionTreeClassifierParameters) {
    this.config = params || {}
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
    let matrix = utilities.inputTypeToDenseMatrix(x, {
      columns: this.config.columns,
      numberType: this.fitDataXType,
    })
    const yWrapped = utilities.arrayToTypedArray(y, { numberType: this.fitDataYType })
    const builder = new DecisionTreeClassifierBuilder(matrix, yWrapped)
    if (this.config.splitCriterion !== undefined) builder.withCriterion(this.config.splitCriterion)
    if (this.config.maxDepth !== undefined) builder.withMaxDepth(this.config.maxDepth)
    if (this.config.minSamplesLeaf !== undefined) builder.withMinSamplesLeaf(BigInt(this.config.minSamplesLeaf))
    if (this.config.minSamplesSplit !== undefined) builder.withMinSamplesSplit(BigInt(this.config.minSamplesSplit))

    this.estimator = builder.build()
    this._isFitted = true
    return this
  }

  protected getComponentColumnName(index: number): string {
    return `DecisionTreeClassifier${index + 1}`
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

  static deserialize(data: Buffer): DecisionTreeClassifier {
    let instance = new DecisionTreeClassifier()
    instance.estimator = LibDecisionTreeClassifier.deserialize(data)
    instance._isFitted = true
    return instance
  }
}

export { DecisionTreeClassifier, type IDecisionTreeClassifierBaseParameters }
