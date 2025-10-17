"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DenseMatrix = void 0;
const index_js_1 = require("../../core-bindings/index.js");
const index_js_2 = require("../../index.js");
class DenseMatrix {
    constructor(data, params) {
        let inner = null;
        if (Array.isArray(data)) {
            if (data.length === 0) {
                throw new Error(`[DenseMatrix] 'data' cannot be an empty array`);
            }
            if (!Array.isArray(data[0])) {
                throw new Error(`[DenseMatrix] Expected 'data' to be an array of arrays`);
            }
            if (data[0].length === 0) {
                throw new Error(`[DenseMatrix] Arrays nested in 'data' cannot be an empty`);
            }
            const nrows = params?.columnMajor ? data[0].length : data.length;
            const ncols = params?.columnMajor ? data.length : data[0].length;
            const valuesFlat = data.flat();
            this._largestNo = data[0][0];
            this._smallestNo = data[0][0];
            this._hasFloat = false;
            for (let v of valuesFlat) {
                if (v > this._largestNo)
                    this._largestNo = v;
                if (v < this._smallestNo)
                    this._smallestNo = v;
                if (!Number.isInteger(v))
                    this._hasFloat = true;
            }
            // floating point types
            if (this._hasFloat) {
                const largestNo = index_js_2.numberTypeCheckers.bigintToNumber(this._largestNo);
                const smallestNo = index_js_2.numberTypeCheckers.bigintToNumber(this._smallestNo);
                if (index_js_2.numberTypeCheckers.isF32(largestNo) && index_js_2.numberTypeCheckers.isF32(smallestNo)) {
                    inner = new index_js_1.DenseMatrixF32(nrows, ncols, Float32Array.from(valuesFlat), params?.columnMajor);
                }
                else {
                    inner = new index_js_1.DenseMatrixF64(nrows, ncols, Float64Array.from(valuesFlat), params?.columnMajor);
                }
                // unsigned types
            }
            else if (this._smallestNo < 0) {
                if (index_js_2.numberTypeCheckers.isU8(this._largestNo)) {
                    inner = new index_js_1.DenseMatrixU8(nrows, ncols, Uint8Array.from(valuesFlat), params?.columnMajor);
                }
                else if (index_js_2.numberTypeCheckers.isU16(this._largestNo)) {
                    inner = new index_js_1.DenseMatrixU16(nrows, ncols, Uint16Array.from(valuesFlat), params?.columnMajor);
                }
                else if (index_js_2.numberTypeCheckers.isU32(this._largestNo)) {
                    inner = new index_js_1.DenseMatrixU32(nrows, ncols, Uint32Array.from(valuesFlat), params?.columnMajor);
                }
                else if (index_js_2.numberTypeCheckers.isU64(this._largestNo)) {
                    inner = new index_js_1.DenseMatrixU64(nrows, ncols, BigUint64Array.from(valuesFlat), params?.columnMajor);
                }
                //signed types
            }
            else {
                if (index_js_2.numberTypeCheckers.isI32(this._largestNo)) {
                    inner = new index_js_1.DenseMatrixI32(nrows, ncols, Int32Array.from(valuesFlat), params?.columnMajor);
                }
                else if (index_js_2.numberTypeCheckers.isI64(this._largestNo)) {
                    inner = new index_js_1.DenseMatrixI64(nrows, ncols, BigInt64Array.from(valuesFlat), params?.columnMajor);
                }
            }
            this._ncols = ncols;
            this._nrows = nrows;
        }
        else if ('max' in data && typeof data.max === 'function' && 'min' in data && typeof data.min === 'function') {
            inner = data;
            let [nrows, ncols] = inner.shape();
            this._ncols = ncols;
            this._nrows = nrows;
            this._largestNo = data.max();
            this._smallestNo = data.min();
            this._hasFloat = data instanceof index_js_1.DenseMatrixF32 || data instanceof index_js_1.DenseMatrixF64;
        }
        else {
            throw new Error(`[DenseMatrix] Unsupported input type: '${data.constructor?.name || typeof data}'`);
        }
        if (inner === null) {
            throw new Error(`[DenseMatrix] Unsupported input type: '${data.constructor?.name || typeof data}'`);
        }
        this.inner = inner;
    }
    get numberType() {
        return this.inner.numberType;
    }
    get ncols() {
        return this._ncols;
    }
    get nrows() {
        return this._nrows;
    }
    //   private static prepData(data: (number | bigint)[][], columnMajor?: boolean): [number, number, (number | bigint)[]] {
    //     if (!Array.isArray(data)) {
    //       throw new Error('Expected data to be an array.')
    //     }
    //     let nrows = columnMajor ? (data[0] instanceof Array ? data[0].length : 0) : data.length
    //     let ncols = columnMajor ? data.length : data[0] instanceof Array ? data[0].length : 0
    //     let valuesFlat = data.flat()
    //     return [nrows, ncols, valuesFlat]
    //   }
    //   get matrix(): DenseMatrixRs {
    //     return this.inner
    //   }
    //   static f64(data: (number | bigint)[][], columnMajor?: boolean): DenseMatrix {
    //     let [nrows, ncols, valuesFlat] = DenseMatrix.prepData(data, columnMajor)
    //     let floatValues = valuesFlat.map((v) => numberTypeCheckers.asF64(v))
    //     let matrix = new DenseMatrixF64(nrows, ncols, new Float64Array(floatValues), columnMajor)
    //     return new DenseMatrix(matrix, { columnMajor })
    //   }
    //   static f32(data: (number | bigint)[][], columnMajor?: boolean): DenseMatrix {
    //     let [nrows, ncols, valuesFlat] = DenseMatrix.prepData(data, columnMajor)
    //     let floatValues = valuesFlat.map((v) => asF32(v))
    //     let matrix = new DenseMatrixF32(nrows, ncols, new Float32Array(floatValues), columnMajor)
    //     return new DenseMatrix(matrix, { columnMajor })
    //   }
    //   static i32(data: (number | bigint)[][], columnMajor?: boolean): DenseMatrix {
    //     let [nrows, ncols, valuesFlat] = DenseMatrix.prepData(data, columnMajor)
    //     let floatValues = valuesFlat.map((v) => asI32(v))
    //     let matrix = new DenseMatrixI32(nrows, ncols, new Int32Array(floatValues), columnMajor)
    //     return new DenseMatrix(matrix, { columnMajor })
    //   }
    //   static u32(data: (number | bigint)[][], columnMajor?: boolean): DenseMatrix {
    //     let [nrows, ncols, valuesFlat] = DenseMatrix.prepData(data, columnMajor)
    //     let floatValues = valuesFlat.map((v) => asU32(v))
    //     let matrix = new DenseMatrixU32(nrows, ncols, new Uint32Array(floatValues), columnMajor)
    //     return new DenseMatrix(matrix, { columnMajor })
    //   }
    //   static u8(data: (number | bigint)[][], columnMajor?: boolean): DenseMatrix {
    //     let [nrows, ncols, valuesFlat] = DenseMatrix.prepData(data, columnMajor)
    //     let floatValues = valuesFlat.map((v) => asU8(v))
    //     let matrix = new DenseMatrixU8(nrows, ncols, new Uint8Array(floatValues), columnMajor)
    //     return new DenseMatrix(matrix, { columnMajor })
    //   }
    //   static u16(data: (number | bigint)[][], columnMajor?: boolean): DenseMatrix {
    //     let [nrows, ncols, valuesFlat] = DenseMatrix.prepData(data, columnMajor)
    //     let floatValues = valuesFlat.map((v) => asU16(v))
    //     let matrix = new DenseMatrixU16(nrows, ncols, new Uint16Array(floatValues), columnMajor)
    //     return new DenseMatrix(matrix, { columnMajor })
    //   }
    //   static i64(data: (number | bigint)[][], columnMajor?: boolean): DenseMatrix {
    //     let [nrows, ncols, valuesFlat] = DenseMatrix.prepData(data, columnMajor)
    //     let floatValues = valuesFlat.map((v) => asI64(v))
    //     let matrix = new DenseMatrixI64(nrows, ncols, new BigInt64Array(floatValues), columnMajor)
    //     return new DenseMatrix(matrix, { columnMajor })
    //   }
    //   static u64(data: (number | bigint)[][], columnMajor?: boolean): DenseMatrix {
    //     let [nrows, ncols, valuesFlat] = DenseMatrix.prepData(data, columnMajor)
    //     let floatValues = valuesFlat.map((v) => asU64(v))
    //     let matrix = new DenseMatrixU64(nrows, ncols, new BigUint64Array(floatValues), columnMajor)
    //     return new DenseMatrix(matrix, { columnMajor })
    //   }
    asRsMatrix(dataType) {
        switch (dataType) {
            case undefined:
                return this.inner;
            case 'f64': {
                let largestNo = index_js_2.numberTypeCheckers.bigintToNumber(this._largestNo);
                let smallestNo = index_js_2.numberTypeCheckers.bigintToNumber(this._smallestNo);
                if (this.inner instanceof index_js_1.DenseMatrixF64)
                    return this.inner;
                else if (index_js_2.numberTypeCheckers.isF64(largestNo) && index_js_2.numberTypeCheckers.isF64(smallestNo))
                    return this.inner.asF64();
                else
                    throw new Error(`[DenseMatrix] Cannot convert float data into non-float data`);
            }
            case 'f32': {
                let largestNo = index_js_2.numberTypeCheckers.bigintToNumber(this._largestNo);
                let smallestNo = index_js_2.numberTypeCheckers.bigintToNumber(this._smallestNo);
                if (this.inner instanceof index_js_1.DenseMatrixF32)
                    return this.inner;
                else if (index_js_2.numberTypeCheckers.isF32(largestNo) && index_js_2.numberTypeCheckers.isF32(smallestNo))
                    return this.inner.asF32();
                else
                    throw new Error(`[DenseMatrix] Conversion failed: ${largestNo} or ${smallestNo} is out of the f32 range.`);
            }
            case 'i32': {
                let largestNo = index_js_2.numberTypeCheckers.bigintToNumber(this._largestNo);
                let smallestNo = index_js_2.numberTypeCheckers.bigintToNumber(this._smallestNo);
                if (this.inner instanceof index_js_1.DenseMatrixI32)
                    return this.inner;
                if (this.inner instanceof index_js_1.DenseMatrixF32 || this.inner instanceof index_js_1.DenseMatrixF64)
                    throw new Error(`[DenseMatrix] Cannot convert float data into non-float data`);
                else if (index_js_2.numberTypeCheckers.isI32(largestNo) && index_js_2.numberTypeCheckers.isI32(smallestNo))
                    return this.inner.asI32();
                else
                    throw new Error(`[DenseMatrix] Conversion failed: ${largestNo} or ${smallestNo} is out of the i32 range.`);
            }
            case 'u32': {
                let largestNo = index_js_2.numberTypeCheckers.bigintToNumber(this._largestNo);
                let smallestNo = index_js_2.numberTypeCheckers.bigintToNumber(this._smallestNo);
                if (this.inner instanceof index_js_1.DenseMatrixU32)
                    return this.inner;
                if (this.inner instanceof index_js_1.DenseMatrixF32 || this.inner instanceof index_js_1.DenseMatrixF64)
                    throw new Error(`[DenseMatrix] Cannot convert float data into non-float data`);
                else if (index_js_2.numberTypeCheckers.isU32(largestNo) && index_js_2.numberTypeCheckers.isU32(smallestNo))
                    return this.inner.asU32();
                else
                    throw new Error(`[DenseMatrix] Conversion failed: ${largestNo} or ${smallestNo} is out of the u32 range.`);
            }
            case 'u8': {
                let largestNo = index_js_2.numberTypeCheckers.bigintToNumber(this._largestNo);
                let smallestNo = index_js_2.numberTypeCheckers.bigintToNumber(this._smallestNo);
                if (this.inner instanceof index_js_1.DenseMatrixU8)
                    return this.inner;
                if (this.inner instanceof index_js_1.DenseMatrixF32 || this.inner instanceof index_js_1.DenseMatrixF64)
                    throw new Error(`[DenseMatrix] Cannot convert float data into non-float data`);
                else if (index_js_2.numberTypeCheckers.isU8(largestNo) && index_js_2.numberTypeCheckers.isU8(smallestNo))
                    return this.inner.asU8();
                else
                    throw new Error(`[DenseMatrix] Conversion failed: ${largestNo} or ${smallestNo} is out of the u8 range.`);
            }
            case 'u16': {
                let largestNo = index_js_2.numberTypeCheckers.bigintToNumber(this._largestNo);
                let smallestNo = index_js_2.numberTypeCheckers.bigintToNumber(this._smallestNo);
                if (this.inner instanceof index_js_1.DenseMatrixU16)
                    return this.inner;
                if (this.inner instanceof index_js_1.DenseMatrixF32 || this.inner instanceof index_js_1.DenseMatrixF64)
                    throw new Error(`[DenseMatrix] Cannot convert float data into non-float data`);
                else if (index_js_2.numberTypeCheckers.isU16(largestNo) && index_js_2.numberTypeCheckers.isU16(smallestNo))
                    return this.inner.asU16();
                else
                    throw new Error(`[DenseMatrix] Conversion failed: ${largestNo} or ${smallestNo} is out of the u16 range.`);
            }
            case 'i64': {
                let largestNo = BigInt(this._largestNo);
                let smallestNo = BigInt(this._smallestNo);
                if (this.inner instanceof index_js_1.DenseMatrixI64)
                    return this.inner;
                if (this.inner instanceof index_js_1.DenseMatrixF32 || this.inner instanceof index_js_1.DenseMatrixF64)
                    throw new Error(`[DenseMatrix] Cannot convert float data into non-float data`);
                else if (index_js_2.numberTypeCheckers.isI64(largestNo) && index_js_2.numberTypeCheckers.isI64(smallestNo))
                    return this.inner.asI64();
                else
                    throw new Error(`[DenseMatrix] Conversion failed: ${largestNo} or ${smallestNo} is out of the i64 range.`);
            }
            case 'u64': {
                let largestNo = BigInt(this._largestNo);
                let smallestNo = BigInt(this._smallestNo);
                if (this.inner instanceof index_js_1.DenseMatrixU64)
                    return this.inner;
                if (this.inner instanceof index_js_1.DenseMatrixF32 || this.inner instanceof index_js_1.DenseMatrixF64)
                    throw new Error(`[DenseMatrix] Cannot convert float data into non-float data`);
                else if (index_js_2.numberTypeCheckers.isU64(largestNo) && index_js_2.numberTypeCheckers.isU64(smallestNo))
                    return this.inner.asU64();
                else
                    throw new Error(`[DenseMatrix] Conversion failed: ${largestNo} or ${smallestNo} is out of the u64 range.`);
            }
            default:
                throw new Error(`[DenseMatrix] Unexpected dataTypeValue '${dataType}'. Valid values are: f64, f32, i32, u32, u8, u16, i64, u64.`);
        }
    }
}
exports.DenseMatrix = DenseMatrix;
