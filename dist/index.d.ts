import type { DenseMatrix } from './linalg/index.js';
export * from './linalg/index.js';
export * as linear_model from './linear_model/index.js';
export * as ensemble from './ensemble/index.js';
export * as preprocessing from './preprocessing/index.js';
export * as dataset from './dataset/index.js';
export * as model_selection from './model_selection/index.js';
export * as metrics from './metrics/index.js';
declare abstract class SerDe<T> {
    abstract serialize(): Buffer;
    abstract deserialize(data: Buffer): T;
}
declare abstract class BaseEstimator<T> {
    abstract fit(x: DenseMatrix | number[][], y: number[]): T;
}
export { SerDe, BaseEstimator };
