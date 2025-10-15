import {} from '../../../index.js';
import { converters } from '../../../linalg/dense-matrix/index.js';
import { DBSCANI32I32MinkowskiI32, DBSCANI32EuclidianI32Parameters, DBSCANI32MinkowskiI32Parameters, MinkowskiI32, } from '../../../core-bindings/index.js';
import { setDBSCANParametersValues } from '../parameters.js';
import {} from '../../../estimator.js';
class DBSCANI32MinkowskiI32Provider {
    parameters(config) {
        if (!config.p) {
            throw new Error(`Minkowski expects 'config.p' to be provided.`);
        }
        const parameters = new DBSCANI32EuclidianI32Parameters().withDistanceMinkowskiI32(new MinkowskiI32(config.p));
        setDBSCANParametersValues(parameters, config);
        return parameters;
    }
    estimator(x, _y, parameters) {
        const xAsI32 = converters.toDenseMatrixI32(x);
        return DBSCANI32I32MinkowskiI32.fit(xAsI32, parameters);
    }
    toMatrix(x) {
        return converters.toDenseMatrixI32(x);
    }
    deserialize(data) {
        return DBSCANI32I32MinkowskiI32.deserialize(data);
    }
}
export default DBSCANI32MinkowskiI32Provider;
