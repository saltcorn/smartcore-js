"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StepAdapter = void 0;
/**
 * Wraps a step to handle both XType and DataFrame transparently
 */
class StepAdapter {
    constructor(step, stepName) {
        this.step = step;
        this.stepName = stepName;
    }
    fit(x, y) {
        this.step.fit(x, y);
    }
    transform(x) {
        if ('transform' in this.step) {
            return this.step.transform(x);
        }
        throw new Error(`Step '${this.stepName}' does not have a transform method.`);
    }
    fitTransform(x, y) {
        this.fit(x, y);
        return this.transform(x);
    }
    predict(x) {
        if ('predict' in this.step) {
            return this.step.predict(x);
        }
        throw new Error(`Step '${this.stepName}' does not have a predict method`);
    }
    get name() {
        return this.stepName;
    }
    get isTransformer() {
        return 'transform' in this.step;
    }
    get isPredictor() {
        return 'predict' in this.step;
    }
}
exports.StepAdapter = StepAdapter;
