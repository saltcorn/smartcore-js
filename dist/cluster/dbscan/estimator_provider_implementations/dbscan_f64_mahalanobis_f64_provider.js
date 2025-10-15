import {} from '../../../index.js';
import { converters } from '../../../linalg/dense-matrix/index.js';
import { DBSCANF64I32MahalanobisF64, DBSCANF64EuclidianF64Parameters, DBSCANF64MahalanobisF64Parameters, MahalanobisF64, } from '../../../core-bindings/index.js';
import { setDBSCANParametersValues } from '../parameters.js';
import {} from '../../../estimator.js';
class DBSCANF64MahalanobisF64Provider {
    parameters(config) {
        if (!config.data) {
            throw new Error(`MahalanobisF64 expects 'config.data' to be provided.`);
        }
        const dataAsF64 = converters.toDenseMatrixF64(config.data);
        const parameters = new DBSCANF64EuclidianF64Parameters().withDistanceMahalanobisF64(new MahalanobisF64(dataAsF64));
        setDBSCANParametersValues(parameters, config);
        return parameters;
    }
    estimator(x, _y, parameters) {
        const xAsF64 = converters.toDenseMatrixF64(x);
        return DBSCANF64I32MahalanobisF64.fit(xAsF64, parameters);
    }
    toMatrix(x) {
        return converters.toDenseMatrixF64(x);
    }
    deserialize(data) {
        return DBSCANF64I32MahalanobisF64.deserialize(data);
    }
}
export default DBSCANF64MahalanobisF64Provider;
