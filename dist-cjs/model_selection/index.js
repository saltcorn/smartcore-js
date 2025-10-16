"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.trainTestSplit = trainTestSplit;
const coreBindings = __importStar(require("../core-bindings/index.js"));
const index_js_1 = require("../index.js");
const index_js_2 = require("../linalg/index.js");
function trainTestSplit(x, y, params) {
    x = x instanceof index_js_2.DenseMatrix ? x : new index_js_2.DenseMatrix(x);
    let shuffle = params?.shuffle === undefined ? true : params?.shuffle;
    let yTyped = (0, index_js_1.asTypedY)(y);
    let yType = 'I32';
    if (yTyped instanceof Float64Array)
        yType = 'F64';
    if (yTyped instanceof BigInt64Array)
        yType = 'I64';
    if (yTyped instanceof BigUint64Array)
        yType = 'U64';
    if (yTyped instanceof Int32Array)
        yType = 'I32';
    let fnName = `trainTestSplit${x.numberType.toUpperCase()}${yType}`;
    const trainTestSplitFn = coreBindings[fnName];
    if (typeof trainTestSplitFn !== 'function') {
        throw new Error(`[trainTestSplit] Type combination (feature: ${x.numberType}, target: ${yType}) is not a callable function`);
    }
    let [xTrain, xTest, yTrain, yTest] = trainTestSplitFn(x.asRsMatrix(), y, params.testSize, shuffle, params.seed);
    return [new index_js_2.DenseMatrix(xTrain), new index_js_2.DenseMatrix(xTest), yTrain, yTest];
    //   if (yTyped instanceof Float64Array) {
    //     switch (x.numberType) {
    //       case 'f32':
    //         trainTestSplitFn = trainTestSplitF32F64
    //         break
    //       case 'f64':
    //         trainTestSplitFn = trainTestSplitF64F64
    //         break
    //       case 'u32':
    //         trainTestSplitFn = trainTestSplitU32F64
    //         break
    //       case 'i32':
    //         trainTestSplitFn = trainTestSplitI32F64
    //         break
    //       case 'i64':
    //         trainTestSplitFn = trainTestSplitI64F64
    //         break
    //       case 'u16':
    //         trainTestSplitFn = trainTestSplitU16F64
    //         break
    //       case 'u8':
    //         trainTestSplitFn = trainTestSplitU8F64
    //         break
    //       case 'u64':
    //         trainTestSplitFn = trainTestSplitU64F64
    //         break
    //     }
    //   }
    //   if (yTyped instanceof BigInt64Array) {
    //     switch (x.numberType) {
    //       case 'f32':
    //         trainTestSplitFn = trainTestSplitF32I64
    //         break
    //       case 'f64':
    //         trainTestSplitFn = trainTestSplitF64I64
    //         break
    //       case 'u32':
    //         trainTestSplitFn = trainTestSplitU32I64
    //         break
    //       case 'i32':
    //         trainTestSplitFn = trainTestSplitI32I64
    //         break
    //       case 'i64':
    //         trainTestSplitFn = trainTestSplitI64I64
    //         break
    //       case 'u16':
    //         trainTestSplitFn = trainTestSplitU16I64
    //         break
    //       case 'u8':
    //         trainTestSplitFn = trainTestSplitU8I64
    //         break
    //       case 'u64':
    //         trainTestSplitFn = trainTestSplitU64I64
    //         break
    //     }
    //   }
    //   if (yTyped instanceof BigUint64Array) {
    //     switch (x.numberType) {
    //       case 'f32':
    //         trainTestSplitFn = trainTestSplitF32U64
    //         break
    //       case 'f64':
    //         trainTestSplitFn = trainTestSplitF64U64
    //         break
    //       case 'u32':
    //         trainTestSplitFn = trainTestSplitU32U32
    //         break
    //       case 'i32':
    //         trainTestSplitFn = trainTestSplitI32U32
    //         break
    //       case 'i64':
    //         trainTestSplitFn = trainTestSplitI64U32
    //         break
    //       case 'u16':
    //         trainTestSplitFn = trainTestSplitU16U32
    //         break
    //       case 'u8':
    //         trainTestSplitFn = trainTestSplitU8U32
    //         break
    //       case 'u64':
    //         trainTestSplitFn = trainTestSplitU64U32
    //         break
    //     }
    //   }
    //   if (yTyped instanceof Int32Array) {
    //   }
    //   return y
    //   if (y instanceof Int32Array) {
    //     let [xTrain, xTest, yTrain, yTest] = trainTestSplitF64I32(
    //       x.asRsMatrix('f64') as DenseMatrixF64,
    //       y,
    //       params.testSize,
    //       shuffle,
    //       params.seed,
    //     )
    //     return [new DenseMatrix(xTrain), new DenseMatrix(xTest), yTrain, yTest]
    //   } else if (y instanceof BigInt64Array) {
    //     let [xTrain, xTest, yTrain, yTest] = trainTestSplitF64I64(
    //       x.asRsMatrix('f64') as DenseMatrixF64,
    //       y,
    //       params.testSize,
    //       shuffle,
    //       params.seed,
    //     )
    //     return [new DenseMatrix(xTrain), new DenseMatrix(xTest), yTrain, yTest]
    //   }
    //   throw new Error('TODO!')
    //   else if (y instanceof BigUint64Array) {
    //     let [xTrain, xTest, yTrain, yTest] = trainTestSplitF64BigU64(x.asF64(), y, params.testSize, shuffle, params.seed)
    //     return [new DenseMatrix(xTrain), new DenseMatrix(xTest), yTrain, yTest]
    //   } else if (y instanceof Float64Array || !y.every((val) => Number.isInteger(val))) {
    //     let ys = new Float64Array(y)
    //     let [xTrain, xTest, yTrain, yTest] = trainTestSplitF64F64(x.asF64(), ys, params.testSize, shuffle, params.seed)
    //     return [new DenseMatrix(xTrain), new DenseMatrix(xTest), yTrain, yTest]
    //   }
    //   let [xTrain, xTest, yTrain, yTest] = trainTestSplitF64I64(x.asF64(), y, params?.testSize, shuffle, params?.seed)
    //   return [new DenseMatrix(xTrain), new DenseMatrix(xTest), yTrain, yTest]
}
