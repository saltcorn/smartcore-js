import { type TransformerProvider } from '../../../estimator.js';
import type { NumberTypeRs, IOneHotEncoderBaseParameters } from '../index.js';
declare const TransformerProvidersMap: Map<NumberTypeRs, TransformerProvider<IOneHotEncoderBaseParameters, any, any>>;
declare function normalizeCategoricalParams(categoricalParams: number[] | bigint[] | BigUint64Array | Uint32Array): BigUint64Array;
export { TransformerProvidersMap, normalizeCategoricalParams };
