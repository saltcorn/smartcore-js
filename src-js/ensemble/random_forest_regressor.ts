import {
  RandomForestRegressorF64BigI64,
  RandomForestRegressorF64BigU64,
  RandomForestRegressorF64I64,
  RandomForestRegressorParameters,
} from '../../core-bindings/index.js'
import type { XType, YType } from '../index.js'
import { DenseMatrix } from '../linalg/index.js'
import type { Estimator, Predictor } from '../pipeline/index.js'

interface RandomForestRegressorParams {
  maxDepth?: number
  minSamplesLeaf?: bigint
  minSamplesSplit?: bigint
  nTrees?: number
  m?: number
  keepSamples?: boolean
  seed?: number
}

type RandomForestRegressorRs =
  | RandomForestRegressorF64I64
  | RandomForestRegressorF64BigI64
  | RandomForestRegressorF64BigU64

enum EstimatorType {
  F64I64,
  F64BigI64,
  F64BigU64,
}

class RandomForestRegressor implements Estimator<XType, YType, RandomForestRegressor>, Predictor<XType, YType> {
  private parameters: RandomForestRegressorParameters
  private estimator: RandomForestRegressorRs | null = null
  public static readonly className = 'RandomForestRegressor'
  public readonly name: string = RandomForestRegressor.className

  constructor(params?: RandomForestRegressorParams) {
    this.parameters = new RandomForestRegressorParameters()
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

  fit(x: XType, y: YType): RandomForestRegressor {
    let matrix = x instanceof DenseMatrix ? x : DenseMatrix.f64(x)

    if (!y || y.length === 0) {
      throw new Error('Input arrays cannot be empty.')
    }

    if (y instanceof Float64Array) {
      throw new Error('Unsupported data type for input arrays.')
    } else if (y instanceof BigInt64Array) {
      this.estimator = RandomForestRegressorF64BigI64.fit(matrix.asF64(), y, this.parameters)
    } else if (y instanceof BigUint64Array) {
      this.estimator = RandomForestRegressorF64BigU64.fit(matrix.asF64(), y, this.parameters)
    } else if (y.every((val) => Number.isInteger(val))) {
      this.estimator = RandomForestRegressorF64I64.fit(matrix.asF64(), y, this.parameters)
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

  static deserialize(data: Buffer, estimatorType: EstimatorType): RandomForestRegressor {
    let instance = new RandomForestRegressor()
    switch (estimatorType) {
      case EstimatorType.F64BigI64:
        instance.estimator = RandomForestRegressorF64BigI64.deserialize(data)
        break
      case EstimatorType.F64BigU64:
        instance.estimator = RandomForestRegressorF64BigU64.deserialize(data)
        break
      case EstimatorType.F64I64:
        instance.estimator = RandomForestRegressorF64I64.deserialize(data)
        break
      default:
        throw new Error(`Unrecognized estimator type: '${estimatorType}'`)
    }
    return instance
  }
}

export { RandomForestRegressor }
