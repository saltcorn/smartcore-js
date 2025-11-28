import { type TypedArrayType, type TypedArray } from '../core-bindings/index.js'
import { numberTypeCheckers, type YType } from '../index.js'
import { yAsFloat32Array } from './y_as_float_32_array.js'
import { yAsFloat64Array } from './y_as_float_64_array.js'
import { yAsInt32Array } from './y_as_int_32_array.js'
import { yAsInt64Array } from './y_as_int_64_array.js'
import { yAsUint32Array } from './y_as_uint_32_array.js'
import { yAsUint64Array } from './y_as_uint_64_array.js'

interface IArrayToDenseMatrixParams {
  numberType?: TypedArrayType
}

function arrayToTypedArray(y: YType, params?: IArrayToDenseMatrixParams): TypedArray {
  switch (params?.numberType) {
    case 'F32' as TypedArrayType:
      return yAsFloat32Array(y)
    case 'F64' as TypedArrayType:
      return yAsFloat64Array(y)
    case 'I32' as TypedArrayType:
      return yAsInt32Array(y)
    case 'I64' as TypedArrayType:
      return yAsInt64Array(y)
    case 'U32' as TypedArrayType:
      return yAsUint32Array(y)
    case 'U64' as TypedArrayType:
      return yAsUint64Array(y)
  }
  if (
    y instanceof Float64Array ||
    y instanceof Float32Array ||
    y instanceof BigInt64Array ||
    y instanceof BigUint64Array ||
    y instanceof Int32Array ||
    y instanceof Uint16Array ||
    y instanceof Uint8Array ||
    y instanceof Uint32Array ||
    y instanceof BigUint64Array
  )
    return y
  if (y.length === 0) return new Float64Array()
  let largestNo = y[0]
  let smallestNo = y[0]
  let hasFloat = false
  for (let v of y) {
    if (v > largestNo) largestNo = v
    if (v < smallestNo) smallestNo = v
    if (!Number.isInteger(v)) hasFloat = true
  }
  // floating point types
  if (hasFloat) {
    return Float64Array.from(y)
    // unsigned types
  } else if (smallestNo < 0) {
    if (numberTypeCheckers.isU64(BigInt(largestNo))) {
      return BigUint64Array.from(y)
    }
    //signed types
  } else {
    if (numberTypeCheckers.isI32(largestNo)) {
      return Int32Array.from(y)
    } else if (numberTypeCheckers.isI64(largestNo as bigint)) {
      return BigInt64Array.from(y)
    }
  }

  throw new Error(`[arrayToTypedArray] Conversion to typed array failed!`)
}

export { arrayToTypedArray }
