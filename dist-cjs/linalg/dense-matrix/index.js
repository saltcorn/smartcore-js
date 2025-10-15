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
exports.converters = exports.DenseMatrix = void 0;
const index_js_1 = require("../../core-bindings/index.js");
const converters = __importStar(require("./converters.js"));
exports.converters = converters;
function isU8(no) {
    return Number.isInteger(no) && no >= 0 && no <= 255;
}
function asU8(no) {
    if (!isU8(no)) {
        throw new Error(`Expected an unsigned 8-bit integer (0 - 255). Found: ${no}.`);
    }
    return Number(no);
}
function isU16(no) {
    return Number.isInteger(no) && no >= 0 && no <= 65535;
}
function asU16(no) {
    if (!isU16(no)) {
        throw new Error(`Expected an unsigned 16-bit integer (0 - 65535): Found: ${no}.`);
    }
    return Number(no);
}
function isI32(no) {
    return Number.isInteger(no) && no >= -2147483648 && no <= 2147483647;
}
function asI32(no) {
    if (!isI32(no)) {
        throw new Error(`Expected a signed 32-bit integer (-2147483648 - 2147483647). Found: ${no}.`);
    }
    return Number(no);
}
function isU32(no) {
    return Number.isInteger(no) && no >= 0 && no <= 4294967295;
}
function asU32(no) {
    if (!isU32(no)) {
        throw new Error(`Expected an unsigned 32-bit integer (0 - 4294967295). Found: ${no}.`);
    }
    return Number(no);
}
function isI64(no) {
    return typeof no === 'bigint' && no >= -9223372036854775808n && no <= 9223372036854775807n;
}
function asI64(no) {
    let noBig = typeof no === 'number' ? BigInt(no) : no;
    if (!isI64(noBig)) {
        throw new Error(`Expected a number between -2^63 and 2^63-1. Found: ${no}.`);
    }
    return noBig;
}
function isU64(no) {
    return typeof no === 'bigint' && no >= 0n && no <= 18446744073709551615n;
}
function asU64(no) {
    let noBig = typeof no === 'number' ? BigInt(no) : no;
    if (!isU64(noBig)) {
        throw new Error(`Expected a number between 0 an 2^64-1. Found: ${no}.`);
    }
    return noBig;
}
function isF32(no) {
    return typeof no === 'number' && isFinite(no) && Math.abs(no) < 3.40282347e38;
}
function bigintToNumber(no) {
    let regularNo;
    if (no <= Number.MAX_VALUE)
        regularNo = Number(no);
    else
        throw new Error(`Could not represent the value ${no} as a number.`);
    return regularNo;
}
function asF32(no) {
    let floatNo = typeof no === 'bigint' ? bigintToNumber(no) : no;
    if (!isF32(floatNo)) {
        throw new Error(`Expected a finite number within the F32 range. Found: ${no}.`);
    }
    return floatNo;
}
function isF64(no) {
    return typeof no === 'number' && isFinite(no);
}
function asF64(no) {
    let floatNo = typeof no === 'bigint' ? bigintToNumber(no) : no;
    if (!isF64(floatNo)) {
        throw new Error(`Expected a finite number. Found ${no}.`);
    }
    return floatNo;
}
class DenseMatrix {
    constructor(data, params) {
        if (data instanceof Array) {
            let [nrows, ncols, valuesFlat] = DenseMatrix.prepData(data, params?.columnMajor);
            let floatValues = valuesFlat.map((v) => asF64(v));
            let matrix = new index_js_1.DenseMatrixF64(nrows, ncols, new Float64Array(floatValues), params?.columnMajor);
            this.inner = matrix;
            this._ncols = ncols;
            this._nrows = nrows;
        }
        else {
            this.inner = data;
            let [nrows, ncols] = this.inner.shape();
            this._ncols = ncols;
            this._nrows = nrows;
        }
    }
    get ncols() {
        return this._ncols;
    }
    get nrows() {
        return this._nrows;
    }
    static prepData(data, columnMajor) {
        if (!(data instanceof Array)) {
            throw new Error('Expected data to be an array.');
        }
        let nrows = columnMajor ? (data[0] instanceof Array ? data[0].length : 0) : data.length;
        let ncols = columnMajor ? data.length : data[0] instanceof Array ? data[0].length : 0;
        let valuesFlat = data.flat();
        return [nrows, ncols, valuesFlat];
    }
    get matrix() {
        return this.inner;
    }
    static f64(data, columnMajor) {
        let [nrows, ncols, valuesFlat] = DenseMatrix.prepData(data, columnMajor);
        let floatValues = valuesFlat.map((v) => asF64(v));
        let matrix = new index_js_1.DenseMatrixF64(nrows, ncols, new Float64Array(floatValues), columnMajor);
        return new DenseMatrix(matrix, { columnMajor });
    }
    static f32(data, columnMajor) {
        let [nrows, ncols, valuesFlat] = DenseMatrix.prepData(data, columnMajor);
        let floatValues = valuesFlat.map((v) => asF32(v));
        let matrix = new index_js_1.DenseMatrixF32(nrows, ncols, new Float32Array(floatValues), columnMajor);
        return new DenseMatrix(matrix, { columnMajor });
    }
    static i32(data, columnMajor) {
        let [nrows, ncols, valuesFlat] = DenseMatrix.prepData(data, columnMajor);
        let floatValues = valuesFlat.map((v) => asI32(v));
        let matrix = new index_js_1.DenseMatrixI32(nrows, ncols, new Int32Array(floatValues), columnMajor);
        return new DenseMatrix(matrix, { columnMajor });
    }
    static u32(data, columnMajor) {
        let [nrows, ncols, valuesFlat] = DenseMatrix.prepData(data, columnMajor);
        let floatValues = valuesFlat.map((v) => asU32(v));
        let matrix = new index_js_1.DenseMatrixU32(nrows, ncols, new Uint32Array(floatValues), columnMajor);
        return new DenseMatrix(matrix, { columnMajor });
    }
    static u8(data, columnMajor) {
        let [nrows, ncols, valuesFlat] = DenseMatrix.prepData(data, columnMajor);
        let floatValues = valuesFlat.map((v) => asU8(v));
        let matrix = new index_js_1.DenseMatrixU8(nrows, ncols, new Uint8Array(floatValues), columnMajor);
        return new DenseMatrix(matrix, { columnMajor });
    }
    static u16(data, columnMajor) {
        let [nrows, ncols, valuesFlat] = DenseMatrix.prepData(data, columnMajor);
        let floatValues = valuesFlat.map((v) => asU16(v));
        let matrix = new index_js_1.DenseMatrixU16(nrows, ncols, new Uint16Array(floatValues), columnMajor);
        return new DenseMatrix(matrix, { columnMajor });
    }
    static i64(data, columnMajor) {
        let [nrows, ncols, valuesFlat] = DenseMatrix.prepData(data, columnMajor);
        let floatValues = valuesFlat.map((v) => asI64(v));
        let matrix = new index_js_1.DenseMatrixI64(nrows, ncols, new BigInt64Array(floatValues), columnMajor);
        return new DenseMatrix(matrix, { columnMajor });
    }
    static u64(data, columnMajor) {
        let [nrows, ncols, valuesFlat] = DenseMatrix.prepData(data, columnMajor);
        let floatValues = valuesFlat.map((v) => asU64(v));
        let matrix = new index_js_1.DenseMatrixU64(nrows, ncols, new BigUint64Array(floatValues), columnMajor);
        return new DenseMatrix(matrix, { columnMajor });
    }
    asRsMatrix(dataType) {
        let expectedType;
        let foundType;
        switch (dataType) {
            case undefined:
                return this.inner;
            case 'f64':
                if (this.inner instanceof index_js_1.DenseMatrixF64)
                    return this.inner;
                else {
                    expectedType = 'DenseMatrixF64';
                    foundType = this.inner.constructor?.name || typeof this.inner;
                }
                break;
            case 'f32':
                if (this.inner instanceof index_js_1.DenseMatrixF32)
                    return this.inner;
                else {
                    expectedType = 'DenseMatrixF32';
                    foundType = this.inner.constructor?.name || typeof this.inner;
                }
                break;
            case 'i32':
                if (this.inner instanceof index_js_1.DenseMatrixI32)
                    return this.inner;
                else {
                    expectedType = 'DenseMatrixI32';
                    foundType = this.inner.constructor?.name || typeof this.inner;
                }
                break;
            case 'u32':
                if (this.inner instanceof index_js_1.DenseMatrixU32)
                    return this.inner;
                else {
                    expectedType = 'DenseMatrixU32';
                    foundType = this.inner.constructor?.name || typeof this.inner;
                }
                break;
            case 'u8':
                if (this.inner instanceof index_js_1.DenseMatrixU8)
                    return this.inner;
                else {
                    expectedType = 'DenseMatrixU8';
                    foundType = this.inner.constructor?.name || typeof this.inner;
                }
                break;
            case 'u16':
                if (this.inner instanceof index_js_1.DenseMatrixU16)
                    return this.inner;
                else {
                    expectedType = 'DenseMatrixU16';
                    foundType = this.inner.constructor?.name || typeof this.inner;
                }
                break;
            case 'i64':
                if (this.inner instanceof index_js_1.DenseMatrixI64)
                    return this.inner;
                else {
                    expectedType = 'DenseMatrixI64';
                    foundType = this.inner.constructor?.name || typeof this.inner;
                }
                break;
            case 'u64':
                if (this.inner instanceof index_js_1.DenseMatrixU64)
                    return this.inner;
                else {
                    expectedType = 'DenseMatrixU64';
                    foundType = this.inner.constructor?.name || typeof this.inner;
                }
                break;
            default:
                throw new Error(`[${this.constructor?.name}] Unexpected dataTypeValue '${dataType}'. Valid values are: f64, f32, i32, u32, u8, u16, i64, u64.`);
        }
        throw new Error(`[$this.constructor?.name].asRsMatrix Expected '${expectedType}' found '${foundType}'`);
    }
}
exports.DenseMatrix = DenseMatrix;
