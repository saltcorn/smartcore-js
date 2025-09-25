import {
  LogisticRegressionF64I64,
  LogisticRegressionParametersF64,
  LogisticRegressionF64BigI64,
} from '../../core-bindings/index.js'
import { DenseMatrix } from '../linalg/index.js'
import type { LogisticRegressionSolverName } from '../../core-bindings/index.js'
import type { Estimator, Predictor, SerDe } from '../pipeline/index.js'
import type { YType, XType } from '../index.js'

type LogisticRegressionRs = LogisticRegressionF64I64 | LogisticRegressionF64BigI64

type LogisticRegressionParameters = LogisticRegressionParametersF64

interface LogisticRegressionParametersValues {
  alpha?: number
  solver?: LogisticRegressionSolverName.LBFGS
}

class LogisticRegression
  implements Estimator<XType, YType, LogisticRegression>, Predictor<XType, YType>, SerDe<LogisticRegression>
{
  private estimator: LogisticRegressionRs | null = null
  private parameters: LogisticRegressionParameters

  constructor(params?: LogisticRegressionParametersValues) {
    let parameters = new LogisticRegressionParametersF64()
    if (params) {
      if (params.alpha !== undefined) {
        parameters.withAlpha(params.alpha)
      }
      if (params.solver !== undefined) {
        parameters.withSolver(params.solver)
      }
    }
    this.parameters = parameters
  }

  predict(x: XType): YType {
    if (this.estimator === null) {
      throw new Error("The 'fit' method should called before the 'predict' method is called.")
    }

    let matrix = x instanceof DenseMatrix ? x : DenseMatrix.f64(x)

    return this.estimator.predict(matrix.asF64())
  }

  fit(x: XType, y: YType): LogisticRegression {
    let matrix = x instanceof DenseMatrix ? x : DenseMatrix.f64(x)

    if (!y || y.length === 0) {
      throw new Error('Input arrays cannot be empty.')
    }

    if (y instanceof Float64Array) {
      throw new Error('Unsupported data type for input arrays.')
    }

    if (y instanceof BigInt64Array) {
      this.estimator = LogisticRegressionF64BigI64.fit(matrix.asF64(), y, this.parameters)
    } else if (y.every((val) => Number.isInteger(val))) {
      this.estimator = LogisticRegressionF64I64.fit(matrix.asF64(), y, this.parameters)
    } else {
      throw new Error('Unsupported data type for input arrays.')
    }

    return this
  }

  serialize(): Buffer {
    if (this.estimator === null) {
      throw new Error("The 'fit' method should called before the 'serialize' method is called.")
    }

    return this.estimator?.serialize()
  }

  deserialize(data: Buffer): LogisticRegression {
    try {
      let estimator = LogisticRegressionF64I64.deserialize(data)
      let lr = new LogisticRegression({})
      lr.estimator = estimator
      return lr
    } catch (e) {
      throw e
    }
  }
}

export default LogisticRegression
