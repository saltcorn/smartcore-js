import { StandardScalerF64, StandardScalerParameters } from '../../core-bindings/index.js';
import type { Estimator, Transformer } from '../pipeline/index.js';
import type { YType, XType } from '../index.js';
type StandardScalerRs = StandardScalerF64;
type StandardScalerParametersRs = StandardScalerParameters;
interface StandardScalerParametersValues {
}
declare class StandardScaler implements Estimator<XType, YType, StandardScaler>, Transformer<XType> {
    parameters: StandardScalerParametersRs;
    estimator: null | StandardScalerRs;
    static readonly className = "StandardScaler";
    readonly name: string;
    constructor(_params?: StandardScalerParametersValues);
    fit(x: XType, _y: YType): StandardScaler;
    transform(x: XType): XType;
}
export default StandardScaler;
