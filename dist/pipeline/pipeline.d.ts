import type { XType, YType } from '../index.js';
import type { Estimator, Predictor, Transformer } from './index.js';
type TransformerType = Estimator<any, any, any> & Transformer<any>;
type PredictorType = Estimator<any, any, any> & Predictor<any, any>;
type StepItem = PredictorType | TransformerType | string | null;
type Step = [string, StepItem];
declare class Pipeline {
    steps: Step[];
    verbose: boolean;
    constructor(steps: Step[]);
    private _validateNames;
    private _makeErrorMessage;
    private _validateSteps;
    private _iter;
    private _logMessage;
    private _fitTransformOne;
    private _fit;
    fit(x: XType, y: YType): Pipeline;
    predict(x: XType): YType;
}
export type { Step };
export { Pipeline };
