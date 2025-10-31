import type { YType } from '../index.js'
import { asI32 } from '../number_type_checkers.js'

function yAsInt32Array(y: YType): Int32Array {
  if (y instanceof Int32Array) return y
  else if (y instanceof Float64Array || y instanceof Float32Array || Array.isArray(y)) {
    return Int32Array.from(y, (v) => asI32(v))
  } else if (y instanceof BigInt64Array) {
    return Int32Array.from(y, (v) => asI32(v))
  } else {
    throw new Error(`[yAsInt32Array] Expected 'y' to be an Array. 'y' is ${y.constructor?.name || typeof y}`)
  }
}

export { yAsInt32Array }
