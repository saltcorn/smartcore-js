import { type DenseMatrixRs, type YType } from '../../../index.js';
import { DenseMatrix } from '../../../linalg/dense-matrix/index.js';
import { RidgeRegressionF32F32, RidgeRegressionF32Parameters } from '../../../core-bindings/index.js';
import { type IRidgeRegressionBaseParameters } from '../index.js';
import { type PredictorProvider } from '../../../estimator.js';
declare class RidgeRegressionF32F32Provider implements PredictorProvider<IRidgeRegressionBaseParameters, RidgeRegressionF32Parameters, RidgeRegressionF32F32> {
    parameters(config: IRidgeRegressionBaseParameters): RidgeRegressionF32Parameters;
    estimator(x: DenseMatrix, y: YType, parameters: RidgeRegressionF32Parameters): RidgeRegressionF32F32;
    toMatrix(x: DenseMatrix): DenseMatrixRs;
    deserialize(data: Buffer): RidgeRegressionF32F32;
}
export default RidgeRegressionF32F32Provider;
