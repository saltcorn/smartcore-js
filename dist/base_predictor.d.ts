import { DenseMatrix, type InputType } from './index.js';
import type { Predictor } from './pipeline/index.js';
import { BaseEstimator } from './base_estimator.js';
/**
 * Abstract base class for predictors
 */
declare abstract class BasePredictor<TEstimator, TParams, PredictionType> extends BaseEstimator<TEstimator, TParams> implements Predictor<InputType, PredictionType> {
    constructor(parameters: TParams);
    /**
     * A template for the transform method
     * @param {InputType} x
     */
    predict(x: InputType): PredictionType;
    /**
     * @param {DenseMatrix} matrix
     */
    protected abstract predictMatrix(matrix: DenseMatrix): PredictionType;
}
export { BasePredictor };
