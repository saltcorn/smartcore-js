"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setKMeansParametersValues = setKMeansParametersValues;
function setKMeansParametersValues(parameters, config) {
    if (config.maxIter) {
        const maxIter = typeof config.maxIter === 'number' ? BigInt(config.maxIter) : config.maxIter;
        parameters.withMaxIter(maxIter);
    }
    if (config.k) {
        const k = typeof config.k === 'number' ? BigInt(config.k) : config.k;
        parameters.withK(k);
    }
}
