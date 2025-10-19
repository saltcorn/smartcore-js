import type { YType } from '../index.js'
import { asI64 } from '../number_type_checkers.js'

function yAsUint64Array(y: YType): BigUint64Array {
  if (y instanceof BigUint64Array) {
    return y
  } else if (y instanceof Float64Array || y instanceof Float32Array || Array.isArray(y)) {
    return BigUint64Array.from(y, (v) => asI64(v))
  } else if (y instanceof BigInt64Array) {
    return BigUint64Array.from(y, (v) => asI64(v))
  } else {
    throw new Error(
      `[yAsUint64Array] Expected 'y' to be an Array or TypedArray. 'y' is ${y.constructor?.name || typeof y}`,
    )
  }
}

export { yAsUint64Array }
