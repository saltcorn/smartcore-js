import type { YType } from '../index.js'
import { asI64 } from '../number_type_checkers.js'

function yAsInt64Array(y: YType): BigInt64Array {
  if (y instanceof BigInt64Array) {
    return y
  } else if (y instanceof Float64Array || y instanceof Float32Array || Array.isArray(y)) {
    return BigInt64Array.from(y, (v) => asI64(v))
  } else if (y instanceof BigUint64Array) {
    return BigInt64Array.from(y, (v) => asI64(v))
  } else {
    throw new Error(
      `[yAsInt64Array] Expected 'y' to be an Array or TypedArray. 'y' is ${y.constructor?.name || typeof y}`,
    )
  }
}

export { yAsInt64Array }
