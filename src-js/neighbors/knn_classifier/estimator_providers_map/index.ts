import { type KNNAlgorithmName, type KNNWeightFunction } from '../../../core-bindings/index.js'
import { type PredictorProvider } from '../../../estimator.js'
import { type DistanceType } from '../../../metrics/index.js'
import KNNClassifierF32I32EuclidianProvider from './knn_classifier_f32_i32_euclidian.js'
import KNNClassifierF32I32MahalanobisProvider from './knn_classifier_f32_i32_mahalanobis.js'
import KNNClassifierF32I32ManhattanProvider from './knn_classifier_f32_i32_manhattan.js'
import KNNClassifierF32I32MinkowskiProvider from './knn_classifier_f32_i32_minkowski.js'
import KNNClassifierF64I32EuclidianProvider from './knn_classifier_f64_i32_euclidian.js'
import KNNClassifierF64I32MahalanobisProvider from './knn_classifier_f64_i32_mahalanobis.js'
import KNNClassifierF64I32ManhattanProvider from './knn_classifier_f64_i32_manhattan.js'
import KNNClassifierF64I32MinkowskiProvider from './knn_classifier_f64_i32_minkowski.js'
import KNNClassifierI64I32EuclidianProvider from './knn_classifier_i64_i32_euclidian.js'
import KNNClassifierI64I32ManhattanProvider from './knn_classifier_i64_i32_manhattan.js'
import KNNClassifierI64I32MinkowskiProvider from './knn_classifier_i64_i32_minkowski.js'
import KNNClassifierU64I32EuclidianProvider from './knn_classifier_u64_i32_euclidian.js'
import KNNClassifierU64I32ManhattanProvider from './knn_classifier_u64_i32_manhattan.js'
import KNNClassifierI32I32EuclidianProvider from './knn_classifier_i32_i32_euclidian.js'
import KNNClassifierI32I32HammingProvider from './knn_classifier_i32_i32_hamming.js'
import KNNClassifierI32I32ManhattanProvider from './knn_classifier_i32_i32_manhattan.js'
import KNNClassifierI32I32MinkowskiProvider from './knn_classifier_i32_i32_minkowski.js'
import KNNClassifierU32I32EuclidianProvider from './knn_classifier_u32_i32_euclidian.js'
import KNNClassifierU32I32ManhattanProvider from './knn_classifier_u32_i32_manhattan.js'
import KNNClassifierU16I32EuclidianProvider from './knn_classifier_u16_i32_euclidian.js'
import KNNClassifierU16I32HammingProvider from './knn_classifier_i32_i32_hamming.js'
import KNNClassifierU8I32EuclidianProvider from './knn_classifier_u8_i32_euclidian.js'
import KNNClassifierU8I32HammingProvider from './knn_classifier_u8_i32_hamming.js'

type XTypeStr = 'f32' | 'f64' | 'i32' | 'i64' | 'u64' | 'u32' | 'u16' | 'u8'
type YTypeStr = 'i32'

type DistanceKeyedMap = Map<DistanceType, PredictorProvider<IKNNClassifierBaseParameters, any, any>>

type YKeyedMap = Map<YTypeStr, DistanceKeyedMap>

type XKeyedMap = Map<XTypeStr, YKeyedMap>

const F64EstimatorProvidersMap: YKeyedMap = new Map()
const F64DistanceKeyedMap: DistanceKeyedMap = new Map()
F64DistanceKeyedMap.set('euclidian', new KNNClassifierF64I32EuclidianProvider())
F64DistanceKeyedMap.set('mahalanobis', new KNNClassifierF64I32MahalanobisProvider())
F64DistanceKeyedMap.set('manhattan', new KNNClassifierF64I32ManhattanProvider())
F64DistanceKeyedMap.set('minkowski', new KNNClassifierF64I32MinkowskiProvider())
F64EstimatorProvidersMap.set('i32', F64DistanceKeyedMap)

const F32EstimatorProvidersMap: YKeyedMap = new Map()
const F32DistanceKeyedMap: DistanceKeyedMap = new Map()
F32DistanceKeyedMap.set('euclidian', new KNNClassifierF32I32EuclidianProvider())
F32DistanceKeyedMap.set('mahalanobis', new KNNClassifierF32I32MahalanobisProvider())
F32DistanceKeyedMap.set('manhattan', new KNNClassifierF32I32ManhattanProvider())
F32DistanceKeyedMap.set('minkowski', new KNNClassifierF32I32MinkowskiProvider())
F32EstimatorProvidersMap.set('i32', F32DistanceKeyedMap)

const I64EstimatorProvidersMap: YKeyedMap = new Map()
const I64DistanceKeyedMap: DistanceKeyedMap = new Map()
I64DistanceKeyedMap.set('euclidian', new KNNClassifierI64I32EuclidianProvider())
I64DistanceKeyedMap.set('manhattan', new KNNClassifierI64I32ManhattanProvider())
I64DistanceKeyedMap.set('minkowski', new KNNClassifierI64I32MinkowskiProvider())
I64EstimatorProvidersMap.set('i32', I64DistanceKeyedMap)

const U64EstimatorProvidersMap: YKeyedMap = new Map()
const U64DistanceKeyedMap: DistanceKeyedMap = new Map()
U64DistanceKeyedMap.set('euclidian', new KNNClassifierU64I32EuclidianProvider())
U64DistanceKeyedMap.set('manhattan', new KNNClassifierU64I32ManhattanProvider())
U64EstimatorProvidersMap.set('i32', U64DistanceKeyedMap)

const I32EstimatorProvidersMap: YKeyedMap = new Map()
const I32DistanceKeyedMap: DistanceKeyedMap = new Map()
I32DistanceKeyedMap.set('euclidian', new KNNClassifierI32I32EuclidianProvider())
I32DistanceKeyedMap.set('hamming', new KNNClassifierI32I32HammingProvider())
I32DistanceKeyedMap.set('manhattan', new KNNClassifierI32I32ManhattanProvider())
I32DistanceKeyedMap.set('minkowski', new KNNClassifierI32I32MinkowskiProvider())
I32EstimatorProvidersMap.set('i32', I32DistanceKeyedMap)

const U32EstimatorProvidersMap: YKeyedMap = new Map()
const U32DistanceKeyedMap: DistanceKeyedMap = new Map()
U32DistanceKeyedMap.set('euclidian', new KNNClassifierU32I32EuclidianProvider())
U32DistanceKeyedMap.set('manhattan', new KNNClassifierU32I32ManhattanProvider())
U32EstimatorProvidersMap.set('i32', U32DistanceKeyedMap)

const U16EstimatorProvidersMap: YKeyedMap = new Map()
const U16DistanceKeyedMap: DistanceKeyedMap = new Map()
U16DistanceKeyedMap.set('euclidian', new KNNClassifierU16I32EuclidianProvider())
U16DistanceKeyedMap.set('hamming', new KNNClassifierU16I32HammingProvider())
U16EstimatorProvidersMap.set('i32', U16DistanceKeyedMap)

const U8EstimatorProvidersMap: YKeyedMap = new Map()
const U8DistanceKeyedMap: DistanceKeyedMap = new Map()
U8DistanceKeyedMap.set('euclidian', new KNNClassifierU8I32EuclidianProvider())
U8DistanceKeyedMap.set('hamming', new KNNClassifierU8I32HammingProvider())
U8EstimatorProvidersMap.set('i32', U8DistanceKeyedMap)

const EstimatorProvidersMap: XKeyedMap = new Map()
EstimatorProvidersMap.set('f64', F64EstimatorProvidersMap)
EstimatorProvidersMap.set('f32', F32EstimatorProvidersMap)
EstimatorProvidersMap.set('i64', I64EstimatorProvidersMap)
EstimatorProvidersMap.set('i32', I32EstimatorProvidersMap)
EstimatorProvidersMap.set('u64', U64EstimatorProvidersMap)
EstimatorProvidersMap.set('u32', U32EstimatorProvidersMap)
EstimatorProvidersMap.set('u16', U16EstimatorProvidersMap)
EstimatorProvidersMap.set('u8', U8EstimatorProvidersMap)

interface IKNNClassifierParametersRs {
  withK(k: number): void
  withAlgorithm(algorithm: KNNAlgorithmName): void
  withWeight(weight: KNNWeightFunction): void
}

interface IKNNClassifierBaseParameters {
  k?: number
  algorithm?: KNNAlgorithmName
  weight?: KNNWeightFunction
}

function setKNNClassifierParametersValues(
  parameters: IKNNClassifierParametersRs,
  config: IKNNClassifierBaseParameters,
) {
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

export { EstimatorProvidersMap, setKNNClassifierParametersValues }
export type { YTypeStr, XTypeStr, IKNNClassifierBaseParameters }
