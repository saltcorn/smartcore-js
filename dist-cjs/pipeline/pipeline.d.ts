import { type YType, type InputType, type OutputType } from '../index.js';
import type { Estimator, Predictor, Transformer } from './index.js';
import { StepAdapter } from './step_adapter.js';
type TransformerType = Estimator<any, any, any> & Transformer<any>;
type PredictorType = Estimator<any, any, any> & Predictor<any, any>;
type StepItem = PredictorType | TransformerType | 'passthrough' | null;
type NamedStep = [string, StepItem];
type DefinedStepItem = PredictorType | TransformerType;
type Step = NamedStep | DefinedStepItem;
interface PipelineConfig {
    verbose?: boolean;
    memory?: boolean;
    validateOnConstruction?: boolean;
}
declare class Pipeline {
    private readonly _steps;
    private readonly _config;
    private _isFitted;
    private _cachedResults;
    constructor(steps: Step[], config?: PipelineConfig);
    /**
     * Normalizes steps to named tuples
     * @param steps
     */
    private _normalizeSteps;
    private _validateSteps;
    private _validateNotEmpty;
    private _validateUniqueNames;
    private _validateTransformers;
    private _validateFinalStep;
    /**
     * Iterates over pipeline steps
     * @param {boolean} withFinal - include the final step in the yielded values
     * @param {boolean} filterPassthrough - exclude steps whose value is 'passthrough' from the yielded steps
     */
    private _iter;
    private _logMessage;
    private _logDataShape;
    /**
     * Fits and transforms a single step
     */
    private _fitTransformOne;
    /**
     * Fits all estimators except the last one (transformers)
     */
    private _fit;
    /**
     * Fits the pipeline to data
     */
    fit(x: InputType, y: YType): Pipeline;
    /**
     * Transforms data through fitted pipeline
     */
    transform(x: InputType): OutputType;
    /**
     * Transforms data through a fitted step
     */
    private _transformOne;
    /**
     * Predicts using the final estimator
     */
    predict(x: InputType): YType;
}
export type { Step, DefinedStepItem, InputType, OutputType, PipelineConfig, StepItem, NamedStep };
export { Pipeline, StepAdapter };
