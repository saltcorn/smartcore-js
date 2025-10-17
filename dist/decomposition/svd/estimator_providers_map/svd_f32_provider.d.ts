import { type DenseMatrixRs, type YType } from '../../../index.js';
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js';
import { SVDF32, SVDParameters } from '../../../core-bindings/index.js';
import { type ISVDBaseParameters } from '../index.js';
import { type TransformerProvider } from '../../../estimator.js';
declare class SVDF32Provider implements TransformerProvider<ISVDBaseParameters, SVDParameters, SVDF32> {
    parameters(config: ISVDBaseParameters): SVDParameters;
    estimator(x: DenseMatrix, _y: YType, parameters: SVDParameters): SVDF32;
    toMatrix(x: DenseMatrix): DenseMatrixRs;
    deserialize(data: Buffer): SVDF32;
}
export default SVDF32Provider;
