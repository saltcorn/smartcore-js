import { utilities, type InputType, type YType } from '../index.js'
import { type RsPredictor } from '../estimator.js'
import { DataFrame } from '../data_frame.js'
import {
  RandomForestClassifier as LibRandomForestClassifier,
  RandomForestClassifierBuilder,
  type DenseMatrixType,
  type SplitCriterion,
  type TypedArrayType,
} from '../core-bindings/index.js'

interface IRandomForestClassifierBaseParameters {
  splitCriterion?: SplitCriterion
  maxDepth?: number
  minSamplesLeaf?: bigint | number
  minSamplesSplit?: bigint | number
  nTrees?: number
  m?: bigint | number
  keepSamples?: boolean
  seed?: bigint | number
}

interface IRandomForestClassifierParameters extends IRandomForestClassifierBaseParameters {
  fitDataXType?: DenseMatrixType
  fitDataYType?: TypedArrayType
  columns?: string[]
}

interface HasColumns {
  columns: string[] | null
}

class RandomForestClassifier implements HasColumns {
  public static readonly className = 'RandomForestClassifier'
  public readonly name: string = RandomForestClassifier.className
  public readonly config: IRandomForestClassifierParameters

  private _isFitted: boolean = false
  private estimator: RsPredictor | null = null

  constructor(params?: IRandomForestClassifierParameters) {
    this.config = params || {}
    this.config.fitDataXType = this.config.fitDataXType ?? ('F32' as DenseMatrixType)
    this.config.fitDataYType = this.config.fitDataYType ?? ('I32' as TypedArrayType)
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
    const builder = new RandomForestClassifierBuilder(matrix, yWrapped)
    if (this.config.splitCriterion !== undefined) builder.withCriterion(this.config.splitCriterion)
    if (this.config.maxDepth !== undefined) builder.withMaxDepth(this.config.maxDepth)
    if (this.config.minSamplesLeaf !== undefined) builder.withMinSamplesLeaf(BigInt(this.config.minSamplesLeaf))
    if (this.config.minSamplesSplit !== undefined) builder.withMinSamplesSplit(BigInt(this.config.minSamplesSplit))
    if (this.config.nTrees !== undefined) builder.withNTrees(this.config.nTrees)
    if (this.config.m !== undefined) builder.withM(BigInt(this.config.m))
    if (this.config.keepSamples !== undefined) builder.withKeepSamples(this.config.keepSamples)
    if (this.config.seed !== undefined) builder.withSeed(BigInt(this.config.seed))

    this.estimator = builder.build()
    this._isFitted = true
    return this
  }

  protected getComponentColumnName(index: number): string {
    return `RandomForestClassifier${index + 1}`
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

  static deserialize(data: Buffer): RandomForestClassifier {
    let instance = new RandomForestClassifier()
    instance.estimator = LibRandomForestClassifier.deserialize(data)
    instance._isFitted = true
    return instance
  }
}

export { RandomForestClassifier, type IRandomForestClassifierBaseParameters }
