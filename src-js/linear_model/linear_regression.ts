import {
  LinearRegressionF64I64,
  LinearRegressionParameters,
  LinearRegressionF64F64,
  LinearRegressionF64BigI64,
  LinearRegressionF64BigU64,
} from '../../core-bindings/index.js'
import type { LinearRegressionSolverName } from '../../core-bindings/index.js'
import type { XType, YType } from '../index.js'
import { DenseMatrix } from '../linalg/index.js'
import type { Estimator, Predictor } from '../pipeline/index.js'

type LinearRegressionRs =
  | LinearRegressionF64I64
  | LinearRegressionF64F64
  | LinearRegressionF64BigI64
  | LinearRegressionF64BigU64

interface ILinearRegressionParameters {
  solver?: LinearRegressionSolverName
}

enum EstimatorType {
  F64BigI64,
  F64BigU64,
  F64I64,
  F64F64,
}

class LinearRegression implements Estimator<XType, YType, LinearRegression>, Predictor<XType, YType> {
  parameters: LinearRegressionParameters
  estimator: LinearRegressionRs | null = null

  constructor(params?: ILinearRegressionParameters) {
    this.parameters = new LinearRegressionParameters()
    if (params?.solver) {
      this.parameters.withSolver(params.solver)
    }
  }

  fit(x: XType, y: YType): LinearRegression {
    let matrix = x instanceof DenseMatrix ? x : DenseMatrix.f64(x)

    if (!y || y.length === 0) {
      throw new Error('Input arrays cannot be empty.')
    }

    if (y instanceof Float64Array) {
      this.estimator = LinearRegressionF64F64.fit(matrix.asF64(), y, this.parameters)
    } else if (y instanceof BigInt64Array) {
      this.estimator = LinearRegressionF64BigI64.fit(matrix.asF64(), y, this.parameters)
    } else if (y instanceof BigUint64Array) {
      this.estimator = LinearRegressionF64BigU64.fit(matrix.asF64(), y, this.parameters)
    } else if (y.every((val) => Number.isInteger(val))) {
      this.estimator = LinearRegressionF64I64.fit(matrix.asF64(), y, this.parameters)
    } else {
      throw new Error('Unsupported data type!')
    }

    return this
  }

  predict(x: XType): YType {
    if (this.estimator === null) {
      throw new Error("The 'fit' method should called before the 'predict' method is called.")
    }

    let matrix = x instanceof DenseMatrix ? x : DenseMatrix.f64(x)

    return this.estimator.predict(matrix.asF64())
  }

  serialize() {
    return this.estimator?.serialize()
  }

  static deserialize(data: Buffer, estimatorType: EstimatorType): LinearRegression {
    let instance = new LinearRegression()
    switch (estimatorType) {
      case EstimatorType.F64BigI64:
        instance.estimator = LinearRegressionF64BigI64.deserialize(data)
        break
      case EstimatorType.F64BigU64:
        instance.estimator = LinearRegressionF64BigU64.deserialize(data)
        break
      case EstimatorType.F64F64:
        instance.estimator = LinearRegressionF64F64.deserialize(data)
        break
      case EstimatorType.F64I64:
        instance.estimator = LinearRegressionF64I64.deserialize(data)
        break
      default:
        throw new Error(`Unrecognized estimator type: '${estimatorType}'`)
    }
    return instance
  }
}

export default LinearRegression
