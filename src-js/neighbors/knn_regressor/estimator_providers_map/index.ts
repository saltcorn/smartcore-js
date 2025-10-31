import { type KNNAlgorithmName, type KNNWeightFunction } from '../../../core-bindings/index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { type DistanceType } from '../../../metrics/index.js'
import KNNRegressorF32F32EuclidianProvider from './knn_regressor_f32_f32_euclidian.js'
import KNNRegressorF32F32MahalanobisProvider from './knn_regressor_f32_f32_mahalanobis.js'
import KNNRegressorF32F32ManhattanProvider from './knn_regressor_f32_f32_manhattan.js'
import KNNRegressorF32F32MinkowskiProvider from './knn_regressor_f32_f32_minkowski.js'
import KNNRegressorF64F32EuclidianProvider from './knn_regressor_f64_f32_euclidian.js'
import KNNRegressorF64F32MahalanobisProvider from './knn_regressor_f64_f32_mahalanobis.js'
import KNNRegressorF64F32ManhattanProvider from './knn_regressor_f64_f32_manhattan.js'
import KNNRegressorF64F32MinkowskiProvider from './knn_regressor_f64_f32_minkowski.js'
import KNNRegressorI64F32EuclidianProvider from './knn_regressor_i64_f32_euclidian.js'
import KNNRegressorI64F32ManhattanProvider from './knn_regressor_i64_f32_manhattan.js'
import KNNRegressorI64F32MinkowskiProvider from './knn_regressor_i64_f32_minkowski.js'
import KNNRegressorU64F32EuclidianProvider from './knn_regressor_u64_f32_euclidian.js'
import KNNRegressorU64F32ManhattanProvider from './knn_regressor_u64_f32_manhattan.js'
import KNNRegressorI32F32EuclidianProvider from './knn_regressor_i32_f32_euclidian.js'
import KNNRegressorI32F32HammingProvider from './knn_regressor_i32_f32_hamming.js'
import KNNRegressorI32F32ManhattanProvider from './knn_regressor_i32_f32_manhattan.js'
import KNNRegressorI32F32MinkowskiProvider from './knn_regressor_i32_f32_minkowski.js'
import KNNRegressorU32F32EuclidianProvider from './knn_regressor_u32_f32_euclidian.js'
import KNNRegressorU32F32ManhattanProvider from './knn_regressor_u32_f32_manhattan.js'
import KNNRegressorU16F32EuclidianProvider from './knn_regressor_u16_f32_euclidian.js'
import KNNRegressorU16F32HammingProvider from './knn_regressor_i32_f32_hamming.js'
import KNNRegressorU8F32EuclidianProvider from './knn_regressor_u8_f32_euclidian.js'
import KNNRegressorU8F32HammingProvider from './knn_regressor_u8_f32_hamming.js'
import type { DenseMatrix } from '../../../index.js'

type XTypeStr = 'f32' | 'f64' | 'i32' | 'i64' | 'u64' | 'u32' | 'u16' | 'u8'
type YTypeStr = 'f32'

type DistanceKeyedMap = Map<DistanceType, PredictorProvider<IKNNRegressorBaseParameters, any, any>>

type YKeyedMap = Map<YTypeStr, DistanceKeyedMap>

type XKeyedMap = Map<XTypeStr, YKeyedMap>

const F64EstimatorProvidersMap: YKeyedMap = new Map()
const F64DistanceKeyedMap: DistanceKeyedMap = new Map()
F64DistanceKeyedMap.set('euclidian', new KNNRegressorF64F32EuclidianProvider())
F64DistanceKeyedMap.set('mahalanobis', new KNNRegressorF64F32MahalanobisProvider())
F64DistanceKeyedMap.set('manhattan', new KNNRegressorF64F32ManhattanProvider())
F64DistanceKeyedMap.set('minkowski', new KNNRegressorF64F32MinkowskiProvider())
F64EstimatorProvidersMap.set('f32', F64DistanceKeyedMap)

const F32EstimatorProvidersMap: YKeyedMap = new Map()
const F32DistanceKeyedMap: DistanceKeyedMap = new Map()
F32DistanceKeyedMap.set('euclidian', new KNNRegressorF32F32EuclidianProvider())
F32DistanceKeyedMap.set('mahalanobis', new KNNRegressorF32F32MahalanobisProvider())
F32DistanceKeyedMap.set('manhattan', new KNNRegressorF32F32ManhattanProvider())
F32DistanceKeyedMap.set('minkowski', new KNNRegressorF32F32MinkowskiProvider())
F32EstimatorProvidersMap.set('f32', F32DistanceKeyedMap)

const I64EstimatorProvidersMap: YKeyedMap = new Map()
const I64DistanceKeyedMap: DistanceKeyedMap = new Map()
I64DistanceKeyedMap.set('euclidian', new KNNRegressorI64F32EuclidianProvider())
I64DistanceKeyedMap.set('manhattan', new KNNRegressorI64F32ManhattanProvider())
I64DistanceKeyedMap.set('minkowski', new KNNRegressorI64F32MinkowskiProvider())
I64EstimatorProvidersMap.set('f32', I64DistanceKeyedMap)

const U64EstimatorProvidersMap: YKeyedMap = new Map()
const U64DistanceKeyedMap: DistanceKeyedMap = new Map()
U64DistanceKeyedMap.set('euclidian', new KNNRegressorU64F32EuclidianProvider())
U64DistanceKeyedMap.set('manhattan', new KNNRegressorU64F32ManhattanProvider())
U64EstimatorProvidersMap.set('f32', U64DistanceKeyedMap)

const I32EstimatorProvidersMap: YKeyedMap = new Map()
const I32DistanceKeyedMap: DistanceKeyedMap = new Map()
I32DistanceKeyedMap.set('euclidian', new KNNRegressorI32F32EuclidianProvider())
I32DistanceKeyedMap.set('hamming', new KNNRegressorI32F32HammingProvider())
I32DistanceKeyedMap.set('manhattan', new KNNRegressorI32F32ManhattanProvider())
I32DistanceKeyedMap.set('minkowski', new KNNRegressorI32F32MinkowskiProvider())
I32EstimatorProvidersMap.set('f32', I32DistanceKeyedMap)

const U32EstimatorProvidersMap: YKeyedMap = new Map()
const U32DistanceKeyedMap: DistanceKeyedMap = new Map()
U32DistanceKeyedMap.set('euclidian', new KNNRegressorU32F32EuclidianProvider())
U32DistanceKeyedMap.set('manhattan', new KNNRegressorU32F32ManhattanProvider())
U32EstimatorProvidersMap.set('f32', U32DistanceKeyedMap)

const U16EstimatorProvidersMap: YKeyedMap = new Map()
const U16DistanceKeyedMap: DistanceKeyedMap = new Map()
U16DistanceKeyedMap.set('euclidian', new KNNRegressorU16F32EuclidianProvider())
U16DistanceKeyedMap.set('hamming', new KNNRegressorU16F32HammingProvider())
U16EstimatorProvidersMap.set('f32', U16DistanceKeyedMap)

const U8EstimatorProvidersMap: YKeyedMap = new Map()
const U8DistanceKeyedMap: DistanceKeyedMap = new Map()
U8DistanceKeyedMap.set('euclidian', new KNNRegressorU8F32EuclidianProvider())
U8DistanceKeyedMap.set('hamming', new KNNRegressorU8F32HammingProvider())
U8EstimatorProvidersMap.set('f32', U8DistanceKeyedMap)

const EstimatorProvidersMap: XKeyedMap = new Map()
EstimatorProvidersMap.set('f64', F64EstimatorProvidersMap)
EstimatorProvidersMap.set('f32', F32EstimatorProvidersMap)
EstimatorProvidersMap.set('i64', I64EstimatorProvidersMap)
EstimatorProvidersMap.set('i32', I32EstimatorProvidersMap)
EstimatorProvidersMap.set('u64', U64EstimatorProvidersMap)
EstimatorProvidersMap.set('u32', U32EstimatorProvidersMap)
EstimatorProvidersMap.set('u16', U16EstimatorProvidersMap)
EstimatorProvidersMap.set('u8', U8EstimatorProvidersMap)

interface IKNNRegressorParametersRs {
  withK(k: number): void
  withAlgorithm(algorithm: KNNAlgorithmName): void
  withWeight(weight: KNNWeightFunction): void
}

interface IKNNRegressorBaseParameters {
  k?: number
  algorithm?: KNNAlgorithmName
  weight?: KNNWeightFunction
}

interface MinkowskiParameters extends IKNNRegressorBaseParameters {
  p: number
}

interface MahalanobisParameters extends IKNNRegressorBaseParameters {
  data: DenseMatrix
}

function setKNNRegressorParametersValues(parameters: IKNNRegressorParametersRs, config: IKNNRegressorBaseParameters) {
  if (config.k !== undefined) {
    parameters.withK(config.k)
  }
  if (config.algorithm !== undefined) {
    parameters.withAlgorithm(config.algorithm)
  }
  if (config.weight !== undefined) {
    parameters.withWeight(config.weight)
  }
}

export { EstimatorProvidersMap, setKNNRegressorParametersValues }
export type { YTypeStr, XTypeStr, IKNNRegressorBaseParameters, MinkowskiParameters, MahalanobisParameters }
