import { dataset, DatasetF64I64 } from '../../core-bindings/index.js';
import { DenseMatrix } from '../linalg/index.js';
class Dataset {
    constructor(inner) {
        this.inner = inner;
    }
}
function loadIris(params) {
    let irisData = dataset.iris().loadDataset();
    if (params?.returnXY) {
        return [new DenseMatrix(irisData.denseMatrix()), irisData.target];
    }
    return new Dataset(irisData);
}
function loadBoston(params) {
    let bostonData = dataset.boston().loadDataset();
    if (params?.returnXY) {
        return [new DenseMatrix(bostonData.denseMatrix()), bostonData.target];
    }
    return new Dataset(bostonData);
}
function loadBreastCancer(params) {
    let breastCancerData = dataset.breastCancer().loadDataset();
    if (params?.returnXY) {
        return [new DenseMatrix(breastCancerData.denseMatrix()), breastCancerData.target];
    }
    return new Dataset(breastCancerData);
}
function loadDiabetes(params) {
    let diabetesData = dataset.diabetes().loadDataset();
    if (params?.returnXY) {
        return [new DenseMatrix(diabetesData.denseMatrix()), diabetesData.target];
    }
    return new Dataset(diabetesData);
}
function loadDigits(params) {
    let digitsData = dataset.diabetes().loadDataset();
    if (params?.returnXY) {
        return [new DenseMatrix(digitsData.denseMatrix()), digitsData.target];
    }
    return new Dataset(digitsData);
}
export { loadIris, loadBoston, loadBreastCancer, loadDiabetes, loadDigits };
