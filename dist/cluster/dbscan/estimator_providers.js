import {} from '../../index.js';
import { 
//   EuclidianU32,
//   EuclidianF32,
//   EuclidianF64,
//   EuclidianI32,
//   EuclidianI64,
//   EuclidianU16,
//   EuclidianU8,
//   EuclidianU64,
//   HammingU8,
//   HammingU16,
//   HammingI32,
MahalanobisF32, MahalanobisF64, ManhattanF32, ManhattanF64, 
//   ManhattanI32,
//   ManhattanU32,
//   ManhattanI64,
//   ManhattanU64,
MinkowskiF32, MinkowskiF64, 
//   MinkowskiI32,
//   MinkowskiI64,
DBSCANF32I32EuclidianF32, DBSCANF32I32MahalanobisF32, DBSCANF32I32ManhattanF32, DBSCANF32I32MinkowskiF32, DBSCANF64I32EuclidianF64, DBSCANF64I32MahalanobisF64, DBSCANF64I32ManhattanF64, DBSCANF64I32MinkowskiF64, 
//   DBSCANI32I32EuclidianI32,
//   DBSCANI32I32HammingI32,
//   DBSCANI32I32ManhattanI32,
//   DBSCANI32I32MinkowskiI32,
//   DBSCANI64I32EuclidianI64,
//   DBSCANI64I32ManhattanI64,
//   DBSCANI64I32MinkowskiI64,
//   DBSCANU16I32EuclidianU16,
//   DBSCANU16I32HammingU16,
//   DBSCANU32I32EuclidianU32,
//   DBSCANU32I32ManhattanU32,
//   DBSCANU64I32EuclidianU64,
//   DBSCANU64I32ManhattanU64,
//   DBSCANU8I32EuclidianU8,
//   DBSCANU8I32HammingU8,
DBSCANF32EuclidianF32Parameters, DBSCANF32MahalanobisF32Parameters, DBSCANF32ManhattanF32Parameters, DBSCANF32MinkowskiF32Parameters, DBSCANF64EuclidianF64Parameters, DBSCANF64MahalanobisF64Parameters, DBSCANF64ManhattanF64Parameters, DBSCANF64MinkowskiF64Parameters, DenseMatrixF32, DenseMatrixF64,
//   DenseMatrixU32,
//   DenseMatrixI32,
//   DenseMatrixI64,
//   DenseMatrixU16,
//   DenseMatrixU64,
//   DenseMatrixU8,
 } from '../../core-bindings/index.js';
import { DenseMatrix } from '../../linalg/dense-matrix/index.js';
import { DataFrame } from '../../data_frame.js';
function toDenseMatrixF32(x) {
    if (x instanceof DataFrame) {
        throw new Error('Unimplemented!');
    }
    else if (x instanceof DenseMatrix) {
        return x.asRsMatrix('f32');
    }
    else if (Array.isArray(x)) {
        return DenseMatrix.f32(x).asRsMatrix('f32');
    }
    else {
        throw new Error('TODO!');
    }
}
function toDenseMatrixF64(x) {
    if (x instanceof DataFrame) {
        throw new Error('Unimplemented!');
    }
    else if (x instanceof DenseMatrix) {
        return x.asRsMatrix('f64');
    }
    else if (Array.isArray(x)) {
        return DenseMatrix.f64(x).asRsMatrix('f64');
    }
    else {
        throw new Error('TODO!');
    }
}
function setDBSCANParametersValues(parameters, config) {
    if (config.algorithm) {
        parameters.withAlgorithm(config.algorithm);
    }
    if (config.eps) {
        parameters.withEps(config.eps);
    }
    if (config.minSamples) {
        parameters.withMinSamples(config.minSamples);
    }
}
class DBSCANF32EuclidianF32Provider {
    parameters(config) {
        const parameters = new DBSCANF32EuclidianF32Parameters();
        setDBSCANParametersValues(parameters, config);
        return parameters;
    }
    estimator(x, _y, parameters) {
        const xAsF32 = toDenseMatrixF32(x);
        return DBSCANF32I32EuclidianF32.fit(xAsF32, parameters);
    }
    toMatrix(x) {
        return toDenseMatrixF32(x);
    }
    deserialize(data) {
        return DBSCANF32I32EuclidianF32.deserialize(data);
    }
}
class DBSCANF32MahalanobisF32Provider {
    parameters(config) {
        if (!config.data) {
            throw new Error(`MahalanobisF32 expects 'config.data' to be provided.`);
        }
        const dataAsF32 = toDenseMatrixF32(config.data);
        const parameters = new DBSCANF32EuclidianF32Parameters().withDistanceMahalanobisF32(new MahalanobisF32(dataAsF32));
        setDBSCANParametersValues(parameters, config);
        return parameters;
    }
    estimator(x, _y, parameters) {
        const xAsF32 = toDenseMatrixF32(x);
        return DBSCANF32I32MahalanobisF32.fit(xAsF32, parameters);
    }
    toMatrix(x) {
        return toDenseMatrixF32(x);
    }
    deserialize(data) {
        return DBSCANF32I32MahalanobisF32.deserialize(data);
    }
}
class DBSCANF32ManhattanF32Provider {
    parameters(config) {
        const parameters = new DBSCANF32EuclidianF32Parameters().withDistanceManhattanF32(new ManhattanF32());
        setDBSCANParametersValues(parameters, config);
        return parameters;
    }
    estimator(x, _y, parameters) {
        const xAsF32 = toDenseMatrixF32(x);
        return DBSCANF32I32ManhattanF32.fit(xAsF32, parameters);
    }
    toMatrix(x) {
        return toDenseMatrixF32(x);
    }
    deserialize(data) {
        return DBSCANF32I32ManhattanF32.deserialize(data);
    }
}
class DBSCANF32MinkowskiF32Provider {
    parameters(config) {
        if (!config.p) {
            throw new Error(`Minkowski expects 'config.p' to be provided.`);
        }
        const parameters = new DBSCANF32EuclidianF32Parameters().withDistanceMinkowskiF32(new MinkowskiF32(config.p));
        setDBSCANParametersValues(parameters, config);
        return parameters;
    }
    estimator(x, _y, parameters) {
        const xAsF32 = toDenseMatrixF32(x);
        return DBSCANF32I32MinkowskiF32.fit(xAsF32, parameters);
    }
    toMatrix(x) {
        return toDenseMatrixF32(x);
    }
    deserialize(data) {
        return DBSCANF32I32MinkowskiF32.deserialize(data);
    }
}
const F32EstimatorProviders = new Map();
F32EstimatorProviders.set('euclidian', new DBSCANF32EuclidianF32Provider());
F32EstimatorProviders.set('mahalanobis', new DBSCANF32MahalanobisF32Provider());
F32EstimatorProviders.set('manhattan', new DBSCANF32ManhattanF32Provider());
F32EstimatorProviders.set('minkowski', new DBSCANF32MinkowskiF32Provider());
class DBSCANF64EuclidianF64Provider {
    parameters(config) {
        const parameters = new DBSCANF64EuclidianF64Parameters();
        setDBSCANParametersValues(parameters, config);
        return parameters;
    }
    estimator(x, _y, parameters) {
        const xAsF64 = toDenseMatrixF64(x);
        return DBSCANF64I32EuclidianF64.fit(xAsF64, parameters);
    }
    toMatrix(x) {
        return toDenseMatrixF64(x);
    }
    deserialize(data) {
        return DBSCANF64I32EuclidianF64.deserialize(data);
    }
}
class DBSCANF64MahalanobisF64Provider {
    parameters(config) {
        if (!config.data) {
            throw new Error(`MahalanobisF64 expects 'config.data' to be provided.`);
        }
        const dataAsF64 = toDenseMatrixF64(config.data);
        const parameters = new DBSCANF64EuclidianF64Parameters().withDistanceMahalanobisF64(new MahalanobisF64(dataAsF64));
        setDBSCANParametersValues(parameters, config);
        return parameters;
    }
    estimator(x, _y, parameters) {
        const xAsF64 = toDenseMatrixF64(x);
        return DBSCANF64I32MahalanobisF64.fit(xAsF64, parameters);
    }
    toMatrix(x) {
        return toDenseMatrixF64(x);
    }
    deserialize(data) {
        return DBSCANF64I32MahalanobisF64.deserialize(data);
    }
}
class DBSCANF64ManhattanF64Provider {
    parameters(config) {
        const parameters = new DBSCANF64EuclidianF64Parameters().withDistanceManhattanF64(new ManhattanF64());
        setDBSCANParametersValues(parameters, config);
        return parameters;
    }
    estimator(x, _y, parameters) {
        const xAsF64 = toDenseMatrixF64(x);
        return DBSCANF64I32ManhattanF64.fit(xAsF64, parameters);
    }
    toMatrix(x) {
        return toDenseMatrixF64(x);
    }
    deserialize(data) {
        return DBSCANF64I32ManhattanF64.deserialize(data);
    }
}
class DBSCANF64MinkowskiF64Provider {
    parameters(config) {
        if (!config.p) {
            throw new Error(`Minkowski expects 'config.p' to be provided.`);
        }
        const parameters = new DBSCANF64EuclidianF64Parameters().withDistanceMinkowskiF64(new MinkowskiF64(config.p));
        setDBSCANParametersValues(parameters, config);
        return parameters;
    }
    estimator(x, _y, parameters) {
        const xAsF64 = toDenseMatrixF64(x);
        return DBSCANF64I32MinkowskiF64.fit(xAsF64, parameters);
    }
    toMatrix(x) {
        return toDenseMatrixF64(x);
    }
    deserialize(data) {
        return DBSCANF64I32MinkowskiF64.deserialize(data);
    }
}
const F64EstimatorProviders = new Map();
F64EstimatorProviders.set('euclidian', new DBSCANF64EuclidianF64Provider());
F64EstimatorProviders.set('mahalanobis', new DBSCANF64MahalanobisF64Provider());
F64EstimatorProviders.set('manhattan', new DBSCANF64ManhattanF64Provider());
F64EstimatorProviders.set('minkowski', new DBSCANF64MinkowskiF64Provider());
//   f64: {
//     euclidian: { params: DBSCANF64EuclidianF64Parameters; estimator: DBSCANF64I32EuclidianF64 }
//     mahalanobis: {
//       params: DBSCANF64MahalanobisF64Parameters
//       estimator: DBSCANF64I32MahalanobisF64
//       data: DenseMatrixF64
//     }
//     manhattan: { params: DBSCANF64ManhattanF64Parameters; estimator: DBSCANF64ManhattanF64Parameters }
//     minkowski: { params: DBSCANF64MinkowskiF64Parameters; estimator: DBSCANF64I32MinkowskiF64; p: number }
//   }
const EstimatorProviders = new Map();
EstimatorProviders.set('f32', F32EstimatorProviders);
EstimatorProviders.set('f64', F64EstimatorProviders);
export { EstimatorProviders, DBSCANF32EuclidianF32Provider };
// type FeatureTypeMap = {
//   f32: {
//     euclidian: EstimatorProvider
//     mahalanobis: {
//       params: DBSCANF32MahalanobisF32Parameters
//       estimator: DBSCANF32I32MahalanobisF32
//       data: DenseMatrixF32
//     }
//     manhattan: { params: DBSCANF32ManhattanF32Parameters; estimator: DBSCANF32I32ManhattanF32 }
//     minkowski: { params: DBSCANF32MinkowskiF32Parameters; estimator: DBSCANF32I32MinkowskiF32; p: number }
//   }
//   f64: {
//     euclidian: { params: DBSCANF64EuclidianF64Parameters; estimator: DBSCANF64I32EuclidianF64 }
//     mahalanobis: {
//       params: DBSCANF64MahalanobisF64Parameters
//       estimator: DBSCANF64I32MahalanobisF64
//       data: DenseMatrixF64
//     }
//     manhattan: { params: DBSCANF64ManhattanF64Parameters; estimator: DBSCANF64ManhattanF64Parameters }
//     minkowski: { params: DBSCANF64MinkowskiF64Parameters; estimator: DBSCANF64I32MinkowskiF64; p: number }
//   }
//   u32: {
//     euclidian: { params: DBSCANU32EuclidianU32Parameters; estimator: DBSCANU32I32EuclidianU32 }
//     manhattan: { params: DBSCANU32ManhattanU32Parameters; estimator: DBSCANU32I32ManhattanU32 }
//   }
//   i32: {
//     euclidian: { params: DBSCANI32EuclidianI32Parameters; estimator: DBSCANI32I32EuclidianI32 }
//     hamming: { params: DBSCANI32HammingI32Parameters; estimator: DBSCANI32I32HammingI32 }
//     manhattan: { params: DBSCANI32ManhattanI32Parameters; estimator: DBSCANI32I32ManhattanI32 }
//     minkowski: { params: DBSCANI32MinkowskiI32Parameters; estimator: DBSCANI32I32MinkowskiI32; p: number }
//   }
//   i64: {
//     euclidian: { params: DBSCANI64EuclidianI64Parameters; estimator: DBSCANI64I32EuclidianI64 }
//     manhattan: { params: DBSCANI64ManhattanI64Parameters; estimator: DBSCANI64I32ManhattanI64 }
//     minkowski: { params: DBSCANI64MinkowskiI64Parameters; estimator: DBSCANI64I32MinkowskiI64; p: number }
//   }
//   u16: {
//     euclidian: { params: DBSCANU16EuclidianU16Parameters; estimator: DBSCANU16I32EuclidianU16 }
//     hamming: { params: DBSCANU16HammingU16Parameters; estimator: DBSCANU16I32HammingU16 }
//   }
//   u8: {
//     euclidian: { params: DBSCANU8EuclidianU8Parameters; estimator: DBSCANU8I32EuclidianU8 }
//     hamming: { params: DBSCANU8HammingU8Parameters; estimator: DBSCANU8I32HammingU8 }
//   }
//   u64: {
//     euclidian: { params: DBSCANU64EuclidianU64Parameters; estimator: DBSCANU64I32EuclidianU64 }
//     manhattan: { params: DBSCANU64ManhattanU64Parameters; estimator: DBSCANU64I32ManhattanU64 }
//   }
// }
// class DBSCAN {
//   constructor(p: IDBSCANParameters) {}
// }
