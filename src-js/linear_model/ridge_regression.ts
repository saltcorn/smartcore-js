import {
  RidgeRegressionF64I64,
  RidgeRegressionF64Parameters,
  RidgeRegressionF64F64,
  RidgeRegressionF64BigI64,
  RidgeRegressionF64BigU64,
} from '../../core-bindings/index.js'
import type { RidgeRegressionSolverName } from '../../core-bindings/index.js'
import type { YType } from '../index.js'
import { DenseMatrix } from '../linalg/index.js'
import { type YTypeKey, type EstimatorClass } from '../base_estimator.js'
import { BasePredictor } from '../base_predictor.js'

type RidgeRegressionRs =
  | RidgeRegressionF64I64
  | RidgeRegressionF64F64
  | RidgeRegressionF64BigI64
  | RidgeRegressionF64BigU64

type RidgeRegressionParameters = RidgeRegressionF64Parameters

interface IRidgeRegressionParameters {
  solver?: RidgeRegressionSolverName
}

interface RidgeRegressionSerializedData {
  columns: string[] | null
  data: Buffer
  params: IRidgeRegressionParameters
  yType: YTypeKey
}

class RidgeRegression extends BasePredictor<RidgeRegressionRs, RidgeRegressionParameters, YType> {
  public static readonly className = 'RidgeRegression'
  public readonly name: string = RidgeRegression.className
  public readonly config: IRidgeRegressionParameters

  private estimatorClasses: Record<YTypeKey, EstimatorClass>

  constructor(params?: IRidgeRegressionParameters) {
    const parameters = new RidgeRegressionF64Parameters()
    const config = params || {}

    if (config?.solver) {
      parameters.withSolver(config.solver)
    }

    super(parameters)
    this.config = config

    this.estimatorClasses = {
      bigI64: RidgeRegressionF64BigI64,
      bigU64: RidgeRegressionF64BigU64,
      i64: RidgeRegressionF64I64,
      f64: RidgeRegressionF64F64,
    }
  }

  protected fitEstimator(matrix: DenseMatrix, y: YType): RidgeRegressionRs {
    const EstimatorClass = this.estimatorClasses[this._yType!]
    return EstimatorClass.fit(matrix.asF64(), y, this.parameters)
  }

  protected getComponentColumnName(index: number): string {
    return `RR${index + 1}`
  }

  predictMatrix(matrix: DenseMatrix): YType {
    return this.estimator!.predict(matrix.asF64())
  }

  serialize(): RidgeRegressionSerializedData {
    this.ensureFitted('serialize')

    return {
      columns: this.columns,
      data: this.estimator!.serialize(),
      params: this.config,
      yType: this._yType!,
    }
  }

  static deserialize(data: RidgeRegressionSerializedData): RidgeRegression {
    let instance = new RidgeRegression(data.params)
    const EstimatorClass = instance.estimatorClasses[data.yType]
    instance.estimator = EstimatorClass.deserialize(data.data)
    instance._isFitted = true
    instance._yType = data.yType
    return instance
  }
}

export default RidgeRegression
