import { type DenseMatrixRs, type YType } from '../../../index.js';
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js';
import { PCAF32, PCAParameters } from '../../../core-bindings/index.js';
import { type IPCABaseParameters } from '../index.js';
import { type TransformerProvider } from '../../../estimator.js';
declare class PCAF32Provider implements TransformerProvider<IPCABaseParameters, PCAParameters, PCAF32> {
    parameters(config: IPCABaseParameters): PCAParameters;
    estimator(x: DenseMatrix, _y: YType, parameters: PCAParameters): PCAF32;
    toMatrix(x: DenseMatrix): DenseMatrixRs;
    deserialize(data: Buffer): PCAF32;
}
export default PCAF32Provider;
