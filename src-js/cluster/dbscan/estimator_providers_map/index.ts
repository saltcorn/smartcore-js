import { type IDBSCANBaseParameters } from '../parameters.js'
import { type PredictorProvider } from '../../../estimator.js'
import { type DistanceType } from '../../../metrics/index.js'
import DBSCANF32EuclidianF32Provider from './dbscan_f32_euclidian_f32_provider.js'
import DBSCANF32MahalanobisF32Provider from './dbscan_f32_mahalanobis_f32_provider.js'
import DBSCANF32ManhattanF32Provider from './dbscan_f32_manhattan_f32_provider.js'
import DBSCANF32MinkowskiF32Provider from './dbscan_f32_minkowski_f32_provider.js'
import DBSCANF64EuclidianF64Provider from './dbscan_f64_euclidian_f64_provider.js'
import DBSCANF64MahalanobisF64Provider from './dbscan_f64_mahalanobis_f64_provider.js'
import DBSCANF64ManhattanF64Provider from './dbscan_f64_manhattan_f64_provider.js'
import DBSCANF64MinkowskiF64Provider from './dbscan_f64_minkowski_f64_provider.js'
import DBSCANU32EuclidianU32Provider from './dbscan_u32_euclidian_u32_provider.js'
import DBSCANU32ManhattanU32Provider from './dbscan_u32_manhattan_u32_provider.js'
import DBSCANI32EuclidianI32Provider from './dbscan_i32_euclidian_i32_provider.js'
import DBSCANI32HammingI32Provider from './dbscan_i32_hamming_i32_provider.js'
import DBSCANI32ManhattanI32Provider from './dbscan_i32_manhattan_i32_provider.js'
import DBSCANI32MinkowskiI32Provider from './dbscan_i32_minkowski_i32_provider.js'
import DBSCANI64EuclidianI64Provider from './dbscan_i64_euclidian_i64_provider.js'
import DBSCANI64ManhattanI64Provider from './dbscan_i64_manhattan_i64_provider.js'
import DBSCANI64MinkowskiI64Provider from './dbscan_i64_minkowski_i64_provider.js'
import DBSCANU16EuclidianU16Provider from './dbscan_u16_euclidian_u16_provider.js'
import DBSCANU16HammingU16Provider from './dbscan_u16_hamming_u16_provider.js'
import DBSCANU8EuclidianU8Provider from './dbscan_u8_euclidian_u8_provider.js'
import DBSCANU8HammingU8Provider from './dbscan_u8_hamming_u8_provider.js'
import DBSCANU64EuclidianU64Provider from './dbscan_u64_euclidian_u64_provider.js'
import DBSCANU64ManhattanU64Provider from './dbscan_u64_manhattan_u64_provider.js'
import type { NumberTypeRs } from '../parameters.js'

const F32PredictorProvidersMap: Map<DistanceType, PredictorProvider<IDBSCANBaseParameters, any, any>> = new Map()
F32PredictorProvidersMap.set('euclidian', new DBSCANF32EuclidianF32Provider())
F32PredictorProvidersMap.set('mahalanobis', new DBSCANF32MahalanobisF32Provider())
F32PredictorProvidersMap.set('manhattan', new DBSCANF32ManhattanF32Provider())
F32PredictorProvidersMap.set('minkowski', new DBSCANF32MinkowskiF32Provider())

const F64PredictorProvidersMap: Map<DistanceType, PredictorProvider<IDBSCANBaseParameters, any, any>> = new Map()
F64PredictorProvidersMap.set('euclidian', new DBSCANF64EuclidianF64Provider())
F64PredictorProvidersMap.set('mahalanobis', new DBSCANF64MahalanobisF64Provider())
F64PredictorProvidersMap.set('manhattan', new DBSCANF64ManhattanF64Provider())
F64PredictorProvidersMap.set('minkowski', new DBSCANF64MinkowskiF64Provider())

const U32PredictorProvidersMap: Map<DistanceType, PredictorProvider<IDBSCANBaseParameters, any, any>> = new Map()
U32PredictorProvidersMap.set('euclidian', new DBSCANU32EuclidianU32Provider())
U32PredictorProvidersMap.set('manhattan', new DBSCANU32ManhattanU32Provider())

const I32PredictorProvidersMap: Map<DistanceType, PredictorProvider<IDBSCANBaseParameters, any, any>> = new Map()
I32PredictorProvidersMap.set('euclidian', new DBSCANI32EuclidianI32Provider())
I32PredictorProvidersMap.set('hamming', new DBSCANI32HammingI32Provider())
I32PredictorProvidersMap.set('manhattan', new DBSCANI32ManhattanI32Provider())
I32PredictorProvidersMap.set('minkowski', new DBSCANI32MinkowskiI32Provider())

const I64PredictorProvidersMap: Map<DistanceType, PredictorProvider<IDBSCANBaseParameters, any, any>> = new Map()
I64PredictorProvidersMap.set('euclidian', new DBSCANI64EuclidianI64Provider())
I64PredictorProvidersMap.set('manhattan', new DBSCANI64ManhattanI64Provider())
I64PredictorProvidersMap.set('minkowski', new DBSCANI64MinkowskiI64Provider())

const U16PredictorProvidersMap: Map<DistanceType, PredictorProvider<IDBSCANBaseParameters, any, any>> = new Map()
U16PredictorProvidersMap.set('euclidian', new DBSCANU16EuclidianU16Provider())
U16PredictorProvidersMap.set('hamming', new DBSCANU16HammingU16Provider())

const U8PredictorProvidersMap: Map<DistanceType, PredictorProvider<IDBSCANBaseParameters, any, any>> = new Map()
U8PredictorProvidersMap.set('euclidian', new DBSCANU8EuclidianU8Provider())
U8PredictorProvidersMap.set('hamming', new DBSCANU8HammingU8Provider())

const U64PredictorProvidersMap: Map<DistanceType, PredictorProvider<IDBSCANBaseParameters, any, any>> = new Map()
U64PredictorProvidersMap.set('euclidian', new DBSCANU64EuclidianU64Provider())
U64PredictorProvidersMap.set('manhattan', new DBSCANU64ManhattanU64Provider())

const PredictorProvidersMap: Map<
  NumberTypeRs,
  Map<DistanceType, PredictorProvider<IDBSCANBaseParameters, any, any>>
> = new Map()
PredictorProvidersMap.set('f32', F32PredictorProvidersMap)
PredictorProvidersMap.set('f64', F64PredictorProvidersMap)
PredictorProvidersMap.set('u32', U32PredictorProvidersMap)
PredictorProvidersMap.set('i32', I32PredictorProvidersMap)
PredictorProvidersMap.set('i64', I64PredictorProvidersMap)
PredictorProvidersMap.set('u16', U16PredictorProvidersMap)
PredictorProvidersMap.set('u8', U8PredictorProvidersMap)
PredictorProvidersMap.set('u64', U64PredictorProvidersMap)

export { PredictorProvidersMap }
