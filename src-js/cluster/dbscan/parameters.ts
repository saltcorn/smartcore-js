import { type DenseMatrixRs } from '../../linalg/index.js'
import {
  EuclidianU32,
  EuclidianF32,
  EuclidianF64,
  EuclidianI32,
  EuclidianI64,
  EuclidianU16,
  EuclidianU8,
  EuclidianU64,
  HammingU8,
  HammingU16,
  HammingI32,
  MahalanobisF32,
  MahalanobisF64,
  ManhattanF32,
  ManhattanF64,
  ManhattanI32,
  ManhattanU32,
  ManhattanI64,
  ManhattanU64,
  MinkowskiF32,
  MinkowskiF64,
  MinkowskiI32,
  MinkowskiI64,
  DBSCANF32I32EuclidianF32,
  DBSCANF32I32MahalanobisF32,
  DBSCANF32I32ManhattanF32,
  DBSCANF32I32MinkowskiF32,
  DBSCANF64I32EuclidianF64,
  DBSCANF64I32MahalanobisF64,
  DBSCANF64I32ManhattanF64,
  DBSCANF64I32MinkowskiF64,
  DBSCANI32I32EuclidianI32,
  DBSCANI32I32HammingI32,
  DBSCANI32I32ManhattanI32,
  DBSCANI32I32MinkowskiI32,
  DBSCANI64I32EuclidianI64,
  DBSCANI64I32ManhattanI64,
  DBSCANI64I32MinkowskiI64,
  DBSCANU16I32EuclidianU16,
  DBSCANU16I32HammingU16,
  DBSCANU32I32EuclidianU32,
  DBSCANU32I32ManhattanU32,
  DBSCANU64I32EuclidianU64,
  DBSCANU64I32ManhattanU64,
  DBSCANU8I32EuclidianU8,
  DBSCANU8I32HammingU8,
  DBSCANF32EuclidianF32Parameters,
  DBSCANF32MahalanobisF32Parameters,
  DBSCANF32ManhattanF32Parameters,
  DBSCANF32MinkowskiF32Parameters,
  DBSCANF64EuclidianF64Parameters,
  DBSCANF64MahalanobisF64Parameters,
  DBSCANF64ManhattanF64Parameters,
  DBSCANF64MinkowskiF64Parameters,
  DBSCANI32EuclidianI32Parameters,
  DBSCANI32HammingI32Parameters,
  DBSCANI32ManhattanI32Parameters,
  DBSCANI32MinkowskiI32Parameters,
  DBSCANI64EuclidianI64Parameters,
  DBSCANI64ManhattanI64Parameters,
  DBSCANI64MinkowskiI64Parameters,
  DBSCANU16EuclidianU16Parameters,
  DBSCANU16HammingU16Parameters,
  DBSCANU32EuclidianU32Parameters,
  DBSCANU32ManhattanU32Parameters,
  DBSCANU64EuclidianU64Parameters,
  DBSCANU64ManhattanU64Parameters,
  DBSCANU8EuclidianU8Parameters,
  DBSCANU8HammingU8Parameters,
  type KNNAlgorithmName,
  DenseMatrixF32,
  DenseMatrixF64,
  DenseMatrixU32,
  DenseMatrixI32,
  DenseMatrixI64,
  DenseMatrixU16,
  DenseMatrixU64,
  DenseMatrixU8,
} from '../../core-bindings/index.js'

type FeatureTypeMap = {
  f32: {
    matrix: DenseMatrixF32
    distances: {
      euclidian: { params: DBSCANF32EuclidianF32Parameters; estimator: DBSCANF32I32EuclidianF32 }
      mahalanobis: {
        params: DBSCANF32MahalanobisF32Parameters
        estimator: DBSCANF32I32MahalanobisF32
        data: DenseMatrixF32
      }
      manhattan: { params: DBSCANF32ManhattanF32Parameters; estimator: DBSCANF32I32ManhattanF32 }
      minkowski: { params: DBSCANF32MinkowskiF32Parameters; estimator: DBSCANF32I32MinkowskiF32; p: number }
    }
  }
  f64: {
    matrix: DenseMatrixF64
    distances: {
      euclidian: { params: DBSCANF64EuclidianF64Parameters; estimator: DBSCANF64I32EuclidianF64 }
      mahalanobis: {
        params: DBSCANF64MahalanobisF64Parameters
        estimator: DBSCANF64I32MahalanobisF64
        data: DenseMatrixF64
      }
      manhattan: { params: DBSCANF64ManhattanF64Parameters; estimator: DBSCANF64ManhattanF64Parameters }
      minkowski: { params: DBSCANF64MinkowskiF64Parameters; estimator: DBSCANF64I32MinkowskiF64; p: number }
    }
  }
  u32: {
    matrix: DenseMatrixU32
    distances: {
      euclidian: { params: DBSCANU32EuclidianU32Parameters; estimator: DBSCANU32I32EuclidianU32 }
      manhattan: { params: DBSCANU32ManhattanU32Parameters; estimator: DBSCANU32I32ManhattanU32 }
    }
  }
  i32: {
    matrix: DenseMatrixI32
    distances: {
      euclidian: { params: DBSCANI32EuclidianI32Parameters; estimator: DBSCANI32I32EuclidianI32 }
      hamming: { params: DBSCANI32HammingI32Parameters; estimator: DBSCANI32I32HammingI32 }
      manhattan: { params: DBSCANI32ManhattanI32Parameters; estimator: DBSCANI32I32ManhattanI32 }
      minkowski: { params: DBSCANI32MinkowskiI32Parameters; estimator: DBSCANI32I32MinkowskiI32; p: number }
    }
  }
  i64: {
    matrix: DenseMatrixI64
    distances: {
      euclidian: { params: DBSCANI64EuclidianI64Parameters; estimator: DBSCANI64I32EuclidianI64 }
      manhattan: { params: DBSCANI64ManhattanI64Parameters; estimator: DBSCANI64I32ManhattanI64 }
      minkowski: { params: DBSCANI64MinkowskiI64Parameters; estimator: DBSCANI64I32MinkowskiI64; p: number }
    }
  }
  u16: {
    matrix: DenseMatrixU16
    distances: {
      euclidian: { params: DBSCANU16EuclidianU16Parameters; estimator: DBSCANU16I32EuclidianU16 }
      hamming: { params: DBSCANU16HammingU16Parameters; estimator: DBSCANU16I32HammingU16 }
    }
  }
  u8: {
    matrix: DenseMatrixU8
    distances: {
      euclidian: { params: DBSCANU8EuclidianU8Parameters; estimator: DBSCANU8I32EuclidianU8 }
      hamming: { params: DBSCANU8HammingU8Parameters; estimator: DBSCANU8I32HammingU8 }
    }
  }
  u64: {
    matrix: DenseMatrixU64
    distances: {
      euclidian: { params: DBSCANU64EuclidianU64Parameters; estimator: DBSCANU64I32EuclidianU64 }
      manhattan: { params: DBSCANU64ManhattanU64Parameters; estimator: DBSCANU64I32ManhattanU64 }
    }
  }
}

type FeatureType = keyof FeatureTypeMap
type DistanceType<F extends FeatureType> = keyof FeatureTypeMap[F]['distances']

interface EstimatorClass {
  fit(matrix: DenseMatrixRs, params: DBSCANParametersRs): DBSCANRs
  deserialize(data: Buffer): DBSCANRs
}

const estimatorClasses: Record<DistanceKey, EstimatorClass> = {
  EuclidianF32: DBSCANF32I32EuclidianF32,
  MahalanobisF32: DBSCANF32I32MahalanobisF32,
  ManhattanF32: DBSCANF32I32ManhattanF32,
  MinkowskiF32: DBSCANF32I32MinkowskiF32,
  EuclidianF64: DBSCANF64I32EuclidianF64,
  MahalanobisF64: DBSCANF64I32MahalanobisF64,
  ManhattanF64: DBSCANF64I32ManhattanF64,
  MinkowskiF64: DBSCANF64I32MinkowskiF64,
  EuclidianI32: DBSCANI32I32EuclidianI32,
  HammingI32: DBSCANI32I32HammingI32,
  ManhattanI32: DBSCANI32I32ManhattanI32,
  MinkowskiI32: DBSCANI32I32MinkowskiI32,
  EuclidianI64: DBSCANI64I32EuclidianI64,
  ManhattanI64: DBSCANI64I32ManhattanI64,
  MinkowskiI64: DBSCANI64I32MinkowskiI64,
  EuclidianU16: DBSCANU16I32EuclidianU16,
  HammingU16: DBSCANU16I32HammingU16,
  EuclidianU32: DBSCANU32I32EuclidianU32,
  ManhattanU32: DBSCANU32I32ManhattanU32,
  EuclidianU64: DBSCANU64I32EuclidianU64,
  ManhattanU64: DBSCANU64I32ManhattanU64,
  EuclidianU8: DBSCANU8I32EuclidianU8,
  HammingU8: DBSCANU8I32HammingU8,
}

// interface IDBSCANBaseParameters<F extends FeatureType> {
//   minSamples?: number
//   algorithm?: KNNAlgorithmName
//   eps?: number
//   distance: keyof FeatureTypeMap[F]['distances']
// }

// type IDBSCANParameters<
//   F extends FeatureType,
//   B extends IDBSCANBaseParameters<F>,
// > = FeatureTypeMap[F]['distances'][B['distance']] extends { data: any }
//   ? { data: FeatureTypeMap[F]['distances'][B['distance']]['data'] }
//   : FeatureTypeMap[F]['distances'][B['distance']] extends { p: any }
//     ? { p: number }
//     : never

// interface IDBSCANParameters<F extends FeatureType> {
//   minSamples?: number
//   algorithm?: KNNAlgorithmName
//   eps?: number
//   data?: DenseMatrixF32 | DenseMatrixF64
//   p?: number
//   distance?: keyof FeatureTypeMap[F]['distances']
// }

// type DistanceType<F extends FeatureType> = keyof FeatureTypeMap[F]['distances']

interface IDBSCANBaseParameters<F extends FeatureType, D extends DistanceType<F>> {
  minSamples?: number
  algorithm?: KNNAlgorithmName
  eps?: number
  distance: D
}

type IDBSCANParameters<F extends FeatureType, D extends DistanceType<F>> = IDBSCANBaseParameters<F, D> &
  (FeatureTypeMap[F]['distances'][D] extends { data: infer DataType }
    ? { data: DataType }
    : FeatureTypeMap[F]['distances'][D] extends { p: number }
      ? { p: number }
      : {})

function instanceFromParameters<F extends FeatureType, D extends DistanceType<F>>(
  featureType: F,
  params: IDBSCANParameters<F, D>,
): DBSCANParametersRs {
  switch (params.distance) {
    case 'EuclidianF32':
      return new DBSCANF32EuclidianF32Parameters()
    case 'EuclidianF64':
      return new DBSCANF64EuclidianF64Parameters()
    case 'EuclidianI32':
      return new DBSCANI32EuclidianI32Parameters()
    case 'EuclidianU32':
      return new DBSCANU32EuclidianU32Parameters()
    case 'EuclidianI64':
      return new DBSCANI64EuclidianI64Parameters()
    case 'EuclidianU16':
      return new DBSCANU16EuclidianU16Parameters()
    case 'EuclidianU8':
      return new DBSCANU8EuclidianU8Parameters()
    case 'EuclidianU64':
      return new DBSCANU64EuclidianU64Parameters()
    case 'HammingU8':
      return new DBSCANU8EuclidianU8Parameters().withDistanceHammingU8(new HammingU8())
    case 'HammingU16':
      return new DBSCANU16EuclidianU16Parameters().withDistanceHammingU16(new HammingU16())
    case 'HammingI32':
      return new DBSCANI32EuclidianI32Parameters().withDistanceHammingI32(new HammingI32())
    case 'MahalanobisF32':
      if (!params.data || !(params.data instanceof DenseMatrixF32)) {
        const dataType = params.data?.constructor?.name || typeof params.data
        throw new Error(`MahalanobisF32 expects 'params.data' to be a DenseMatrixF32. Found type: ${dataType}`)
      }
      return new DBSCANF32EuclidianF32Parameters().withDistanceMahalanobisF32(new MahalanobisF32(params.data))
    case 'MahalanobisF64':
      if (!params.data || !(params.data instanceof DenseMatrixF64)) {
        const dataType = params.data?.constructor?.name || typeof params.data
        throw new Error(`MahalanobisF64 expects 'params.data' to be a DenseMatrixF64. Found type: ${dataType}`)
      }
      return new DBSCANF64EuclidianF64Parameters().withDistanceMahalanobisF64(new MahalanobisF64(params.data))
    case 'ManhattanF32':
      return new DBSCANF32EuclidianF32Parameters().withDistanceManhattanF32(new ManhattanF32())
    case 'ManhattanF64':
      return new DBSCANF64EuclidianF64Parameters().withDistanceManhattanF64(new ManhattanF64())
    case 'ManhattanI32':
      return new DBSCANI32EuclidianI32Parameters().withDistanceManhattanI32(new ManhattanI32())
    case 'ManhattanU32':
      return new DBSCANU32EuclidianU32Parameters().withDistanceManhattanU32(new ManhattanU32())
    case 'ManhattanI64':
      return new DBSCANI64EuclidianI64Parameters().withDistanceManhattanI64(new ManhattanI64())
    case 'ManhattanU64':
      return new DBSCANU64EuclidianU64Parameters().withDistanceManhattanU64(new ManhattanU64())
    case 'MinkowskiF32':
      if (!params.p || typeof params.p !== 'number') {
        const pType = params.p?.constructor?.name || typeof params.p
        throw new Error(`Minkowski expects 'params.p' to be a number. Found type: ${pType}`)
      }
      return new DBSCANF32EuclidianF32Parameters().withDistanceMinkowskiF32(new MinkowskiF32(params.p))
    case 'MinkowskiF64':
      if (!params.p || typeof params.p !== 'number') {
        const pType = params.p?.constructor?.name || typeof params.p
        throw new Error(`Minkowski expects 'params.p' to be a number. Found type: ${pType}`)
      }
      return new DBSCANF64EuclidianF64Parameters().withDistanceMinkowskiF64(new MinkowskiF64(params.p))
    case 'MinkowskiI32':
      if (!params.p || typeof params.p !== 'number') {
        const pType = params.p?.constructor?.name || typeof params.p
        throw new Error(`Minkowski expects 'params.p' to be a number. Found type: ${pType}`)
      }
      if (params.p !== 1 && params.p !== 2) {
        throw new Error(`MinkowskiI32 expects p to equal 1 or 2. p equals ${params.p}`)
      }
      return new DBSCANI32EuclidianI32Parameters().withDistanceMinkowskiI32(new MinkowskiI32(params.p))
    case 'MinkowskiI64':
      if (!params.p || typeof params.p !== 'number') {
        const pType = params.p?.constructor?.name || typeof params.p
        throw new Error(`Minkowski expects 'params.p' to be a number. Found type: ${pType}`)
      }
      if (params.p !== 1 && params.p !== 2) {
        throw new Error(`MinkowskiI64 expects p to equal 1 or 2. p equals ${params.p}`)
      }
      return new DBSCANI64EuclidianI64Parameters().withDistanceMinkowskiI64(new MinkowskiI64(params.p))
    default:
      throw new Error(`Unexpected distance key: ${params.distance}`)
  }
}

function getParametersInstance(params: IDBSCANParameters): DBSCANParametersRs {
  const parameters = instanceFromParameters(params)
  if (params.minSamples !== undefined) {
    parameters.withMinSamples(params.minSamples)
  }
  if (params.algorithm !== undefined) {
    parameters.withAlgorithm(params.algorithm)
  }
  if (params.eps !== undefined) {
    parameters.withEps(params.eps)
  }
  return parameters
}

export {
  estimatorClasses,
  getParametersInstance,
  type FeatureTypeMap,
  type FeatureType,
  type DistanceType,
  type EstimatorClass,
  type IDBSCANParameters,
}
