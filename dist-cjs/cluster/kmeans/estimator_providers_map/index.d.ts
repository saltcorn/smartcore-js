import { type IKMeansBaseParameters } from '../parameters.js';
import { type PredictorProvider } from '../../../estimator.js';
import type { NumberTypeRs } from '../parameters.js';
type PredictOutputType = 'i32' | 'i64';
declare const PredictorProvidersMap: Map<NumberTypeRs, Map<PredictOutputType, PredictorProvider<IKMeansBaseParameters, any, any>>>;
export { PredictorProvidersMap, type PredictOutputType };
