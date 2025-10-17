import {} from '../../../estimator.js';
import PCAF32Provider from './pca_f32_provider.js';
import PCAF64Provider from './pca_f64_provider.js';
const TransformerProvidersMap = new Map();
TransformerProvidersMap.set('f32', new PCAF32Provider());
TransformerProvidersMap.set('f64', new PCAF64Provider());
function setPCAParametersValues(parameters, config) {
    if (config.nComponents !== undefined) {
        parameters.withNComponents(config.nComponents);
    }
    if (config.correlationMatrix !== undefined) {
        parameters.useCorrelationMatrix(config.correlationMatrix);
    }
}
export { TransformerProvidersMap, setPCAParametersValues };
