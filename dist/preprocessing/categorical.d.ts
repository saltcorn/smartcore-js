import { OneHotEncoderF64, OneHotEncoderParameters } from '../../core-bindings/index.js';
import type { Estimator, Transformer } from '../pipeline/index.js';
import type { YType, XType } from '../index.js';
type OneHotEncoderRs = OneHotEncoderF64;
type OneHotEncoderParametersRs = OneHotEncoderParameters;
interface OneHotEncoderParametersValues {
    categoricalParams: BigUint64Array;
}
declare class OneHotEncoder implements Estimator<XType, YType, OneHotEncoder>, Transformer<XType> {
    parameters: OneHotEncoderParametersRs;
    estimator: null | OneHotEncoderRs;
    static readonly className = "OneHotEncoder";
    readonly name: string;
    constructor(params: OneHotEncoderParametersValues);
    fit(x: XType, _y: YType): OneHotEncoder;
    transform(x: XType): XType;
}
export default OneHotEncoder;
