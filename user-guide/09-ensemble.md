# Ensemble Methods

Ensemble methods combine multiple models to produce better predictions than any single model.

## Available Ensemble Models

### Random Forest Classifier

Ensemble of decision trees for classification.

```typescript
import { ensemble, dataset, modelSelection, metrics } from '@saltcorn/smartcore-js'

const [x, y] = dataset.loadIris({ returnXY: true })
const [xTrain, xTest, yTrain, yTest] = modelSelection.trainTestSplit(x, y)

const model = new ensemble.RandomForestClassifier({
  nTrees: 100,
  maxDepth: 10,
  minSamplesSplit: 2,
  randomState: 42,
})
model.fit(xTrain, yTrain)

const predictions = model.predict(xTest)
const accuracy = metrics.accuracyScore(yTest, predictions)
console.log(`Accuracy: ${(accuracy * 100).toFixed(2)}%`)
```

**Key Parameters:**

- `nTrees`: Number of trees in the forest (default: 100)
- `maxDepth`: Maximum depth of each tree
- `minSamplesSplit`: Minimum samples to split a node
- `randomState`: Random seed for reproducibility

### Random Forest Regressor

Ensemble of decision trees for regression.

```typescript
import { ensemble, dataset } from '@saltcorn/smartcore-js'

const [x, y] = dataset.loadBoston({ returnXY: true })
const [xTrain, xTest, yTrain, yTest] = modelSelection.trainTestSplit(x, y)

const model = new ensemble.RandomForestRegressor({
  nTrees: 100,
  maxDepth: 15,
})
model.fit(xTrain, yTrain)

const predictions = model.predict(xTest)
const r2 = metrics.r2Score(yTest, predictions)
console.log(`R² Score: ${r2.toFixed(4)}`)
```

### Extra Trees Regressor

Extremely randomized trees for regression.

```typescript
const model = new ensemble.ExtraTreesRegressor({
  nTrees: 100,
  maxDepth: 10,
})
model.fit(xTrain, yTrain)
const predictions = model.predict(xTest)
```

**Difference from Random Forest:**

- More randomization in split selection
- Can be faster to train
- Often more robust to noise

## Advantages of Ensemble Methods

✅ **Benefits:**

- Higher accuracy than single models
- Reduces overfitting
- Handles non-linear relationships
- Robust to outliers
- Works well out-of-the-box

❌ **Considerations:**

- Slower training than single trees
- More memory intensive
- Less interpretable than single trees
- Requires tuning for optimal performance

## Hyperparameter Tuning

```typescript
// Grid search for best parameters
const nTreesOptions = [50, 100, 200]
const maxDepthOptions = [5, 10, 15, 20]

let bestModel = null
let bestScore = 0
let bestParams = null

for (const nTrees of nTreesOptions) {
  for (const maxDepth of maxDepthOptions) {
    const model = new ensemble.RandomForestClassifier({
      nTrees,
      maxDepth,
    })

    model.fit(xTrain, yTrain)
    const score = metrics.accuracyScore(yTest, model.predict(xTest))

    if (score > bestScore) {
      bestScore = score
      bestModel = model
      bestParams = { nTrees, maxDepth }
    }
  }
}

console.log('Best parameters:', bestParams)
console.log('Best score:', (bestScore * 100).toFixed(2) + '%')
```

## Complete Example with Pipeline

```typescript
import { ensemble, preprocessing, pipeline, dataset, modelSelection, metrics } from '@saltcorn/smartcore-js'

// Load data
const [x, y] = dataset.loadBreastCancer({ returnXY: true })
const [xTrain, xTest, yTrain, yTest] = modelSelection.trainTestSplit(x, y, { testSize: 0.3 })

// Create pipeline
const pipe = pipeline.makePipeline([
  new preprocessing.StandardScaler(),
  new ensemble.RandomForestClassifier({ nTrees: 100, maxDepth: 10 }),
])

// Train
pipe.fit(xTrain, yTrain)

// Evaluate
const testPred = pipe.predict(xTest)
console.log('Accuracy:', metrics.accuracyScore(yTest, testPred).toFixed(4))
console.log('F1 Score:', metrics.f1Score(yTest, testPred).toFixed(4))
```

## Model Persistence

```typescript
// Save model
const serialized = model.serialize()
fs.writeFileSync('random_forest.bin', serialized)

// Load model
const loaded = fs.readFileSync('random_forest.bin')
const restoredModel = ensemble.RandomForestClassifier.deserialize(loaded)
```

## Tips

1. **Start with defaults**: Random Forests work well with default parameters
2. **Increase trees**: More trees = better performance (but slower)
3. **Tune depth**: Control overfitting with `maxDepth`
4. **Use cross-validation**: For reliable performance estimates
5. **Consider Extra Trees**: For faster training with similar performance

---

**Previous**: [K-Nearest Neighbors ←](./08-neighbors.md) | **Next**: [Clustering →](./10-clustering.md)
