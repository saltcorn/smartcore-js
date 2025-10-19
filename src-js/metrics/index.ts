import { AccuracyF64, AccuracyI64, AccuracyU64, AccuracyI32 } from '../core-bindings/index.js'
import { type YType, type YTyped, asTypedY, numberTypeCheckers } from '../index.js'

function getNormalizedYType(
  yTrue: YTyped,
  yPred: YTyped,
):
  | [Float64Array, Float64Array]
  | [BigInt64Array, BigInt64Array]
  | [BigUint64Array, BigUint64Array]
  | [Int32Array, Int32Array] {
  if (yTrue instanceof Float64Array || yPred instanceof Float64Array) {
    const yTrueConverted =
      yTrue instanceof Float64Array
        ? yTrue
        : Float64Array.from(yTrue as ArrayLike<number>, (x) => numberTypeCheckers.asF64(x))
    const yPredConverted =
      yPred instanceof Float64Array
        ? yPred
        : Float64Array.from(yPred as ArrayLike<number>, (x) => numberTypeCheckers.asF64(x))
    return [yTrueConverted, yPredConverted]
  }
  if (yTrue instanceof BigInt64Array || yPred instanceof BigInt64Array)
    return [BigInt64Array.from(yTrue as BigInt64Array), BigInt64Array.from(yPred as BigInt64Array)]
  if (yTrue instanceof BigUint64Array || yPred instanceof BigUint64Array)
    return [BigUint64Array.from(yTrue as BigUint64Array), BigUint64Array.from(yPred as BigUint64Array)]
  return [Int32Array.from(yTrue as Int32Array), Int32Array.from(yPred as Int32Array)]
}

function accuracyScore(yTrue: YType, yPred: YType) {
  let [yTrueTyped, yPredTyped] = getNormalizedYType(asTypedY(yTrue), asTypedY(yPred))
  if (yTrueTyped instanceof Float64Array && yPredTyped instanceof Float64Array) {
    return new AccuracyF64().getScore(yTrueTyped, yPredTyped)
  } else if (yTrueTyped instanceof BigInt64Array && yPredTyped instanceof BigInt64Array) {
    return new AccuracyI64().getScore(yTrueTyped, yPredTyped)
  } else if (yTrueTyped instanceof BigUint64Array && yPredTyped instanceof BigUint64Array) {
    return new AccuracyU64().getScore(yTrueTyped, yPredTyped)
  } else if (yTrueTyped instanceof Int32Array && yPredTyped instanceof Int32Array) {
    return new AccuracyI32().getScore(yTrueTyped, yPredTyped)
  }
  throw new Error(
    `Unsupported data type for input arrays: ` +
      `yTrue=${yTrue.constructor?.name || typeof yTrue}, ` +
      `yPred=${yPred.constructor?.name || typeof yPred}.`,
  )
}

type DistanceType = 'euclidian' | 'hamming' | 'mahalanobis' | 'manhattan' | 'minkowski'

export { accuracyScore, type DistanceType }
