import {
  type TypedArray,
  type TypedArrayType,
  type TypedArrayWrapper,
  changeArrayType,
} from '../core-bindings/index.js'
import { numberTypeCheckers, utilities, type YType } from '../index.js'

interface IArrayToDenseMatrixParams {
  numberType?: TypedArrayType
}

function changeTypedArrayType(y: TypedArray, numberType?: TypedArrayType): TypedArrayWrapper {
  const yWrapped = utilities.wrapTypedArray(y)
  switch (numberType) {
    case 'F32' as TypedArrayType:
      return changeArrayType(yWrapped, 'F32' as TypedArrayType)
    case 'F64' as TypedArrayType:
      return changeArrayType(yWrapped, 'F64' as TypedArrayType)
    case 'I32' as TypedArrayType:
      return changeArrayType(yWrapped, 'I32' as TypedArrayType)
    case 'I64' as TypedArrayType:
      return changeArrayType(yWrapped, 'I64' as TypedArrayType)
    case 'U32' as TypedArrayType:
      console.log('Running ...')
      return changeArrayType(yWrapped, 'U32' as TypedArrayType)
    case 'U64' as TypedArrayType:
      return changeArrayType(yWrapped, 'U64' as TypedArrayType)
    case 'U16' as TypedArrayType:
      return changeArrayType(yWrapped, 'U16' as TypedArrayType)
    case 'U8' as TypedArrayType:
      return changeArrayType(yWrapped, 'U8' as TypedArrayType)
    default:
      return utilities.wrapTypedArray(y)
    //   throw new Error(`Unsupported number type: '${numberType}'`)
  }
}

function arrayToTypedArray(y: YType, params?: IArrayToDenseMatrixParams): TypedArrayWrapper {
  if (
    y instanceof Float64Array ||
    y instanceof Float32Array ||
    y instanceof BigInt64Array ||
    y instanceof BigUint64Array ||
    y instanceof Int32Array ||
    y instanceof Uint32Array ||
    y instanceof Uint16Array ||
    y instanceof Uint8Array
  )
    changeTypedArrayType(y, params?.numberType)

  //   switch (params?.numberType) {
  //     case 'F32' as TypedArrayType:
  //       return changeArrayType(Float32Array.from(y), 'F32' as TypedArrayType)
  //     case 'F64' as TypedArrayType:
  //       return changeArrayType(Float64Array.from(y), 'F64' as TypedArrayType)
  //     case 'I32' as TypedArrayType:
  //       return changeArrayType(Int32Array.from(y), 'I32' as TypedArrayType)
  //     case 'I64' as TypedArrayType:
  //       return changeArrayType(BigInt64Array.from(y), 'I64' as TypedArrayType)
  //     case 'U32' as TypedArrayType:
  //       return changeArrayType(Uint32Array.from(y), 'U32' as TypedArrayType)
  //     case 'U64' as TypedArrayType:
  //       return changeArrayType(BigUint64Array.from(y), 'U64' as TypedArrayType)
  //     case 'U16' as TypedArrayType:
  //       return changeArrayType(Uint16Array.from(y), 'U16' as TypedArrayType)
  //     case 'U8' as TypedArrayType:
  //       return changeArrayType(Uint8Array.from(y), 'U8' as TypedArrayType)
  //   }

  if (y.length === 0) return utilities.wrapTypedArray(new Float64Array())
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
    return changeTypedArrayType(Float64Array.from(y), params?.numberType)
    // unsigned types
  } else if (smallestNo < 0) {
    if (numberTypeCheckers.isU64(BigInt(largestNo))) {
      return changeTypedArrayType(BigUint64Array.from(y), params?.numberType)
    }
    //signed types
  } else {
    if (numberTypeCheckers.isI32(largestNo)) {
      return changeTypedArrayType(Int32Array.from(y), params?.numberType)
    } else if (numberTypeCheckers.isI64(largestNo as bigint)) {
      return changeTypedArrayType(BigInt64Array.from(y), params?.numberType)
    }
  }

  throw new Error(`[arrayToTypedArray] Conversion to typed array failed!`)
}

export { arrayToTypedArray }
