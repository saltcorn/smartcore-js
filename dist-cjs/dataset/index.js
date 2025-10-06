"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadIris = loadIris;
exports.loadBoston = loadBoston;
exports.loadBreastCancer = loadBreastCancer;
exports.loadDiabetes = loadDiabetes;
exports.loadDigits = loadDigits;
exports.makeCircles = makeCircles;
exports.makeBlobs = makeBlobs;
exports.makeMoons = makeMoons;
const index_js_1 = require("../../core-bindings/index.js");
const index_js_2 = require("../linalg/index.js");
class Dataset {
    constructor(inner) {
        this.inner = inner;
    }
}
function prepResponse(data, params) {
    if (params?.returnXY) {
        if (params.unsigned && 'withTargetUnsigned' in data && typeof data.withTargetUnsigned === 'function') {
            let irisDataUnsigned = data.withTargetUnsigned();
            return [new index_js_2.DenseMatrix(data.denseMatrix()), irisDataUnsigned.target];
        }
        return [new index_js_2.DenseMatrix(data.denseMatrix()), data.target];
    }
    return new Dataset(data);
}
function loadIris(params) {
    return prepResponse(index_js_1.dataset.iris().loadDataset(), params);
}
function loadBoston(params) {
    return prepResponse(index_js_1.dataset.boston().loadDataset(), params);
}
function loadBreastCancer(params) {
    return prepResponse(index_js_1.dataset.breastCancer().loadDataset(), params);
}
function loadDiabetes(params) {
    return prepResponse(index_js_1.dataset.diabetes().loadDataset(), params);
}
function loadDigits(params) {
    return prepResponse(index_js_1.dataset.digits().loadDataset(), params);
}
function makeCircles(params) {
    return prepResponse(index_js_1.dataset.generator().makeCircles(params.numSamples, params.factor, params.noise), params);
}
function makeBlobs(params) {
    return prepResponse(index_js_1.dataset.generator().makeBlobs(params.numSamples, params.numFeatures, params.numCenters), params);
}
function makeMoons(params) {
    return prepResponse(index_js_1.dataset.generator().makeMoons(params.numSamples, params.noise), params);
}
