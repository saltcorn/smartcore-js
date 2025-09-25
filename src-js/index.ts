import type { DenseMatrix } from './linalg/index.js'

export * from './linalg/index.js'
export * as linear_model from './linear_model/index.js'
export * as ensemble from './ensemble/index.js'
export * as preprocessing from './preprocessing/index.js'
export * as dataset from './dataset/index.js'
export * as model_selection from './model_selection/index.js'
export * as metrics from './metrics/index.js'
export * as pipeline from './pipeline/index.js'
export * as cluster from './cluster/index.js'
export * as decomposition from './decomposition/index.js'

type XType = DenseMatrix | number[][]
type YType = number[] | Float64Array | BigInt64Array

export type { YType, XType }
