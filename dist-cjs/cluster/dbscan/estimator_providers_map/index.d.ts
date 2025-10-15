import { type IDBSCANBaseParameters } from '../parameters.js';
import { type PredictorProvider } from '../../../estimator.js';
import { type DistanceType } from '../../../metrics/index.js';
import type { NumberTypeRs } from '../parameters.js';
declare const PredictorProvidersMap: Map<NumberTypeRs, Map<DistanceType, PredictorProvider<IDBSCANBaseParameters, any, any>>>;
export { PredictorProvidersMap };
