import { type TransformerProvider } from '../../../estimator.js';
import type { ISVDBaseParameters } from '../index.js';
import type { NumberTypeRs } from '../../index.js';
declare const TransformerProvidersMap: Map<NumberTypeRs, TransformerProvider<ISVDBaseParameters, any, any>>;
interface ISVDParametersRs {
    withNComponents(nComponents: number): void;
}
declare function setSVDParametersValues(parameters: ISVDParametersRs, config: ISVDBaseParameters): void;
export { TransformerProvidersMap, setSVDParametersValues };
