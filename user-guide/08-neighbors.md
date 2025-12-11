# K-Nearest Neighbors

K-Nearest Neighbors (KNN) is a simple, instance-based learning algorithm for classification and regression.

## KNN Classifier

Classification based on k nearest neighbors.

```typescript
import { neighbors, dataset, modelSelection, metrics, coreBindings } from '@saltcorn/smartcore-js'

const { DistanceVariantType } = coreBindings
const [x, y] = dataset.loadIris({ returnXY: true })
const [xTrain, xTest, yTrain, yTest] = modelSelection.trainTestSplit(x, y)

const model = new neighbors.KNNClassifier({
  k: 5, // Number of neighbors
  distanceType: DistanceVariantType.Euclidean,
})
model.fit(xTrain, yTrain)

const predictions = model.predict(xTest)
const accuracy = metrics.accuracyScore(yTest, predictions)
console.log(`Accuracy: ${(accuracy * 100).toFixed(2)}%`)
```

**Key Parameters:**

- `k`: Number of neighbors to consider (default: 5)
- `distanceType`: Distance metric (Euclidean, Manhattan, Minkowski, etc.)
- `p`: Parameter for Minkowski distance

## KNN Regressor

Regression based on k nearest neighbors.

```typescript
const model = new neighbors.KNNRegressor({
  k: 5,
  distanceType: DistanceVariantType.Manhattan,
})
model.fit(xTrain, yTrain)
const predictions = model.predict(xTest)
const r2 = metrics.r2Score(yTest, predictions)
```

## Distance Metrics

```typescript
// Euclidean (default)
new neighbors.KNNClassifier({ k: 5, distanceType: DistanceVariantType.Euclidean })

// Manhattan
new neighbors.KNNClassifier({ k: 5, distanceType: DistanceVariantType.Manhattan })

// Minkowski
new neighbors.KNNClassifier({ k: 5, distanceType: DistanceVariantType.Minkowski, p: 3 })
```

## Choosing K

```typescript
// Test different k values
const kValues = [1, 3, 5, 7, 9, 11]
const results = []

for (const k of kValues) {
  const model = new neighbors.KNNClassifier({ k })
  model.fit(xTrain, yTrain)
  const score = metrics.accuracyScore(yTest, model.predict(xTest))
  results.push({ k, score })
  console.log(`k=${k}: ${(score * 100).toFixed(2)}%`)
}

const best = results.reduce((a, b) => (a.score > b.score ? a : b))
console.log(`Best k: ${best.k}`)
```

## Advantages & Limitations

✅ **Advantages:**

- Simple and intuitive
- No training phase (instance-based)
- Works well with small datasets
- Naturally handles multiclass problems

❌ **Limitations:**

- Slow prediction for large datasets
- Sensitive to feature scales (use scaling!)
- Curse of dimensionality
- Memory intensive

## Best Practices

```typescript
import { neighbors, preprocessing, pipeline } from '@saltcorn/smartcore-js'

// Always scale features for KNN
const pipe = pipeline.makePipeline([
  new preprocessing.StandardScaler(), // Critical for KNN!
  new neighbors.KNNClassifier({ k: 5 }),
])

pipe.fit(xTrain, yTrain)
const predictions = pipe.predict(xTest)
```

## Model Serialization

```typescript
const serialized = model.serialize()
fs.writeFileSync('knn_model.bin', serialized)

const loaded = fs.readFileSync('knn_model.bin')
const restoredModel = neighbors.KNNClassifier.deserialize(loaded)
```

---

**Previous**: [Naive Bayes ←](./07-naive-bayes.md) | **Next**: [Ensemble Methods →](./09-ensemble.md)
