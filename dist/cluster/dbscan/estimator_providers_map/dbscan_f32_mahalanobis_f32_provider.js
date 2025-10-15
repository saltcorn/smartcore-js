import {} from '../../../index.js';
import { converters } from '../../../linalg/dense-matrix/index.js';
import { DBSCANF32I32MahalanobisF32, DBSCANF32EuclidianF32Parameters, DBSCANF32MahalanobisF32Parameters, MahalanobisF32, } from '../../../core-bindings/index.js';
import { setDBSCANParametersValues } from '../parameters.js';
import {} from '../../../estimator.js';
class DBSCANF32MahalanobisF32Provider {
    parameters(config) {
        if (!config.data) {
            throw new Error(`MahalanobisF32 expects 'config.data' to be provided.`);
        }
        const dataAsF32 = converters.toDenseMatrixF32(config.data);
        const parameters = new DBSCANF32EuclidianF32Parameters().withDistanceMahalanobisF32(new MahalanobisF32(dataAsF32));
        setDBSCANParametersValues(parameters, config);
        return parameters;
    }
    estimator(x, _y, parameters) {
        const xAsF32 = converters.toDenseMatrixF32(x);
        return DBSCANF32I32MahalanobisF32.fit(xAsF32, parameters);
    }
    toMatrix(x) {
        return converters.toDenseMatrixF32(x);
    }
    deserialize(data) {
        return DBSCANF32I32MahalanobisF32.deserialize(data);
    }
}
export default DBSCANF32MahalanobisF32Provider;
