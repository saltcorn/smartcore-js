import { trainTestSplitF64F64, trainTestSplitF64I64, trainTestSplitF64BigI64 } from '../../core-bindings/index.js';
import { DenseMatrix } from '../linalg/index.js';
function trainTestSplit(x, y, params) {
    x = x instanceof DenseMatrix ? x : DenseMatrix.f64(x);
    let shuffle = params?.shuffle === undefined ? true : params?.shuffle;
    if (y instanceof BigInt64Array) {
        let [xTrain, xTest, yTrain, yTest] = trainTestSplitF64BigI64(x.asF64(), y, params.testSize, shuffle, params.seed);
        return [new DenseMatrix(xTrain), new DenseMatrix(xTest), yTrain, yTest];
    }
    if (y instanceof Float64Array || !y.every((val) => Number.isInteger(val))) {
        let ys = new Float64Array(y);
        let [xTrain, xTest, yTrain, yTest] = trainTestSplitF64F64(x.asF64(), ys, params.testSize, shuffle, params.seed);
        return [new DenseMatrix(xTrain), new DenseMatrix(xTest), yTrain, yTest];
    }
    let [xTrain, xTest, yTrain, yTest] = trainTestSplitF64I64(x.asF64(), y, params?.testSize, shuffle, params?.seed);
    return [new DenseMatrix(xTrain), new DenseMatrix(xTest), yTrain, yTest];
}
export { trainTestSplit };
