import { type YType } from './index.js'
import { DenseMatrix, type PredictOutput } from './core-bindings/index.js'

interface Estimator {
  serialize(): Buffer
}

interface Predictor extends Estimator {
  predict(x: DenseMatrix): PredictOutput
}

interface Transformer extends Estimator {
  transform(x: DenseMatrix): DenseMatrix
}

interface EstimatorProvider<C, P, E extends Estimator> {
  parameters(config: C): P
  estimator(x: DenseMatrix, y: YType, parameters: P): E
  toMatrix(x: DenseMatrix): DenseMatrix
  deserialize(data: Buffer): E
}

interface PredictorProvider<C, P, E extends Predictor> extends EstimatorProvider<C, P, E> {}

interface TransformerProvider<C, P, E extends Transformer> extends EstimatorProvider<C, P, E> {}

export type { Predictor, Estimator, Transformer, EstimatorProvider, PredictorProvider, TransformerProvider }
