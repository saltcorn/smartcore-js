import {} from '../../../index.js';
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js';
import { DenseMatrixF32, KMeansF32I64, KMeansParameters } from '../../../core-bindings/index.js';
import { setKMeansParametersValues } from '../parameters.js';
import {} from '../../../estimator.js';
class KMeansF32F32Provider {
    parameters(config) {
        const parameters = new KMeansParameters();
        setKMeansParametersValues(parameters, config);
        return parameters;
    }
    estimator(x, _y, parameters) {
        const xAsF32 = x.asRsMatrix('f32');
        return KMeansF32I64.fit(xAsF32, parameters);
    }
    toMatrix(x) {
        return x.asRsMatrix('f32');
    }
    deserialize(data) {
        return KMeansF32I64.deserialize(data);
    }
}
export default KMeansF32F32Provider;
