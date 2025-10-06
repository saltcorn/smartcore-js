import { dataset, DatasetF64I64, DatasetF64F64, DatasetF64U64 } from '../core-bindings/index.js';
import { DenseMatrix } from '../linalg/index.js';
class Dataset {
    constructor(inner) {
        this.inner = inner;
    }
}
function prepResponse(data, params) {
    if (params?.returnXY) {
        if (params.unsigned && 'withTargetUnsigned' in data && typeof data.withTargetUnsigned === 'function') {
            let irisDataUnsigned = data.withTargetUnsigned();
            return [new DenseMatrix(data.denseMatrix()), irisDataUnsigned.target];
        }
        return [new DenseMatrix(data.denseMatrix()), data.target];
    }
    return new Dataset(data);
}
function loadIris(params) {
    return prepResponse(dataset.iris().loadDataset(), params);
}
function loadBoston(params) {
    return prepResponse(dataset.boston().loadDataset(), params);
}
function loadBreastCancer(params) {
    return prepResponse(dataset.breastCancer().loadDataset(), params);
}
function loadDiabetes(params) {
    return prepResponse(dataset.diabetes().loadDataset(), params);
}
function loadDigits(params) {
    return prepResponse(dataset.digits().loadDataset(), params);
}
function makeCircles(params) {
    return prepResponse(dataset.generator().makeCircles(params.numSamples, params.factor, params.noise), params);
}
function makeBlobs(params) {
    return prepResponse(dataset.generator().makeBlobs(params.numSamples, params.numFeatures, params.numCenters), params);
}
function makeMoons(params) {
    return prepResponse(dataset.generator().makeMoons(params.numSamples, params.noise), params);
}
export { loadIris, loadBoston, loadBreastCancer, loadDiabetes, loadDigits, makeCircles, makeBlobs, makeMoons };
