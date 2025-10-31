import type { YType } from '../index.js'
import { asF64 } from '../number_type_checkers.js'

function yAsFloat64Array(y: YType): Float64Array {
  if (y instanceof Float64Array) return y
  else if (y instanceof Float64Array || y instanceof Int32Array || Array.isArray(y)) {
    return Float64Array.from(y, (v) => asF64(v))
  } else if (y instanceof BigInt64Array) {
    return Float64Array.from(y, (v) => asF64(v))
  } else {
    throw new Error(`[yAsFloat64Array] Expected 'y' to be an Array. 'y' is ${y.constructor?.name || typeof y}`)
  }
}

export { yAsFloat64Array }
