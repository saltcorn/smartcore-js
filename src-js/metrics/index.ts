import { accuracyScore as libAccuracyScore } from '../core-bindings/index.js'
import { type YType, utilities } from '../index.js'

function accuracyScore(yTrue: YType, yPred: YType, losslessly?: boolean) {
  const yTrueWrapped = utilities.wrapTypedArray(utilities.arrayToTypedArray(yTrue))
  const yPredWrapped = utilities.wrapTypedArray(utilities.arrayToTypedArray(yPred))
  return libAccuracyScore(yTrueWrapped, yPredWrapped, losslessly)
}

type DistanceType = 'euclidian' | 'hamming' | 'mahalanobis' | 'manhattan' | 'minkowski'

export { accuracyScore, type DistanceType }
