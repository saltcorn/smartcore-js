import {} from '../../../estimator.js';
import StandardScalerF32Provider from './standard_scaler_f32_provider.js';
import StandardScalerF64Provider from './standard_scaler_f64_provider.js';
const TransformerProvidersMap = new Map();
TransformerProvidersMap.set('f32', new StandardScalerF32Provider());
TransformerProvidersMap.set('f64', new StandardScalerF64Provider());
export { TransformerProvidersMap };
