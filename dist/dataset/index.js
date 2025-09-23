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
export { loadIris };
