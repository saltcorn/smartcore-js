"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setDBSCANParametersValues = setDBSCANParametersValues;
function setDBSCANParametersValues(parameters, config) {
    if (config.algorithm) {
        parameters.withAlgorithm(config.algorithm);
    }
    if (config.eps) {
        parameters.withEps(config.eps);
    }
    if (config.minSamples) {
        parameters.withMinSamples(config.minSamples);
    }
}
