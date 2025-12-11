# Model Selection

Tools for splitting data and validating models.

## Train-Test Split

Split data into training and testing sets.

```typescript
import { modelSelection, dataset } from '@saltcorn/smartcore-js'

const [x, y] = dataset.loadIris({ returnXY: true })

const [xTrain, xTest, yTrain, yTest] = modelSelection.trainTestSplit(x, y, {
  testSize: 0.3, // 30% for testing
  randomState: 42, // For reproducibility
})

console.log('Training samples:', xTrain.length)
console.log('Test samples:', xTest.length)
```

**Parameters:**

- `testSize`: Proportion for test set (0.0 to 1.0)
- `randomState`: Random seed for reproducibility
- `shuffle`: Whether to shuffle before splitting (default: true)

## K-Fold Cross-Validation

Split data into k folds for cross-validation.

```typescript
const kfold = new modelSelection.KFold({
  nSplits: 5, // 5-fold cross-validation
  shuffle: true,
  randomState: 42,
})

const folds = kfold.split(x, y)
const scores = []

for (const [trainIdx, testIdx] of folds) {
  const xTrain = trainIdx.map((i) => x[i])
  const yTrain = trainIdx.map((i) => y[i])
  const xTest = testIdx.map((i) => x[i])
  const yTest = testIdx.map((i) => y[i])

  model.fit(xTrain, yTrain)
  const pred = model.predict(xTest)
  scores.push(metrics.accuracyScore(yTest, pred))
}

const avgScore = scores.reduce((a, b) => a + b) / scores.length
console.log(`Cross-validation score: ${(avgScore * 100).toFixed(2)}%`)
```

## Cross-Validation Helper

```typescript
const scores = modelSelection.crossValidate(model, x, y, {
  cv: 5, // 5-fold
  scoring: 'accuracy',
})

console.log('CV Scores:', scores)
console.log('Mean:', scores.reduce((a, b) => a + b) / scores.length)
```

## Stratified Split

Preserve class distribution in splits.

```typescript
const [xTrain, xTest, yTrain, yTest] = modelSelection.trainTestSplit(x, y, {
  testSize: 0.3,
  stratify: y, // Preserve class balance
  randomState: 42,
})
```

## Complete Example

```typescript
import { modelSelection, linearModel, ensemble, metrics, dataset } from '@saltcorn/smartcore-js'

const [x, y] = dataset.loadBreastCancer({ returnXY: true })

// Split data
const [xTrain, xTest, yTrain, yTest] = modelSelection.trainTestSplit(x, y, {
  testSize: 0.2,
  randomState: 42,
})

// Try multiple models
const models = [
  { name: 'Logistic Regression', model: new linearModel.LogisticRegression() },
  { name: 'Random Forest', model: new ensemble.RandomForestClassifier() },
]

for (const { name, model } of models) {
  // Train
  model.fit(xTrain, yTrain)

  // Test
  const pred = model.predict(xTest)
  const accuracy = metrics.accuracyScore(yTest, pred)

  console.log(`${name}: ${(accuracy * 100).toFixed(2)}%`)
}
```

## Best Practices

1. **Always use test set**: Never evaluate on training data
2. **Use cross-validation**: For reliable performance estimates
3. **Set random state**: For reproducible results
4. **Stratify for imbalanced data**: Preserve class distribution
5. **Hold out final test set**: Use for final evaluation only

```typescript
// ✅ Good practice
const [xTemp, xFinal, yTemp, yFinal] = modelSelection.trainTestSplit(x, y, {
  testSize: 0.15, // 15% final test set
})
const [xTrain, xVal, yTrain, yVal] = modelSelection.trainTestSplit(xTemp, yTemp, {
  testSize: 0.18, // ~15% validation set
})

// Train on xTrain/yTrain
// Tune on xVal/yVal
// Final evaluation on xFinal/yFinal
```

---

**Previous**: [Metrics ←](./13-metrics.md) | **Next**: [Pipelines →](./15-pipelines.md)
