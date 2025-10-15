import {} from '../../index.js';
import {} from '../../core-bindings/index.js';
import {} from '../../linalg/dense-matrix/index.js';
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
export { setDBSCANParametersValues };
