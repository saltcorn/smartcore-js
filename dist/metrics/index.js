import { AccuracyF64, AccuracyI64, AccuracyU64 } from '../core-bindings/index.js';
import {} from '../index.js';
function toBigInt64Array(values) {
    if (!values.every((n) => Number.isInteger(n))) {
        throw new Error("Can't convert an Array containing non-integers to a BigInt64Array.");
    }
    let valuesMapped = values.map((n) => BigInt(n));
    return new BigInt64Array(valuesMapped);
}
function accuracyScore(yTrue, yPred) {
    if (yTrue instanceof Float64Array && yPred instanceof Float64Array) {
        return new AccuracyF64().getScore(yTrue, yPred);
    }
    else if (yTrue instanceof BigInt64Array && yPred instanceof BigInt64Array) {
        return new AccuracyI64().getScore(yTrue, yPred);
    }
    else if (yTrue instanceof BigUint64Array && yPred instanceof BigUint64Array) {
        return new AccuracyU64().getScore(yTrue, yPred);
    }
    else if (yTrue instanceof Array && yPred instanceof Array) {
        return new AccuracyI64().getScore(toBigInt64Array(yTrue), toBigInt64Array(yPred));
    }
    throw new Error('Unsupported data type for input arrays.');
}
var DistanceType;
(function (DistanceType) {
    DistanceType[DistanceType["EUCLIDIAN"] = 0] = "EUCLIDIAN";
    DistanceType[DistanceType["HAMMING"] = 1] = "HAMMING";
    DistanceType[DistanceType["MANHATTAN"] = 2] = "MANHATTAN";
    DistanceType[DistanceType["MAHALANOBIS"] = 3] = "MAHALANOBIS";
    DistanceType[DistanceType["MINKOWSKI"] = 4] = "MINKOWSKI";
})(DistanceType || (DistanceType = {}));
export { accuracyScore, DistanceType };
