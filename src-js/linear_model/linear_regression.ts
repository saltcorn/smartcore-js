import {
  LinearRegressionF64I64,
  LinearRegressionParameters,
  LinearRegressionF64F64,
  LinearRegressionF64BigI64,
  LinearRegressionF64BigU64,
} from '../../core-bindings/index.js'
import type { LinearRegressionSolverName } from '../../core-bindings/index.js'
import { DenseMatrix, type DenseMatrixRs } from '../linalg/index.js'
import type { YType } from '../index.js'
import { BasePredictor } from '../base_predictor.js'
import { type YTypeKey } from '../base_estimator.js'

type LinearRegressionRs =
  | LinearRegressionF64I64
  | LinearRegressionF64F64
  | LinearRegressionF64BigI64
  | LinearRegressionF64BigU64

type LinearRegressionParametersRs = LinearRegressionParameters

interface ILinearRegressionParameters {
  solver?: LinearRegressionSolverName
}

interface LinearRegressionSerializedData {
  columns: string[] | null
  data: Buffer
  params: ILinearRegressionParameters
  yType: YTypeKey
}

interface EstimatorClass {
  fit(matrix: DenseMatrixRs, y: YType, params: LinearRegressionParametersRs): LinearRegressionRs
  deserialize(data: Buffer): LinearRegressionRs
}

class LinearRegression extends BasePredictor<LinearRegressionRs, LinearRegressionParametersRs, YType> {
  public static readonly className = 'LinearRegression'
  public readonly name: string = LinearRegression.className
  public readonly config: ILinearRegressionParameters

  private estimatorClasses: Record<YTypeKey, EstimatorClass | null>

  constructor(params?: ILinearRegressionParameters) {
    const parameters = new LinearRegressionParameters()
    if (params?.solver) {
      parameters.withSolver(params.solver)
    }
    const config = params || {}
    super(parameters)
    this.config = config
    this.estimatorClasses = {
      bigI64: LinearRegressionF64BigI64,
      bigU64: LinearRegressionF64BigU64,
      i64: LinearRegressionF64I64,
      f64: LinearRegressionF64F64,
    }
  }

  protected fitEstimator(matrix: DenseMatrix, y: YType): LinearRegressionRs {
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

  serialize(): LinearRegressionSerializedData {
    this.ensureFitted('serialize')

    return {
      columns: this.columns,
      data: this.estimator!.serialize(),
      params: this.config,
      yType: this._yType!,
    }
  }

  static deserialize(data: LinearRegressionSerializedData): LinearRegression {
    let instance = new LinearRegression(data.params)
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

export default LinearRegression
