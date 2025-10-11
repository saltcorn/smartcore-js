import { AccuracyF64, AccuracyI64, AccuracyU64, AccuracyI32 } from '../core-bindings/index.js'
import { type YType } from '../index.js'

function toBigInt64Array(values: number[]): BigInt64Array {
  if (!values.every((n) => Number.isInteger(n))) {
    throw new Error("Can't convert an Array containing non-integers to a BigInt64Array.")
  }
  let valuesMapped = values.map((n) => BigInt(n))
  return new BigInt64Array(valuesMapped)
}

function accuracyScore(yTrue: YType, yPred: YType) {
  if (yTrue instanceof Float64Array && yPred instanceof Float64Array) {
    return new AccuracyF64().getScore(yTrue, yPred)
  } else if (yTrue instanceof BigInt64Array && yPred instanceof BigInt64Array) {
    return new AccuracyI64().getScore(yTrue, yPred)
  } else if (yTrue instanceof BigUint64Array && yPred instanceof BigUint64Array) {
    return new AccuracyU64().getScore(yTrue, yPred)
  } else if (yTrue instanceof Int32Array && yPred instanceof Int32Array) {
    return new AccuracyI32().getScore(yTrue, yPred)
  } else if (yTrue instanceof Array && yPred instanceof Array) {
    return new AccuracyI64().getScore(toBigInt64Array(yTrue), toBigInt64Array(yPred))
  }
  throw new Error(
    `Unsupported data type for input arrays: ` +
      `yTrue=${yTrue.constructor?.name || typeof yTrue}, ` +
      `yPred=${yPred.constructor?.name || typeof yPred}.`,
  )
}

enum DistanceType {
  EUCLIDIAN,
  HAMMING,
  MANHATTAN,
  MAHALANOBIS,
  MINKOWSKI,
}

export { accuracyScore, DistanceType }
