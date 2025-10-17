import {} from '../../../estimator.js';
import SVDF32Provider from './svd_f32_provider.js';
import SVDF64Provider from './svd_f64_provider.js';
const TransformerProvidersMap = new Map();
TransformerProvidersMap.set('f32', new SVDF32Provider());
TransformerProvidersMap.set('f64', new SVDF64Provider());
function setSVDParametersValues(parameters, config) {
    if (config.nComponents !== undefined) {
        parameters.withNComponents(config.nComponents);
    }
}
export { TransformerProvidersMap, setSVDParametersValues };
