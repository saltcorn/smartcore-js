import { LogisticRegressionF64I64, LogisticRegressionParametersF64 } from '../../core-bindings/index.js'
import { DenseMatrix } from '../linalg/index.js'
import type { LogisticRegressionSolverName } from '../../core-bindings/index.js'

type LogisticRegressionRs = LogisticRegressionF64I64

class LogisticRegressionPredictor {
  inner: LogisticRegressionRs

  constructor(inner: LogisticRegressionRs) {
    this.inner = inner
  }

  predict(x: DenseMatrix | number[][]): number[] | Float64Array {
    let matrix = x instanceof DenseMatrix ? x : DenseMatrix.f64(x)

    return this.inner.predict(matrix.asF64())
  }

  serialize() {
    return this.inner?.serialize()
  }

  static deserialize(data: Buffer): LogisticRegressionPredictor {
    try {
      let inner = LogisticRegressionF64I64.deserialize(data)
      return new LogisticRegressionPredictor(inner)
    } catch (e) {
      throw e
    }
  }
}

type LogisticRegressionParameters = LogisticRegressionParametersF64

interface LogisticRegressionParametersValues {
  alpha?: number
  solver?: LogisticRegressionSolverName.LBFGS
}

class LogisticRegression {
  parameters: LogisticRegressionParameters

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

  fit(
    x: DenseMatrix | number[][],
    y: number[],
    parameters: LogisticRegressionParametersF64,
  ): LogisticRegressionPredictor {
    let matrix = x instanceof DenseMatrix ? x : DenseMatrix.f64(x)

    if (!y || y.length === 0) {
      throw new Error('Input arrays cannot be empty.')
    }

    if (y.every((val) => Number.isInteger(val))) {
      return new LogisticRegressionPredictor(LogisticRegressionF64I64.fit(matrix.asF64(), y, parameters))
    }
    throw new Error('Unsupported data type for input arrays.')
  }
}

export default LogisticRegression
