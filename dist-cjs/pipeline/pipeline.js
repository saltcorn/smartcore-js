"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StepAdapter = exports.Pipeline = void 0;
// import { DataFrame } from '../data_frame.js'
const index_js_1 = require("../index.js");
const step_adapter_js_1 = require("./step_adapter.js");
Object.defineProperty(exports, "StepAdapter", { enumerable: true, get: function () { return step_adapter_js_1.StepAdapter; } });
class Pipeline {
    constructor(steps, config) {
        this._isFitted = false;
        this._cachedResults = new Map();
        this._config = {
            verbose: config?.verbose ?? false,
            memory: config?.memory ?? false,
            validateOnConstruction: config?.validateOnConstruction ?? true,
        };
        this._steps = this._normalizeSteps(steps);
        if (this._config.validateOnConstruction) {
            this._validateSteps();
        }
    }
    /**
     * Normalizes steps to named tuples
     * @param steps
     */
    _normalizeSteps(steps) {
        if (steps.length === 0) {
            throw new Error('Pipeline cannot be empty. Provide at least one step.');
        }
        return steps.map((step, idx) => {
            // Already a named step
            if (Array.isArray(step)) {
                const [name, stepItem] = step;
                if (typeof name !== 'string' || name.trim() === '') {
                    throw new Error(`Step at index ${idx} has an invalid name: '${name}'.`);
                }
                return [name, stepItem];
            }
            // Create name from step
            if (step && typeof step === 'object' && 'name' in step) {
                return [`${step.name}${idx}`, step];
            }
            throw new Error(`Invalid step at index ${idx}. Expected NamedStep or object with 'name' property.`);
        });
    }
    _validateSteps() {
        this._validateNotEmpty();
        this._validateUniqueNames();
        this._validateTransformers();
        this._validateFinalStep();
    }
    _validateNotEmpty() {
        if (this._steps.length === 0) {
            throw new Error('Pipeline is empty. Please add at least one step.');
        }
    }
    _validateUniqueNames() {
        const names = this._steps.map(([name]) => name);
        const uniqueNames = new Set(names);
        if (uniqueNames.size !== names.length) {
            const duplicates = names.filter((name, idx) => names.indexOf(name) !== idx);
            throw new Error(`Pipeline step names must be unique. Duplicate names found: ${[...new Set(duplicates)].join(', ')}.`);
        }
    }
    _validateTransformers() {
        const transformerSteps = this._steps.slice(0, -1);
        for (const [name, step] of transformerSteps) {
            if (step === null || step === 'passthrough') {
                continue;
            }
            if (typeof step === 'string') {
                throw new Error(`Step '${name}' is an invalid string: '${step}'. Only 'passthrough' is allowed as a string value.`);
            }
            if (!('transform' in step)) {
                throw new Error(`Intermediate step: '${name}' must be a transformer with a 'transform' method. Got: ${step.constructor?.name || typeof step}.`);
            }
            if (!('fit' in step)) {
                throw new Error(`Step '${name}' must have a 'fit' method. Got: ${typeof step}`);
            }
        }
    }
    _validateFinalStep() {
        const [name, finalStep] = this._steps[this._steps.length - 1];
        if (finalStep === null || finalStep === 'passthrough') {
            return;
        }
        if (typeof finalStep === 'string') {
            throw new Error(`Final step '${name}' is an invalid string: '${finalStep}'. Only 'passthrough' is allowed as a string value.`);
        }
        if (!('fit' in finalStep)) {
            throw new Error(`Final step '${name}' must have a 'fit' method. Got: ${typeof finalStep}`);
        }
    }
    /**
     * Iterates over pipeline steps
     * @param {boolean} withFinal - include the final step in the yielded values
     * @param {boolean} filterPassthrough - exclude steps whose value is 'passthrough' from the yielded steps
     */
    *_iter(withFinal = true, filterPassthrough = true) {
        let stopIdx = withFinal ? this._steps.length : this._steps.length - 1;
        for (let i = 0; i < stopIdx; i++) {
            let [stepName, stepItem] = this._steps[i];
            // Skip null steps
            if (stepItem === null) {
                continue;
            }
            // Handle passthrough
            if (stepItem === 'passthrough') {
                if (!filterPassthrough) {
                    yield [i, stepName, stepItem];
                }
                continue;
            }
            // Invalid string
            if (typeof stepItem === 'string') {
                throw new Error(`Invalid step '${stepName}': unexpected string '${stepItem}'`);
            }
            yield [i, stepName, stepItem];
        }
    }
    _logMessage(stepName, stepIdx, totalSteps) {
        if (!this._config.verbose) {
            return;
        }
        const progress = totalSteps > 0 ? `(${stepIdx + 1}/${totalSteps})` : '';
        console.log(`[Pipeline] ${progress} Processing step: ${stepName}`);
    }
    _logDataShape(data, label) {
        if (!this._config.verbose) {
            return;
        }
        if (data instanceof index_js_1.dataFrame.DataFrame) {
            console.log(`\t${label}: Dataframe(${data.rowsCount} x ${data.columnsCount})`);
        }
        else if (Array.isArray(data)) {
            console.log(`\tArray(${data.length} x ${data[0]?.length || 0})`);
        }
        else {
            console.log(`\t${label}: ${data?.constructor?.name || typeof data}`);
        }
    }
    /**
     * Fits and transforms a single step
     */
    _fitTransformOne(adapter, x, y, stepIdx) {
        this._logMessage(adapter.name, stepIdx, this._steps.length);
        this._logDataShape(x, 'Input');
        const result = adapter.fitTransform(x, y);
        // Cache if memory is enabled
        if (this._config.memory) {
            this._cachedResults.set(adapter.name, result);
        }
        this._logDataShape(result, 'Output');
        return result;
    }
    /**
     * Fits all estimators except the last one (transformers)
     */
    _fit(x, y) {
        let Xt = x;
        for (const [stepIdx, stepName, step] of this._iter(false, false)) {
            // Handle passthrough
            if (step === 'passthrough' || step === null) {
                this._logMessage(stepName, stepIdx, this._steps.length - 1);
                continue;
            }
            const adapter = new step_adapter_js_1.StepAdapter(step, stepName);
            if (adapter.isTransformer) {
                Xt = this._fitTransformOne(adapter, Xt, y, stepIdx);
                // if (Xt instanceof DataFrame) {
                //   console.log(`[Pipeline] after ${stepName}: `, Xt.columnNames)
                // }
            }
            else {
                adapter.fit(Xt, y);
            }
        }
        return Xt;
    }
    /**
     * Fits the pipeline to data
     */
    fit(x, y) {
        if (this._config.verbose) {
            console.log(`[Pipeline] Starting fit with ${this._steps.length} steps`);
        }
        // Fit all transformers
        const Xt = this._fit(x, y);
        // Fit final estimator
        const [predictorName, predictor] = this._steps[this._steps.length - 1];
        if (predictor !== null && predictor !== 'passthrough') {
            if (typeof predictor === 'string') {
                throw new Error(`Invalid final step '${predictorName}': unexpected string '${predictor}'`);
            }
            this._logMessage(predictorName, this._steps.length - 1, this._steps.length);
            predictor.fit(Xt, y);
        }
        this._isFitted = true;
        if (this._config.verbose) {
            console.log('[Pipeline] Fit complete');
        }
        return this;
    }
    /**
     * Transforms data through fitted pipeline
     */
    transform(x) {
        if (!this._isFitted) {
            throw new Error("Pipeline must be fitted before calling 'transform'. Call 'fit' first.");
        }
        let Xt = x;
        for (const [stepIdx, stepName, step] of this._iter(false, false)) {
            if (step === 'passthrough' || step === null) {
                continue;
            }
            const adapter = new step_adapter_js_1.StepAdapter(step, stepName);
            if (adapter.isTransformer) {
                Xt = this._transformOne(adapter, Xt, stepIdx);
            }
        }
        return Xt;
    }
    /**
     * Transforms data through a fitted step
     */
    _transformOne(adapter, x, stepIdx) {
        this._logMessage(adapter.name, stepIdx, this._steps.length);
        // Use cache if available
        if (this._config.memory && this._cachedResults.has(adapter.name)) {
            if (this._config.verbose) {
                console.log(`\tUsing cached result for '${adapter.name}'`);
            }
            return this._cachedResults.get(adapter.name);
        }
        return adapter.transform(x);
    }
    /**
     * Predicts using the final estimator
     */
    predict(x) {
        if (!this._isFitted) {
            throw new Error("Pipeline must be fitted before calling 'predict'. Call 'fit' first.");
        }
        // Transform through all steps except final
        const Xt = this.transform(x);
        // Predict with final estimator
        let [predictorName, predictor] = this._steps[this._steps.length - 1];
        if (predictor === null || predictor === 'passthrough') {
            throw new Error('Cannot predict: final step is to null or passthrough. Pipeline must end with a predictor');
        }
        if (typeof predictor === 'string') {
            throw new Error(`Invalid final step '${predictorName}': unexpected string '${predictor}'`);
        }
        const adapter = new step_adapter_js_1.StepAdapter(predictor, predictorName);
        if (!adapter.isPredictor) {
            throw new Error(`Final step '${predictorName}' does not have a 'predict' method. Got: ${predictor.constructor?.name || typeof predictor}`);
        }
        return adapter.predict(Xt);
    }
}
exports.Pipeline = Pipeline;
