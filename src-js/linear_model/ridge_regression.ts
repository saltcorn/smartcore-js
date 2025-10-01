import {
  RidgeRegressionF64I64,
  RidgeRegressionF64Parameters,
  RidgeRegressionF64F64,
  RidgeRegressionF64BigI64,
  RidgeRegressionF64BigU64,
} from '../../core-bindings/index.js'
import type { RidgeRegressionSolverName } from '../../core-bindings/index.js'
import type { XType, YType } from '../index.js'
import { DenseMatrix } from '../linalg/index.js'
import type { Estimator, Predictor } from '../pipeline/index.js'

type RidgeRegressionRs =
  | RidgeRegressionF64I64
  | RidgeRegressionF64F64
  | RidgeRegressionF64BigI64
  | RidgeRegressionF64BigU64

interface IRidgeRegressionParameters {
  solver?: RidgeRegressionSolverName
}

enum EstimatorType {
  F64BigI64,
  F64BigU64,
  F64I64,
  F64F64,
}

class RidgeRegression implements Estimator<XType, YType, RidgeRegression>, Predictor<XType, YType> {
  parameters: RidgeRegressionF64Parameters
  estimator: RidgeRegressionRs | null = null
  public static readonly className = 'RidgeRegression'
  public readonly name: string = RidgeRegression.className

  constructor(params?: IRidgeRegressionParameters) {
    this.parameters = new RidgeRegressionF64Parameters()
    if (params?.solver) {
      this.parameters.withSolver(params.solver)
    }
  }

  fit(x: XType, y: YType): RidgeRegression {
    let matrix = x instanceof DenseMatrix ? x : DenseMatrix.f64(x)

    if (!y || y.length === 0) {
      throw new Error('Input arrays cannot be empty.')
    }

    if (y instanceof Float64Array) {
      this.estimator = RidgeRegressionF64F64.fit(matrix.asF64(), y, this.parameters)
    } else if (y instanceof BigInt64Array) {
      this.estimator = RidgeRegressionF64BigI64.fit(matrix.asF64(), y, this.parameters)
    } else if (y instanceof BigUint64Array) {
      this.estimator = RidgeRegressionF64BigU64.fit(matrix.asF64(), y, this.parameters)
    } else if (y.every((val) => Number.isInteger(val))) {
      this.estimator = RidgeRegressionF64I64.fit(matrix.asF64(), y, this.parameters)
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

  static deserialize(data: Buffer, estimatorType: EstimatorType): RidgeRegression {
    let instance = new RidgeRegression()
    switch (estimatorType) {
      case EstimatorType.F64BigI64:
        instance.estimator = RidgeRegressionF64BigI64.deserialize(data)
        break
      case EstimatorType.F64BigU64:
        instance.estimator = RidgeRegressionF64BigU64.deserialize(data)
        break
      case EstimatorType.F64F64:
        instance.estimator = RidgeRegressionF64F64.deserialize(data)
        break
      case EstimatorType.F64I64:
        instance.estimator = RidgeRegressionF64I64.deserialize(data)
        break
      default:
        throw new Error(`Unrecognized estimator type: '${estimatorType}'`)
    }
    return instance
  }
}

export default RidgeRegression
