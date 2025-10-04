import type { YType } from '../index.js';
import { type DefinedStepItem, type InputType, type OutputType } from './pipeline.js';
/**
 * Wraps a step to handle both XType and DataFrame transparently
 */
declare class StepAdapter {
    private step;
    private stepName;
    constructor(step: DefinedStepItem, stepName: string);
    fit(x: InputType, y: YType): void;
    transform(x: InputType): OutputType;
    fitTransform(x: InputType, y: YType): OutputType;
    predict(x: InputType): YType;
    get name(): string;
    get isTransformer(): boolean;
    get isPredictor(): boolean;
}
export { StepAdapter };
