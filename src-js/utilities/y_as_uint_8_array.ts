import type { YType } from '../index.js'
import { asU8 } from '../number_type_checkers.js'

function yAsUint8Array(y: YType): Uint8Array {
  if (y instanceof Uint8Array) return y
  else if (
    y instanceof Float64Array ||
    y instanceof Float32Array ||
    Array.isArray(y) ||
    y instanceof Int32Array ||
    y instanceof Uint16Array ||
    y instanceof Uint32Array
  ) {
    return Uint8Array.from(y, (v) => asU8(v))
  } else if (y instanceof BigInt64Array || y instanceof BigUint64Array) {
    return Uint8Array.from(y, (v) => asU8(v))
  } else {
    throw new Error(`[yAsUint8Array] Expected 'y' to be an Array. 'y' is ${typeof y}`)
  }
}

export { yAsUint8Array }
