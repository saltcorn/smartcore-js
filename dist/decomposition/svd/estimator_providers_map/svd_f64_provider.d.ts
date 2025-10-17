import { type DenseMatrixRs, type YType } from '../../../index.js';
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js';
import { SVDF64, SVDParameters } from '../../../core-bindings/index.js';
import { type ISVDBaseParameters } from '../index.js';
import { type TransformerProvider } from '../../../estimator.js';
declare class SVDF64Provider implements TransformerProvider<ISVDBaseParameters, SVDParameters, SVDF64> {
    parameters(config: ISVDBaseParameters): SVDParameters;
    estimator(x: DenseMatrix, _y: YType, parameters: SVDParameters): SVDF64;
    toMatrix(x: DenseMatrix): DenseMatrixRs;
    deserialize(data: Buffer): SVDF64;
}
export default SVDF64Provider;
