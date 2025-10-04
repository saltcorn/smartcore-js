import type { DenseMatrix } from './linalg/index.js'
import type { DataFrame } from './data_frame.js'

export * as dataFrame from './data_frame.js'
export * from './linalg/index.js'
export * as linearModel from './linear_model/index.js'
export * as ensemble from './ensemble/index.js'
export * as preprocessing from './preprocessing/index.js'
export * as dataset from './dataset/index.js'
export * as modelSelection from './model_selection/index.js'
export * as metrics from './metrics/index.js'
export * as pipeline from './pipeline/index.js'
export * as cluster from './cluster/index.js'
export * as decomposition from './decomposition/index.js'
export * as naiveBayes from './naive_bayes/index.js'
export * as neighbors from './neighbors/index.js'

type XType = DenseMatrix | number[][]
type YType = number[] | Float64Array | BigInt64Array | BigUint64Array
type InputType = XType | DataFrame
type OutputType = XType | DataFrame

export type { YType, XType, InputType, OutputType }
