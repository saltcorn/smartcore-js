import * as numberTypeCheckers from './number_type_checkers.js';
export * as dataFrame from './data_frame.js';
export * from './linalg/index.js';
// export * as linearModel from './linear_model/index.js'
// export * as ensemble from './ensemble/index.js'
export * as preprocessing from './preprocessing/index.js';
export * as dataset from './dataset/index.js';
export * as modelSelection from './model_selection/index.js';
export * as metrics from './metrics/index.js';
export * as pipeline from './pipeline/index.js';
export * as cluster from './cluster/index.js';
// export * as decomposition from './decomposition/index.js'
// export * as naiveBayes from './naive_bayes/index.js'
// export * as neighbors from './neighbors/index.js'
export * as coreBindings from './core-bindings/index.js';
function asTypedY(y) {
    if (y instanceof Float64Array || y instanceof BigInt64Array || y instanceof BigUint64Array || y instanceof Int32Array)
        return y;
    if (y.length === 0)
        return new Float64Array();
    let largestNo = y[0];
    let smallestNo = y[0];
    let hasFloat = false;
    for (let v of y) {
        if (v > largestNo)
            largestNo = BigInt(v);
        if (v < smallestNo)
            smallestNo = BigInt(v);
        if (!Number.isInteger(v))
            hasFloat = true;
    }
    // floating point types
    if (hasFloat) {
        return Float64Array.from(y);
        // unsigned types
    }
    else if (smallestNo < 0) {
        if (numberTypeCheckers.isU64(BigInt(largestNo))) {
            return BigUint64Array.from(y);
        }
        //signed types
    }
    else {
        if (numberTypeCheckers.isI32(largestNo)) {
            return Int32Array.from(y);
        }
        else if (numberTypeCheckers.isI64(largestNo)) {
            return BigInt64Array.from(y);
        }
    }
    throw new Error(`Conversion to typed array failed!`);
}
export { asTypedY, numberTypeCheckers };
