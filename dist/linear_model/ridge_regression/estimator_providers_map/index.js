import {} from '../../../estimator.js';
import RidgeRegressionF32F32Provider from './ridge_regression_f32_f32_provider.js';
import RidgeRegressionF32F64Provider from './ridge_regression_f32_f64_provider.js';
import RidgeRegressionF64F32Provider from './ridge_regression_f64_f32_provider.js';
import RidgeRegressionF64F64Provider from './ridge_regression_f64_f64_provider.js';
const F32EstimatorProvidersMap = new Map();
F32EstimatorProvidersMap.set('f32', new RidgeRegressionF32F32Provider());
F32EstimatorProvidersMap.set('f64', new RidgeRegressionF32F64Provider());
const F64EstimatorProvidersMap = new Map();
F32EstimatorProvidersMap.set('f32', new RidgeRegressionF64F32Provider());
F32EstimatorProvidersMap.set('f64', new RidgeRegressionF64F64Provider());
const EstimatorProvidersMap = new Map();
EstimatorProvidersMap.set('f32', F32EstimatorProvidersMap);
EstimatorProvidersMap.set('f64', F64EstimatorProvidersMap);
function setRidgeRegressionParametersValues(parameters, config) {
    if (config.solver) {
        parameters.withSolver(config.solver);
    }
    if (config.alpha) {
        parameters.withAlpha(config.alpha);
    }
    if (config.normalize) {
        parameters.withNormalize(config.normalize);
    }
}
export { EstimatorProvidersMap, setRidgeRegressionParametersValues };
