import { type TypedArray, type TypedArrayWrapper } from '../core-bindings/index.js'

function wrapTypedArray(y: TypedArray): TypedArrayWrapper {
  if (y instanceof Float64Array) return { type: 'F64', field0: y }
  if (y instanceof Float32Array) return { type: 'F32', field0: y }
  if (y instanceof BigInt64Array) return { type: 'I64', field0: y }
  if (y instanceof BigUint64Array) return { type: 'U64', field0: y }
  if (y instanceof Int32Array) return { type: 'I32', field0: y }
  if (y instanceof Uint32Array) return { type: 'U32', field0: y }
  if (y instanceof Uint16Array) return { type: 'U16', field0: y }
  if (y instanceof Uint8Array) return { type: 'U8', field0: y }
  throw new Error(`[wrapTypedArray] Wrapping typed array (${y?.constructor?.name || typeof y}) failed!`)
}

export { wrapTypedArray }
