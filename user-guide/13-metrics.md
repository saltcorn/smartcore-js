# Metrics

Evaluation metrics help you measure and compare model performance. SmartCore-JS provides comprehensive metrics for both classification and regression tasks.

## Table of Contents

- [Overview](#overview)
- [Classification Metrics](#classification-metrics)
- [Regression Metrics](#regression-metrics)
- [Distance Metrics](#distance-metrics)
- [Best Practices](#best-practices)

## Overview

### Importing Metrics

```typescript
import { metrics } from '@saltcorn/smartcore-js'

const accuracy = metrics.accuracyScore(yTrue, yPred)
const mse = metrics.meanSquaredErrorScore(yTrue, yPred)
```

### Basic Usage

All metric functions follow the same pattern:

```typescript
function metricScore(
  yTrue: YType, // Ground truth labels
  yPred: YType, // Predicted labels
  losslessly?: boolean, // Optional: lossless computation
): number
```

## Classification Metrics

### Accuracy Score

Proportion of correct predictions.

```typescript
import { metrics, dataset, linearModel, modelSelection } from '@saltcorn/smartcore-js'

const [x, y] = dataset.loadIris({ returnXY: true })
const [xTrain, xTest, yTrain, yTest] = modelSelection.trainTestSplit(x, y)

const model = new linearModel.LogisticRegression()
model.fit(xTrain, yTrain)
const predictions = model.predict(xTest)

const accuracy = metrics.accuracyScore(yTest, predictions)
console.log(`Accuracy: ${(accuracy * 100).toFixed(2)}%`)
```

**Formula:**

```
Accuracy = (Correct Predictions) / (Total Predictions)
```

**Range:** [0, 1], where 1 is perfect
**Best for:** Balanced datasets

### Precision Score

Proportion of positive predictions that are correct.

```typescript
const precision = metrics.precisionScore(yTest, predictions)
console.log(`Precision: ${precision.toFixed(4)}`)
```

**Formula:**

```
Precision = True Positives / (True Positives + False Positives)
```

**Range:** [0, 1], where 1 is perfect
**Best for:** When false positives are costly (e.g., spam detection)

### Recall Score

Proportion of actual positives that are correctly identified.

```typescript
const recall = metrics.recallScore(yTest, predictions)
console.log(`Recall: ${recall.toFixed(4)}`)
```

**Formula:**

```
Recall = True Positives / (True Positives + False Negatives)
```

**Range:** [0, 1], where 1 is perfect
**Best for:** When false negatives are costly (e.g., disease detection)

### F1 Score

Harmonic mean of precision and recall.

```typescript
const f1 = metrics.f1Score(yTest, predictions)
console.log(`F1 Score: ${f1.toFixed(4)}`)
```

**Formula:**

```
F1 = 2 * (Precision * Recall) / (Precision + Recall)
```

**Range:** [0, 1], where 1 is perfect
**Best for:** Balancing precision and recall, imbalanced datasets

### AUC Score

Area Under the ROC Curve.

```typescript
const auc = metrics.aucScore(yTrue, yPredProba)
console.log(`AUC: ${auc.toFixed(4)}`)
```

**Range:** [0, 1], where 1 is perfect
**Best for:** Binary classification, comparing models

### Complete Classification Example

```typescript
import { metrics, dataset, ensemble, modelSelection } from '@saltcorn/smartcore-js'

// Load binary classification data
const [x, y] = dataset.loadBreastCancer({ returnXY: true })
const [xTrain, xTest, yTrain, yTest] = modelSelection.trainTestSplit(x, y, {
  testSize: 0.3,
  randomState: 42,
})

// Train model
const model = new ensemble.RandomForestClassifier({ nTrees: 100 })
model.fit(xTrain, yTrain)

// Get predictions
const predictions = model.predict(xTest)

// Calculate all metrics
const results = {
  accuracy: metrics.accuracyScore(yTest, predictions),
  precision: metrics.precisionScore(yTest, predictions),
  recall: metrics.recallScore(yTest, predictions),
  f1: metrics.f1Score(yTest, predictions),
}

console.log('\nClassification Results:')
console.log('─'.repeat(40))
console.log(`Accuracy:  ${(results.accuracy * 100).toFixed(2)}%`)
console.log(`Precision: ${results.precision.toFixed(4)}`)
console.log(`Recall:    ${results.recall.toFixed(4)}`)
console.log(`F1 Score:  ${results.f1.toFixed(4)}`)
```

## Regression Metrics

### Mean Squared Error (MSE)

Average of squared differences between predictions and actual values.

```typescript
import { metrics, dataset, linearModel, modelSelection } from '@saltcorn/smartcore-js'

const [x, y] = dataset.loadBoston({ returnXY: true })
const [xTrain, xTest, yTrain, yTest] = modelSelection.trainTestSplit(x, y)

const model = new linearModel.LinearRegression()
model.fit(xTrain, yTrain)
const predictions = model.predict(xTest)

const mse = metrics.meanSquaredErrorScore(yTest, predictions)
console.log(`MSE: ${mse.toFixed(4)}`)
```

**Formula:**

```
MSE = (1/n) * Σ(y_true - y_pred)²
```

**Range:** [0, ∞), where 0 is perfect
**Best for:** Penalizing large errors more heavily

### Mean Absolute Error (MAE)

Average of absolute differences between predictions and actual values.

```typescript
const mae = metrics.meanAbsoluteErrorScore(yTest, predictions)
console.log(`MAE: ${mae.toFixed(4)}`)
```

**Formula:**

```
MAE = (1/n) * Σ|y_true - y_pred|
```

**Range:** [0, ∞), where 0 is perfect
**Best for:** Interpretability, less sensitive to outliers than MSE

### R² Score (Coefficient of Determination)

Proportion of variance in the dependent variable that is predictable.

```typescript
const r2 = metrics.r2Score(yTest, predictions)
console.log(`R² Score: ${r2.toFixed(4)}`)
```

**Formula:**

```
R² = 1 - (SS_res / SS_tot)
where SS_res = Σ(y_true - y_pred)²
      SS_tot = Σ(y_true - y_mean)²
```

**Range:** (-∞, 1], where 1 is perfect
**Best for:** Comparing models, understanding explained variance

### Root Mean Squared Error (RMSE)

Square root of MSE, in the same units as the target variable.

```typescript
// RMSE can be calculated from MSE
const mse = metrics.meanSquaredErrorScore(yTest, predictions)
const rmse = Math.sqrt(mse)
console.log(`RMSE: ${rmse.toFixed(4)}`)
```

**Formula:**

```
RMSE = √MSE
```

**Range:** [0, ∞), where 0 is perfect
**Best for:** Interpretability in original units

### Complete Regression Example

```typescript
import { metrics, dataset, linearModel, preprocessing, pipeline, modelSelection } from '@saltcorn/smartcore-js'

// Load regression data
const [x, y] = dataset.loadDiabetes({ returnXY: true })
const [xTrain, xTest, yTrain, yTest] = modelSelection.trainTestSplit(x, y, {
  testSize: 0.3,
  randomState: 42,
})

// Train model with pipeline
const pipe = pipeline.makePipeline([
  new preprocessing.StandardScaler(),
  new linearModel.RidgeRegression({ alpha: 1.0 }),
])
pipe.fit(xTrain, yTrain)

// Get predictions
const trainPred = pipe.predict(xTrain)
const testPred = pipe.predict(xTest)

// Calculate metrics for both sets
const trainMetrics = {
  mse: metrics.meanSquaredErrorScore(yTrain, trainPred),
  mae: metrics.meanAbsoluteErrorScore(yTrain, trainPred),
  r2: metrics.r2Score(yTrain, trainPred),
}

const testMetrics = {
  mse: metrics.meanSquaredErrorScore(yTest, testPred),
  mae: metrics.meanAbsoluteErrorScore(yTest, testPred),
  r2: metrics.r2Score(yTest, testPred),
}

console.log('\nRegression Results:')
console.log('─'.repeat(50))
console.log('Training Set:')
console.log(`  MSE:  ${trainMetrics.mse.toFixed(4)}`)
console.log(`  MAE:  ${trainMetrics.mae.toFixed(4)}`)
console.log(`  R²:   ${trainMetrics.r2.toFixed(4)}`)
console.log('\nTest Set:')
console.log(`  MSE:  ${testMetrics.mse.toFixed(4)}`)
console.log(`  MAE:  ${testMetrics.mae.toFixed(4)}`)
console.log(`  R²:   ${testMetrics.r2.toFixed(4)}`)
console.log(`  RMSE: ${Math.sqrt(testMetrics.mse).toFixed(4)}`)

// Check for overfitting
if (trainMetrics.r2 - testMetrics.r2 > 0.1) {
  console.log('\n⚠️  Warning: Possible overfitting detected')
}
```

## Distance Metrics

Distance metrics are used by algorithms like K-Nearest Neighbors.

### Available Distance Types

```typescript
import { coreBindings } from '@saltcorn/smartcore-js'

const { DistanceVariantType } = coreBindings

// Available types:
// - DistanceVariantType.Euclidean
// - DistanceVariantType.Manhattan
// - DistanceVariantType.Minkowski
// - DistanceVariantType.Hamming
// - DistanceVariantType.Mahalanobis
```

### Usage with KNN

```typescript
import { neighbors, coreBindings } from '@saltcorn/smartcore-js'

const { DistanceVariantType } = coreBindings

// Euclidean distance (default)
const knn1 = new neighbors.KNNClassifier({
  k: 5,
  distanceType: DistanceVariantType.Euclidean,
})

// Manhattan distance
const knn2 = new neighbors.KNNClassifier({
  k: 5,
  distanceType: DistanceVariantType.Manhattan,
})

// Minkowski distance with custom p
const knn3 = new neighbors.KNNClassifier({
  k: 5,
  distanceType: DistanceVariantType.Minkowski,
  p: 3, // p=1 is Manhattan, p=2 is Euclidean
})
```

### Distance Types Explained

**Euclidean:** Straight-line distance

```
d = √(Σ(x_i - y_i)²)
```

**Manhattan:** Sum of absolute differences

```
d = Σ|x_i - y_i|
```

**Minkowski:** Generalization of Euclidean and Manhattan

```
d = (Σ|x_i - y_i|^p)^(1/p)
```

**Hamming:** Number of positions at which symbols differ

```
d = count(x_i ≠ y_i)
```

**Mahalanobis:** Accounts for correlations between variables

```
d = √((x - y)ᵀ S⁻¹ (x - y))
```

## Best Practices

### 1. Choose Appropriate Metrics

```typescript
// For classification
if (datasetIsBalanced) {
  // Use accuracy
  const score = metrics.accuracyScore(yTrue, yPred)
} else {
  // Use F1 score for imbalanced data
  const score = metrics.f1Score(yTrue, yPred)
}

// For regression
if (needInterpretability) {
  // Use MAE (same units as target)
  const score = metrics.meanAbsoluteErrorScore(yTrue, yPred)
} else {
  // Use MSE (penalizes large errors more)
  const score = metrics.meanSquaredErrorScore(yTrue, yPred)
}
```

### 2. Calculate Multiple Metrics

```typescript
// Don't rely on a single metric
function evaluateClassifier(yTrue, yPred) {
  return {
    accuracy: metrics.accuracyScore(yTrue, yPred),
    precision: metrics.precisionScore(yTrue, yPred),
    recall: metrics.recallScore(yTrue, yPred),
    f1: metrics.f1Score(yTrue, yPred),
  }
}

const scores = evaluateClassifier(yTest, predictions)
console.table(scores)
```

### 3. Compare Train and Test Metrics

```typescript
// Check for overfitting
const trainScore = metrics.accuracyScore(yTrain, model.predict(xTrain))
const testScore = metrics.accuracyScore(yTest, model.predict(xTest))

console.log(`Train Accuracy: ${(trainScore * 100).toFixed(2)}%`)
console.log(`Test Accuracy:  ${(testScore * 100).toFixed(2)}%`)
console.log(`Difference:     ${((trainScore - testScore) * 100).toFixed(2)}%`)

if (trainScore - testScore > 0.1) {
  console.log('⚠️  Model may be overfitting')
}
```

### 4. Use Cross-Validation

```typescript
// Get more reliable performance estimates
async function crossValidate(model, x, y, kFolds = 5) {
  const foldSize = Math.floor(x.length / kFolds)
  const scores = []

  for (let i = 0; i < kFolds; i++) {
    const testStart = i * foldSize
    const testEnd = (i + 1) * foldSize

    const xTest = x.slice(testStart, testEnd)
    const yTest = y.slice(testStart, testEnd)
    const xTrain = [...x.slice(0, testStart), ...x.slice(testEnd)]
    const yTrain = [...y.slice(0, testStart), ...y.slice(testEnd)]

    model.fit(xTrain, yTrain)
    const pred = model.predict(xTest)
    const score = metrics.accuracyScore(yTest, pred)
    scores.push(score)
  }

  const mean = scores.reduce((a, b) => a + b) / scores.length
  const std = Math.sqrt(scores.reduce((a, b) => a + (b - mean) ** 2, 0) / scores.length)

  return { mean, std, scores }
}

const cvResults = await crossValidate(model, x, y, 5)
console.log(`CV Accuracy: ${(cvResults.mean * 100).toFixed(2)}% ± ${(cvResults.std * 100).toFixed(2)}%`)
```

### 5. Document Your Metrics

```typescript
// Keep track of model performance
interface ModelMetrics {
  algorithm: string
  trainedAt: Date
  trainSize: number
  testSize: number
  metrics: {
    accuracy?: number
    precision?: number
    recall?: number
    f1?: number
    mse?: number
    mae?: number
    r2?: number
  }
}

const modelMetrics: ModelMetrics = {
  algorithm: 'RandomForestClassifier',
  trainedAt: new Date(),
  trainSize: xTrain.length,
  testSize: xTest.length,
  metrics: {
    accuracy: metrics.accuracyScore(yTest, predictions),
    precision: metrics.precisionScore(yTest, predictions),
    recall: metrics.recallScore(yTest, predictions),
    f1: metrics.f1Score(yTest, predictions),
  },
}

// Save for later comparison
fs.writeFileSync('model_metrics.json', JSON.stringify(modelMetrics, null, 2))
```

## Metric Selection Guide

### For Classification

| Scenario                     | Recommended Metric | Reason                    |
| ---------------------------- | ------------------ | ------------------------- |
| Balanced classes             | Accuracy           | Simple, intuitive         |
| Imbalanced classes           | F1 Score           | Balances precision/recall |
| Cost of false positives high | Precision          | Minimize false alarms     |
| Cost of false negatives high | Recall             | Catch all positives       |
| Model comparison             | AUC                | Threshold-independent     |

### For Regression

| Scenario              | Recommended Metric | Reason               |
| --------------------- | ------------------ | -------------------- |
| Need interpretability | MAE                | Same units as target |
| Penalize large errors | MSE/RMSE           | Squares errors       |
| Compare models        | R² Score           | Normalized [0,1]     |
| Presence of outliers  | MAE                | Less sensitive       |

## Practical Examples

### Example 1: Model Comparison

```typescript
// Compare multiple models using consistent metrics
const models = [
  { name: 'Logistic Regression', model: new linearModel.LogisticRegression() },
  { name: 'Random Forest', model: new ensemble.RandomForestClassifier() },
  { name: 'KNN', model: new neighbors.KNNClassifier({ k: 5 }) },
]

const results = []

for (const { name, model } of models) {
  model.fit(xTrain, yTrain)
  const pred = model.predict(xTest)

  results.push({
    model: name,
    accuracy: metrics.accuracyScore(yTest, pred),
    precision: metrics.precisionScore(yTest, pred),
    recall: metrics.recallScore(yTest, pred),
    f1: metrics.f1Score(yTest, pred),
  })
}

// Sort by F1 score
results.sort((a, b) => b.f1 - a.f1)

console.log('\nModel Comparison:')
console.table(results)
```

### Example 2: Threshold Tuning

```typescript
// For models that output probabilities, tune the decision threshold
function findBestThreshold(yTrue, yProba, thresholds = [0.3, 0.4, 0.5, 0.6, 0.7]) {
  let bestThreshold = 0.5
  let bestF1 = 0

  for (const threshold of thresholds) {
    // Convert probabilities to predictions
    const yPred = yProba.map((p) => (p >= threshold ? 1 : 0))

    const f1 = metrics.f1Score(yTrue, yPred)

    if (f1 > bestF1) {
      bestF1 = f1
      bestThreshold = threshold
    }

    console.log(`Threshold ${threshold}: F1 = ${f1.toFixed(4)}`)
  }

  return { threshold: bestThreshold, f1: bestF1 }
}
```

### Example 3: Custom Metric Function

```typescript
// Create custom metrics for specific needs
function customBalancedAccuracy(yTrue: YType, yPred: YType): number {
  // Average of recall for each class
  const classes = Array.from(new Set([...Array.from(yTrue), ...Array.from(yPred)]))
  let totalRecall = 0

  for (const cls of classes) {
    const truePositives = Array.from(yTrue)
      .map((val, idx) => (val === cls && yPred[idx] === cls ? 1 : 0))
      .reduce((a, b) => a + b, 0)

    const actualPositives = Array.from(yTrue)
      .map((val) => (val === cls ? 1 : 0))
      .reduce((a, b) => a + b, 0)

    if (actualPositives > 0) {
      totalRecall += truePositives / actualPositives
    }
  }

  return totalRecall / classes.length
}

const balancedAcc = customBalancedAccuracy(yTest, predictions)
console.log(`Balanced Accuracy: ${(balancedAcc * 100).toFixed(2)}%`)
```

## Summary

**Key Takeaways:**

- **Classification metrics**: Accuracy, Precision, Recall, F1, AUC
- **Regression metrics**: MSE, MAE, R², RMSE
- **Distance metrics**: Euclidean, Manhattan, Minkowski, Hamming, Mahalanobis
- Choose metrics based on problem type and business requirements
- Always calculate multiple metrics
- Compare train and test performance
- Use cross-validation for reliable estimates
- Document all metrics for model comparison

---

**Previous**: [Preprocessing ←](./12-preprocessing.md) | **Next**: [Model Selection →](./14-model-selection.md)
