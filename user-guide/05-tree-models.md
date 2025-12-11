# Tree-Based Models

Decision trees and tree-based models are powerful algorithms for both classification and regression tasks.

## Available Models

### Decision Tree Classifier

Binary and multiclass classification using decision trees.

```typescript
import { tree, dataset, modelSelection, metrics } from '@saltcorn/smartcore-js'

// Load data
const [x, y] = dataset.loadIris({ returnXY: true })
const [xTrain, xTest, yTrain, yTest] = modelSelection.trainTestSplit(x, y)

// Create and train model
const model = new tree.DecisionTreeClassifier({
  maxDepth: 10,
  minSamplesSplit: 2,
  criterion: 'gini', // or 'entropy'
})
model.fit(xTrain, yTrain)

// Predict
const predictions = model.predict(xTest)
const accuracy = metrics.accuracyScore(yTest, predictions)
console.log(`Accuracy: ${(accuracy * 100).toFixed(2)}%`)
```

**Parameters:**

- `maxDepth`: Maximum tree depth (prevents overfitting)
- `minSamplesSplit`: Minimum samples required to split a node
- `criterion`: Splitting criterion ('gini' or 'entropy')

### Decision Tree Regressor

Regression using decision trees.

```typescript
import { tree, dataset } from '@saltcorn/smartcore-js'

const [x, y] = dataset.loadBoston({ returnXY: true })
const [xTrain, xTest, yTrain, yTest] = modelSelection.trainTestSplit(x, y)

const model = new tree.DecisionTreeRegressor({
  maxDepth: 5,
  minSamplesSplit: 10,
})
model.fit(xTrain, yTrain)

const predictions = model.predict(xTest)
const r2 = metrics.r2Score(yTest, predictions)
console.log(`R² Score: ${r2.toFixed(4)}`)
```

## When to Use Decision Trees

✅ **Advantages:**

- Easy to interpret and visualize
- Handles both numerical and categorical features
- Requires little data preprocessing
- Non-linear relationships
- Feature importance

❌ **Disadvantages:**

- Prone to overfitting
- Can be unstable (small data changes = different tree)
- Biased toward dominant classes

## Model Serialization

```typescript
// Save model
const serialized = model.serialize()
fs.writeFileSync('tree_model.bin', serialized)

// Load model
const loaded = fs.readFileSync('tree_model.bin')
const restoredModel = tree.DecisionTreeClassifier.deserialize(loaded)
```

## Complete Example

```typescript
import { tree, dataset, preprocessing, pipeline, modelSelection, metrics } from '@saltcorn/smartcore-js'

// Load and prepare data
const [x, y] = dataset.loadBreastCancer({ returnXY: true })
const [xTrain, xTest, yTrain, yTest] = modelSelection.trainTestSplit(x, y, { testSize: 0.3 })

// Create pipeline
const pipe = pipeline.makePipeline([
  new preprocessing.StandardScaler(),
  new tree.DecisionTreeClassifier({ maxDepth: 5 }),
])

// Train
pipe.fit(xTrain, yTrain)

// Evaluate
const trainPred = pipe.predict(xTrain)
const testPred = pipe.predict(xTest)

console.log('Train Accuracy:', metrics.accuracyScore(yTrain, trainPred).toFixed(4))
console.log('Test Accuracy:', metrics.accuracyScore(yTest, testPred).toFixed(4))
```

## Tips

1. **Prevent Overfitting**: Set `maxDepth` and `minSamplesSplit`
2. **Feature Scaling**: Not required for decision trees
3. **Interpretability**: Trees are easy to explain
4. **Consider Ensembles**: For better performance, use Random Forests (see Ensemble Methods)

---

**Previous**: [Linear Models ←](./04-linear-models.md) | **Next**: [Support Vector Machines →](./06-svm.md)
