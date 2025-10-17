import { DenseMatrix, type DenseMatrixRs, type YType } from './index.js'

interface Estimator {
  serialize(): Buffer
}

interface Predictor extends Estimator {
  predict(x: DenseMatrixRs): any
}

interface Transformer extends Estimator {
  transform(x: DenseMatrixRs): DenseMatrixRs
}

interface EstimatorProvider<C, P, E extends Estimator> {
  parameters(config: C): P
  estimator(x: DenseMatrix, y: YType, parameters: P): E
  toMatrix(x: DenseMatrix): DenseMatrixRs
  deserialize(data: Buffer): E
}

interface PredictorProvider<C, P, E extends Predictor> extends EstimatorProvider<C, P, E> {}

interface TransformerProvider<C, P, E extends Transformer> extends EstimatorProvider<C, P, E> {}

export type { Predictor, Estimator, Transformer, EstimatorProvider, PredictorProvider, TransformerProvider }
