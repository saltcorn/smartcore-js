import { DenseMatrix, type DenseMatrixType } from '../core-bindings/index.js'
import { numberTypeCheckers } from '../index.js'

interface IArrayToDenseMatrixParams {
  columnMajor?: boolean
  numberType?: DenseMatrixType
}

function arrayToDenseMatrix(data: (number | bigint)[][], params?: IArrayToDenseMatrixParams): DenseMatrix {
  if (Array.isArray(data)) {
    if (data.length === 0) {
      throw new Error(`[arrayToDenseMatrix] 'data' cannot be an empty array`)
    }
    if (!Array.isArray(data[0])) {
      throw new Error(`[arrayToDenseMatrix] Expected 'data' to be an array of arrays`)
    }
    if (data[0].length === 0) {
      throw new Error(`[arrayToDenseMatrix] Arrays nested in 'data' cannot be an empty`)
    }
    const nrows = BigInt(params?.columnMajor ? data[0].length : data.length)
    const ncols = BigInt(params?.columnMajor ? data.length : data[0].length)
    const valuesFlat = data.flat()

    switch (params?.numberType) {
      case 'F64' as DenseMatrixType:
        return DenseMatrix.f64(nrows, ncols, Float64Array.from(valuesFlat), params?.columnMajor)
      case 'F32' as DenseMatrixType:
        return DenseMatrix.f32(nrows, ncols, Float32Array.from(valuesFlat), params?.columnMajor)
      case 'I64' as DenseMatrixType:
        return DenseMatrix.i64(nrows, ncols, BigInt64Array.from(valuesFlat), params?.columnMajor)
      case 'U64' as DenseMatrixType:
        return DenseMatrix.u64(nrows, ncols, BigUint64Array.from(valuesFlat), params?.columnMajor)
      case 'I32' as DenseMatrixType:
        return DenseMatrix.i32(nrows, ncols, Int32Array.from(valuesFlat), params?.columnMajor)
      case 'U32' as DenseMatrixType:
        return DenseMatrix.u32(nrows, ncols, Uint32Array.from(valuesFlat), params?.columnMajor)
      case 'U16' as DenseMatrixType:
        return DenseMatrix.u16(nrows, ncols, Uint16Array.from(valuesFlat), params?.columnMajor)
      case 'U8' as DenseMatrixType:
        return DenseMatrix.u8(nrows, ncols, Uint8Array.from(valuesFlat), params?.columnMajor)
    }

    let _largestNo = data[0][0]
    let _smallestNo = data[0][0]
    let _hasFloat = false
    for (let v of valuesFlat) {
      if (v > _largestNo) _largestNo = v
      if (v < _smallestNo) _smallestNo = v
      if (!Number.isInteger(v)) _hasFloat = true
    }
    // floating point types
    if (_hasFloat) {
      const largestNo = numberTypeCheckers.bigintToNumber(_largestNo)
      const smallestNo = numberTypeCheckers.bigintToNumber(_smallestNo)
      if (numberTypeCheckers.isF32(largestNo) && numberTypeCheckers.isF32(smallestNo)) {
        return DenseMatrix.f32(nrows, ncols, Float32Array.from(valuesFlat), params?.columnMajor)
      } else {
        return DenseMatrix.f64(nrows, ncols, Float64Array.from(valuesFlat), params?.columnMajor)
      }
      // unsigned types
    } else if (_smallestNo < 0) {
      if (numberTypeCheckers.isU8(_largestNo)) {
        return DenseMatrix.u8(nrows, ncols, Uint8Array.from(valuesFlat), params?.columnMajor)
      } else if (numberTypeCheckers.isU16(_largestNo)) {
        return DenseMatrix.u16(nrows, ncols, Uint16Array.from(valuesFlat), params?.columnMajor)
      } else if (numberTypeCheckers.isU32(_largestNo)) {
        return DenseMatrix.u32(nrows, ncols, Uint32Array.from(valuesFlat), params?.columnMajor)
      } else if (numberTypeCheckers.isU64(_largestNo as bigint)) {
        return DenseMatrix.u64(nrows, ncols, BigUint64Array.from(valuesFlat), params?.columnMajor)
      }
      //signed types
    } else {
      if (numberTypeCheckers.isI32(_largestNo)) {
        return DenseMatrix.i32(nrows, ncols, Int32Array.from(valuesFlat), params?.columnMajor)
      } else if (numberTypeCheckers.isI64(_largestNo as bigint)) {
        return DenseMatrix.i64(nrows, ncols, BigInt64Array.from(valuesFlat), params?.columnMajor)
      }
    }
  } else {
    throw new Error(`[arrayToDenseMatrix] Unsupported input type: '${typeof data}'`)
  }
  throw new Error(`[arrayToDenseMatrix] Unsupported input type: '${data.constructor?.name || typeof data}'`)
}

export { arrayToDenseMatrix }
