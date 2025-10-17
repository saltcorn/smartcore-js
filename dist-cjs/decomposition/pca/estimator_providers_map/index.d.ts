import { type TransformerProvider } from '../../../estimator.js';
import type { NumberTypeRs, IPCABaseParameters } from '../index.js';
declare const TransformerProvidersMap: Map<NumberTypeRs, TransformerProvider<IPCABaseParameters, any, any>>;
interface IPCAParametersRs {
    withNComponents(nComponents: number): void;
    useCorrelationMatrix(useCorrelationMatrix: boolean): void;
}
declare function setPCAParametersValues(parameters: IPCAParametersRs, config: IPCABaseParameters): void;
export { TransformerProvidersMap, setPCAParametersValues };
