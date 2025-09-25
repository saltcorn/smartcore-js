import {
  ExtraTreesRegressorF64BigI64,
  ExtraTreesRegressorF64I64,
  ExtraTreesRegressorParameters,
} from '../../core-bindings/index.js'
import type { XType, YType } from '../index.js'
import { DenseMatrix } from '../linalg/index.js'
import type { Estimator, Predictor } from '../pipeline/index.js'

interface ExtraTreesRegressorParams {
  maxDepth?: number
  minSamplesLeaf?: bigint
  minSamplesSplit?: bigint
  nTrees?: number
  m?: number
  keepSamples?: boolean
  seed?: number
}

type ExtraTreesRegressorRs = ExtraTreesRegressorF64I64 | ExtraTreesRegressorF64BigI64
enum EstimatorType {
  F64I64,
  F64BigI64,
}

class ExtraTreesRegressor implements Estimator<XType, YType, ExtraTreesRegressor>, Predictor<XType, YType> {
  private parameters: ExtraTreesRegressorParameters
  private estimator: ExtraTreesRegressorRs | null = null

  constructor(params?: ExtraTreesRegressorParams) {
    this.parameters = new ExtraTreesRegressorParameters()
    if (params) {
      if (params.maxDepth !== undefined) {
        this.parameters.withMaxDepth(params.maxDepth)
      }
      if (params.minSamplesLeaf !== undefined) {
        this.parameters.withMinSamplesLeaf(params.minSamplesLeaf)
      }
      if (params.minSamplesSplit !== undefined) {
        this.parameters.withMinSamplesSplit(params.minSamplesSplit)
      }
      if (params.nTrees !== undefined) {
        this.parameters.withNTrees(params.nTrees)
      }
      if (params.m !== undefined) {
        this.parameters.withM(params.m)
      }
      if (params.keepSamples !== undefined) {
        this.parameters.withKeepSamples(params.keepSamples)
      }
      if (params.seed !== undefined) {
        this.parameters.withSeed(params.seed)
      }
    }
  }

  fit(x: XType, y: YType): ExtraTreesRegressor {
    let matrix = x instanceof DenseMatrix ? x : DenseMatrix.f64(x)

    if (!y || y.length === 0) {
      throw new Error('Input arrays cannot be empty.')
    }

    if (y instanceof Float64Array) {
      throw new Error('Unsupported data type for input arrays.')
    } else if (y instanceof BigInt64Array) {
      this.estimator = ExtraTreesRegressorF64BigI64.fit(matrix.asF64(), y, this.parameters)
    } else if (y.every((val) => Number.isInteger(val))) {
      this.estimator = ExtraTreesRegressorF64I64.fit(matrix.asF64(), y, this.parameters)
    } else {
      throw new Error('Unsupported data type for input arrays.')
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

  static deserialize(data: Buffer, estimatorType: EstimatorType): ExtraTreesRegressor {
    let estimator
    if (estimatorType === EstimatorType.F64BigI64) {
      estimator = ExtraTreesRegressorF64BigI64.deserialize(data)
    } else if (estimatorType === EstimatorType.F64I64) {
      estimator = ExtraTreesRegressorF64I64.deserialize(data)
    } else {
      throw new Error('Unsupported estimator type')
    }
    let instance = new ExtraTreesRegressor()
    instance.estimator = estimator
    return instance
  }
}

export { ExtraTreesRegressor, ExtraTreesRegressorParameters }
