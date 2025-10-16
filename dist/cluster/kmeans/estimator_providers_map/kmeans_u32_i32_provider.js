import {} from '../../../index.js';
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js';
import { KMeansU32I32, KMeansParameters, DenseMatrixU32 } from '../../../core-bindings/index.js';
import { setKMeansParametersValues } from '../parameters.js';
import {} from '../../../estimator.js';
class KMeansU32U32Provider {
    parameters(config) {
        const parameters = new KMeansParameters();
        setKMeansParametersValues(parameters, config);
        return parameters;
    }
    estimator(x, _y, parameters) {
        const xAsU32 = x.asRsMatrix('u32');
        return KMeansU32I32.fit(xAsU32, parameters);
    }
    toMatrix(x) {
        return x.asRsMatrix('u32');
    }
    deserialize(data) {
        return KMeansU32I32.deserialize(data);
    }
}
export default KMeansU32U32Provider;
