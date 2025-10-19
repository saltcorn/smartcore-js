import type { YType } from '../index.js'
import { asU32 } from '../number_type_checkers.js'

function yAsUint32Array(y: YType): Uint32Array {
  if (y instanceof Uint32Array) return y
  else if (y instanceof Float64Array || y instanceof Float32Array || Array.isArray(y) || y instanceof Int32Array) {
    return Uint32Array.from(y, (v) => asU32(v))
  } else if (y instanceof BigInt64Array) {
    return Uint32Array.from(y, (v) => asU32(v))
  } else {
    throw new Error(`[yAsUint32Array] Expected 'y' to be an Array. 'y' is ${y.constructor?.name || typeof y}`)
  }
}

export { yAsUint32Array }
