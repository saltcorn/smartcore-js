import { type DenseMatrixRs, type YType } from '../../../index.js';
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js';
import { PCAF64, PCAParameters } from '../../../core-bindings/index.js';
import { type IPCABaseParameters } from '../index.js';
import { type TransformerProvider } from '../../../estimator.js';
declare class PCAF64Provider implements TransformerProvider<IPCABaseParameters, PCAParameters, PCAF64> {
    parameters(config: IPCABaseParameters): PCAParameters;
    estimator(x: DenseMatrix, _y: YType, parameters: PCAParameters): PCAF64;
    toMatrix(x: DenseMatrix): DenseMatrixRs;
    deserialize(data: Buffer): PCAF64;
}
export default PCAF64Provider;
