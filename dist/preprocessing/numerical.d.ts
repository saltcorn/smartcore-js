import { StandardScalerF64, StandardScalerParameters } from '../../core-bindings/index.js';
import { DenseMatrix } from '../linalg/index.js';
type StandardScalerRs = StandardScalerF64;
type StandardScalerParametersRs = StandardScalerParameters;
interface StandardScalerParametersValues {
}
declare class StandardScaler {
    parameters: StandardScalerParametersRs;
    constructor(_params?: StandardScalerParametersValues);
    fit(x: DenseMatrix | number[][]): StandardScalerTransformer;
}
declare class StandardScalerTransformer {
    inner: StandardScalerRs;
    constructor(inner: StandardScalerRs);
    transform(x: DenseMatrix | number[][]): import("../../core-bindings/index.js").DenseMatrixF64;
}
export default StandardScaler;
