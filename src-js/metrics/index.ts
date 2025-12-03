import {
  accuracyScore as libAccuracyScore,
  auc as libAUC,
  hcvScore as libHcvScore,
  recall as libRecall,
  r2 as libR2,
  precision as libPrecision,
  meanAbsoluteError as libMeanAbsoluteError,
  meanSquaredError as libMeanSquaredError,
  f1 as libF1,
} from '../core-bindings/index.js'
import { type YType, utilities } from '../index.js'

function accuracyScore(yTrue: YType, yPred: YType, losslessly?: boolean) {
  const yTrueWrapped = utilities.wrapTypedArray(utilities.arrayToTypedArray(yTrue))
  const yPredWrapped = utilities.wrapTypedArray(utilities.arrayToTypedArray(yPred))
  return libAccuracyScore(yTrueWrapped, yPredWrapped, losslessly)
}

function auc(yTrue: YType, yPred: YType, losslessly?: boolean) {
  const yTrueWrapped = utilities.wrapTypedArray(utilities.arrayToTypedArray(yTrue))
  const yPredWrapped = utilities.wrapTypedArray(utilities.arrayToTypedArray(yPred))
  return libAUC(yTrueWrapped, yPredWrapped, losslessly)
}

function hcvScore(yTrue: YType, yPred: YType, losslessly?: boolean) {
  const yTrueWrapped = utilities.wrapTypedArray(utilities.arrayToTypedArray(yTrue))
  const yPredWrapped = utilities.wrapTypedArray(utilities.arrayToTypedArray(yPred))
  return libHcvScore(yTrueWrapped, yPredWrapped, losslessly)
}

function recall(yTrue: YType, yPred: YType, losslessly?: boolean) {
  const yTrueWrapped = utilities.wrapTypedArray(utilities.arrayToTypedArray(yTrue))
  const yPredWrapped = utilities.wrapTypedArray(utilities.arrayToTypedArray(yPred))
  return libRecall(yTrueWrapped, yPredWrapped, losslessly)
}

function precision(yTrue: YType, yPred: YType, losslessly?: boolean) {
  const yTrueWrapped = utilities.wrapTypedArray(utilities.arrayToTypedArray(yTrue))
  const yPredWrapped = utilities.wrapTypedArray(utilities.arrayToTypedArray(yPred))
  return libPrecision(yTrueWrapped, yPredWrapped, losslessly)
}

function r2(yTrue: YType, yPred: YType, losslessly?: boolean) {
  const yTrueWrapped = utilities.wrapTypedArray(utilities.arrayToTypedArray(yTrue))
  const yPredWrapped = utilities.wrapTypedArray(utilities.arrayToTypedArray(yPred))
  return libR2(yTrueWrapped, yPredWrapped, losslessly)
}

function meanAbsoluteError(yTrue: YType, yPred: YType, losslessly?: boolean) {
  const yTrueWrapped = utilities.wrapTypedArray(utilities.arrayToTypedArray(yTrue))
  const yPredWrapped = utilities.wrapTypedArray(utilities.arrayToTypedArray(yPred))
  return libMeanAbsoluteError(yTrueWrapped, yPredWrapped, losslessly)
}

function meanSquaredError(yTrue: YType, yPred: YType, losslessly?: boolean) {
  const yTrueWrapped = utilities.wrapTypedArray(utilities.arrayToTypedArray(yTrue))
  const yPredWrapped = utilities.wrapTypedArray(utilities.arrayToTypedArray(yPred))
  return libMeanSquaredError(yTrueWrapped, yPredWrapped, losslessly)
}

function f1(yTrue: YType, yPred: YType, losslessly?: boolean) {
  const yTrueWrapped = utilities.wrapTypedArray(utilities.arrayToTypedArray(yTrue))
  const yPredWrapped = utilities.wrapTypedArray(utilities.arrayToTypedArray(yPred))
  return libF1(yTrueWrapped, yPredWrapped, losslessly)
}

type DistanceType = 'euclidian' | 'hamming' | 'mahalanobis' | 'manhattan' | 'minkowski'

export {
  accuracyScore,
  type DistanceType,
  meanAbsoluteError,
  meanSquaredError,
  r2,
  recall,
  precision,
  hcvScore,
  auc,
  f1,
}
