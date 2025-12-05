import {
  accuracyScore as libAccuracyScore,
  aucScore as libAUC,
  hcvScore as libHcvScore,
  recallScore as libRecall,
  r2Score as libR2,
  precisionScore as libPrecision,
  meanAbsoluteErrorScore as libMeanAbsoluteError,
  meanSquaredErrorScore as libMeanSquaredError,
  f1Score as libF1,
} from '../core-bindings/index.js'
import { type YType, utilities } from '../index.js'

function accuracyScore(yTrue: YType, yPred: YType, losslessly?: boolean) {
  const yTrueWrapped = utilities.arrayToTypedArray(yTrue)
  const yPredWrapped = utilities.arrayToTypedArray(yPred)
  return libAccuracyScore(yTrueWrapped, yPredWrapped, losslessly)
}

function aucScore(yTrue: YType, yPred: YType, losslessly?: boolean) {
  const yTrueWrapped = utilities.arrayToTypedArray(yTrue)
  const yPredWrapped = utilities.arrayToTypedArray(yPred)
  return libAUC(yTrueWrapped, yPredWrapped, losslessly)
}

function hcvScore(yTrue: YType, yPred: YType, losslessly?: boolean) {
  const yTrueWrapped = utilities.arrayToTypedArray(yTrue)
  const yPredWrapped = utilities.arrayToTypedArray(yPred)
  return libHcvScore(yTrueWrapped, yPredWrapped, losslessly)
}

function recallScore(yTrue: YType, yPred: YType, losslessly?: boolean) {
  const yTrueWrapped = utilities.arrayToTypedArray(yTrue)
  const yPredWrapped = utilities.arrayToTypedArray(yPred)
  return libRecall(yTrueWrapped, yPredWrapped, losslessly)
}

function precisionScore(yTrue: YType, yPred: YType, losslessly?: boolean) {
  const yTrueWrapped = utilities.arrayToTypedArray(yTrue)
  const yPredWrapped = utilities.arrayToTypedArray(yPred)
  return libPrecision(yTrueWrapped, yPredWrapped, losslessly)
}

function r2Score(yTrue: YType, yPred: YType, losslessly?: boolean) {
  const yTrueWrapped = utilities.arrayToTypedArray(yTrue)
  const yPredWrapped = utilities.arrayToTypedArray(yPred)
  return libR2(yTrueWrapped, yPredWrapped, losslessly)
}

function meanAbsoluteErrorScore(yTrue: YType, yPred: YType, losslessly?: boolean) {
  const yTrueWrapped = utilities.arrayToTypedArray(yTrue)
  const yPredWrapped = utilities.arrayToTypedArray(yPred)
  return libMeanAbsoluteError(yTrueWrapped, yPredWrapped, losslessly)
}

function meanSquaredErrorScore(yTrue: YType, yPred: YType, losslessly?: boolean) {
  const yTrueWrapped = utilities.arrayToTypedArray(yTrue)
  const yPredWrapped = utilities.arrayToTypedArray(yPred)
  return libMeanSquaredError(yTrueWrapped, yPredWrapped, losslessly)
}

function f1Score(yTrue: YType, yPred: YType, losslessly?: boolean) {
  const yTrueWrapped = utilities.arrayToTypedArray(yTrue)
  const yPredWrapped = utilities.arrayToTypedArray(yPred)
  return libF1(yTrueWrapped, yPredWrapped, losslessly)
}

type DistanceType = 'euclidian' | 'hamming' | 'mahalanobis' | 'manhattan' | 'minkowski'

export {
  accuracyScore,
  type DistanceType,
  meanAbsoluteErrorScore,
  meanSquaredErrorScore,
  r2Score,
  recallScore,
  precisionScore,
  hcvScore,
  aucScore,
  f1Score,
}
