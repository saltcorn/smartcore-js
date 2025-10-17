import type { YType } from '../index.js'
import { asF32 } from '../number_type_checkers.js'

function yAsFloat32Array(y: YType): Float32Array {
  if (y instanceof Float32Array) return y
  else if (y instanceof Float64Array || y instanceof Int32Array || Array.isArray(y)) {
    const float32Array = y.map((v) => asF32(v))
    return Float32Array.from(float32Array)
  } else if (y instanceof BigInt64Array) {
    const float32Array = Array.from(y, (v) => asF32(v))
    return Float32Array.from(float32Array)
  } else {
    throw new Error(`[yAsFloat32Array] Expected 'y' to be an Array. 'y' is ${y.constructor?.name || typeof y}`)
  }
}

export { yAsFloat32Array }
