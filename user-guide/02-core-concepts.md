# Core Concepts

This guide introduces the fundamental concepts and design principles of SmartCore-JS.

## Table of Contents

- [Estimators and Predictors](#estimators-and-predictors)
- [Supervised vs Unsupervised Learning](#supervised-vs-unsupervised-learning)
- [Transformers](#transformers)
- [Data Types and Formats](#data-types-and-formats)
- [Model Persistence](#model-persistence)
- [The Fit-Transform Pattern](#the-fit-transform-pattern)
- [API Design Philosophy](#api-design-philosophy)

## Estimators and Predictors

SmartCore-JS follows scikit-learn's design philosophy with **estimators** and **predictors**.

### Estimators

An **estimator** is any object that learns from data. All estimators implement the `fit` method:

```typescript
class MyEstimator {
  fit(x: XType, y: YType): this {
    // Learn from data
    return this
  }
}
```

**Key characteristics:**

- `fit(x, y)` learns from training data
- Returns `this` for method chaining
- Stores learned parameters internally
- Can be used multiple times (refitting replaces previous state)

**Example:**

```typescript
import { linearModel, dataset } from '@saltcorn/smartcore-js'

const [x, y] = dataset.loadIris({ returnXY: true })

const model = new linearModel.LinearRegression()
model.fit(x, y) // Learn from data

// Later, can refit with new data
model.fit(newX, newY) // Previous learning is replaced
```

### Predictors

A **predictor** is an estimator that can make predictions. All predictors implement the `predict` method:

```typescript
class MyPredictor extends MyEstimator {
  predict(x: XType): YType {
    // Make predictions
    return predictions
  }
}
```

**Key characteristics:**

- Must be fitted before calling `predict`
- `predict(x)` returns predictions for new data
- Throws error if called before fitting

**Example:**

```typescript
const model = new linearModel.LogisticRegression()

// ❌ This will throw an error
// const pred = model.predict(x)

// ✅ Correct: fit first, then predict
model.fit(xTrain, yTrain)
const predictions = model.predict(xTest)
```

## Supervised vs Unsupervised Learning

### Supervised Learning

Supervised learning algorithms learn from **labeled data** (both features `x` and targets `y`):

```typescript
// Classification
const classifier = new linearModel.LogisticRegression()
classifier.fit(x, y) // Needs both x and y

// Regression
const regressor = new linearModel.LinearRegression()
regressor.fit(x, y) // Needs both x and y
```

**Use cases:**

- **Classification**: Predicting categories (spam/not spam, disease diagnosis)
- **Regression**: Predicting continuous values (house prices, temperature)

### Unsupervised Learning

Unsupervised learning algorithms learn from **unlabeled data** (only features `x`):

```typescript
// Clustering
const kmeans = new cluster.KMeans({ k: 3 })
kmeans.fit(x) // Only needs x
const clusters = kmeans.predict(x)

// Dimensionality Reduction
const pca = new decomposition.PCA({ nComponents: 2 })
pca.fit(x) // Only needs x
const reduced = pca.transform(x)
```

**Use cases:**

- **Clustering**: Grouping similar data points
- **Dimensionality Reduction**: Reducing feature space while preserving information
- **Anomaly Detection**: Finding outliers

## Transformers

A **transformer** is an estimator that can transform data. All transformers implement the `transform` method:

```typescript
class MyTransformer extends MyEstimator {
  transform(x: XType): XType {
    // Transform data
    return transformedX
  }
}
```

### Common Transformers

#### StandardScaler

Standardizes features by removing the mean and scaling to unit variance:

```typescript
import { preprocessing } from '@saltcorn/smartcore-js'

const scaler = new preprocessing.StandardScaler()
scaler.fit(xTrain) // Learn mean and std from training data

const xTrainScaled = scaler.transform(xTrain)
const xTestScaled = scaler.transform(xTest) // Use same parameters
```

**Important**: Always fit on training data only, then transform both train and test sets.

#### OneHotEncoder

Encodes categorical features as one-hot vectors:

```typescript
const encoder = new preprocessing.OneHotEncoder({
  catIdx: new BigUint64Array([0, 2]), // Columns 0 and 2 are categorical
})
encoder.fit(xTrain)
const xTrainEncoded = encoder.transform(xTrain)
```

### Fit-Transform Pattern

Many transformers support the `fit_transform` pattern for convenience:

```typescript
// Instead of:
scaler.fit(xTrain)
const xTrainScaled = scaler.transform(xTrain)

// You can use pipelines which handle this automatically:
import { pipeline } from '@saltcorn/smartcore-js'

const pipe = pipeline.makePipeline([
  new preprocessing.StandardScaler(), // Automatically fit and transform
  new linearModel.LogisticRegression(),
])
```

## Data Types and Formats

SmartCore-JS is flexible with input data formats but optimizes for specific types.

### Input Types (X)

Features (`x`) can be provided in multiple formats:

#### 1. Nested Arrays

```typescript
const x = [
  [1.0, 2.0, 3.0],
  [4.0, 5.0, 6.0],
  [7.0, 8.0, 9.0],
]
```

**Pros**: Simple and readable
**Cons**: Slower for large datasets

#### 2. Typed Arrays with DenseMatrix

```typescript
import { coreBindings } from '@saltcorn/smartcore-js'

const data = new Float64Array([1, 2, 3, 4, 5, 6, 7, 8, 9])
const x = coreBindings.DenseMatrix.from1DArray(data, 3, 3, 'row')
```

**Pros**: Fast, memory-efficient
**Cons**: More verbose

#### 3. DataFrame

```typescript
import { dataFrame } from '@saltcorn/smartcore-js'

const df = new dataFrame.DataFrame([
  { age: 25, income: 50000, score: 85 },
  { age: 30, income: 60000, score: 90 },
])
```

**Pros**: Handles mixed types, named columns, nested objects
**Cons**: More overhead than arrays

### Target Types (Y)

Targets (`y`) should be numeric arrays or typed arrays:

#### Classification (Discrete Labels)

```typescript
// Regular array
const y = [0, 1, 2, 0, 1, 2]

// Typed array (more efficient)
const y = new Int32Array([0, 1, 2, 0, 1, 2])
const y = new Uint8Array([0, 1, 2, 0, 1, 2])
```

#### Regression (Continuous Values)

```typescript
// Regular array
const y = [1.5, 2.3, 4.7, 3.2]

// Typed array (more efficient)
const y = new Float64Array([1.5, 2.3, 4.7, 3.2])
const y = new Float32Array([1.5, 2.3, 4.7, 3.2])
```

### Type Conversion

SmartCore-JS automatically converts arrays to appropriate typed arrays:

```typescript
import { asTypedY } from '@saltcorn/smartcore-js'

const y = [1, 2, 3, 4, 5]
const yTyped = asTypedY(y) // Automatically selects best typed array
```

### Performance Recommendations

For **best performance**:

1. Use typed arrays (`Float64Array`, `Int32Array`) for large datasets
2. Use `DenseMatrix` for matrix operations
3. Reuse objects instead of creating new ones in loops

```typescript
// ❌ Slower - creates new arrays in loop
for (let i = 0; i < 1000; i++) {
  const x = [
    [1, 2],
    [3, 4],
  ]
  model.predict(x)
}

// ✅ Faster - reuse typed array
const x = coreBindings.DenseMatrix.from2DArray([
  [1, 2],
  [3, 4],
])
for (let i = 0; i < 1000; i++) {
  model.predict(x)
}
```

## Model Persistence

SmartCore-JS supports saving and loading trained models.

### Serialization

All models implement `serialize()` which returns a `Buffer`:

```typescript
const model = new linearModel.LinearRegression()
model.fit(xTrain, yTrain)

// Serialize to Buffer
const serialized: Buffer = model.serialize()

// Save to file
import fs from 'fs'
fs.writeFileSync('model.bin', serialized)
```

### Deserialization

Use static `deserialize()` method to load models:

```typescript
import fs from 'fs'
import { linearModel } from '@saltcorn/smartcore-js'

// Load from file
const data = fs.readFileSync('model.bin')

// Deserialize
const model = linearModel.LinearRegression.deserialize(data)

// Use immediately (no need to fit)
const predictions = model.predict(xTest)
```

### Pipeline Serialization

Pipelines can also be serialized:

```typescript
import { pipeline, preprocessing, linearModel } from '@saltcorn/smartcore-js'

// Create and train pipeline
const pipe = pipeline.makePipeline([new preprocessing.StandardScaler(), new linearModel.LogisticRegression()])
pipe.fit(xTrain, yTrain)

// Serialize
const serialized = pipe.serialize()

// Deserialize
const loadedPipe = pipeline.deserializePipeline(serialized)
const predictions = loadedPipe.predict(xTest)
```

### Storage Best Practices

```typescript
// 1. Store with metadata
interface SavedModel {
  model: Buffer
  metadata: {
    algorithm: string
    trainedAt: Date
    accuracy: number
    features: string[]
  }
}

const saved: SavedModel = {
  model: model.serialize(),
  metadata: {
    algorithm: 'LogisticRegression',
    trainedAt: new Date(),
    accuracy: 0.95,
    features: ['age', 'income', 'score'],
  },
}

fs.writeFileSync(
  'model.json',
  JSON.stringify({
    ...saved,
    model: saved.model.toString('base64'), // Convert Buffer to base64
  }),
)

// 2. Load with validation
const loaded = JSON.parse(fs.readFileSync('model.json', 'utf-8'))
if (loaded.metadata.algorithm === 'LogisticRegression') {
  const model = linearModel.LogisticRegression.deserialize(Buffer.from(loaded.model, 'base64'))
}
```

## The Fit-Transform Pattern

Understanding when to fit and when to transform is crucial:

### Rule 1: Fit on Training Data Only

```typescript
// ✅ Correct
scaler.fit(xTrain)
const xTrainScaled = scaler.transform(xTrain)
const xTestScaled = scaler.transform(xTest)

// ❌ Wrong - causes data leakage
scaler.fit(xTest) // Never fit on test data!
```

**Why?** Fitting on test data leads to **data leakage** - the model gains information about the test set it shouldn't have.

### Rule 2: Use Same Parameters for Train and Test

```typescript
// ✅ Correct - same scaler for both
scaler.fit(xTrain)
const xTrainScaled = scaler.transform(xTrain)
const xTestScaled = scaler.transform(xTest)

// ❌ Wrong - different scalers
scaler1.fit(xTrain)
const xTrainScaled = scaler1.transform(xTrain)

scaler2.fit(xTest) // Don't create a new scaler!
const xTestScaled = scaler2.transform(xTest)
```

### Rule 3: Transform Before Prediction

```typescript
// ✅ Correct
const scaler = new preprocessing.StandardScaler()
scaler.fit(xTrain)

const model = new linearModel.LogisticRegression()
model.fit(scaler.transform(xTrain), yTrain)

// Transform new data before prediction
const xNewScaled = scaler.transform(xNew)
const predictions = model.predict(xNewScaled)

// ❌ Wrong - forgot to scale
const predictions = model.predict(xNew) // Data not in same scale!
```

### Pipelines Automate This

Pipelines handle the fit-transform pattern automatically:

```typescript
import { pipeline, preprocessing, linearModel } from '@saltcorn/smartcore-js'

const pipe = pipeline.makePipeline([
  new preprocessing.StandardScaler(), // Fits and transforms automatically
  new linearModel.LogisticRegression(),
])

pipe.fit(xTrain, yTrain) // Scales then trains
const predictions = pipe.predict(xTest) // Scales then predicts
```

## API Design Philosophy

SmartCore-JS follows these design principles:

### 1. Scikit-learn Compatibility

API designed to be familiar to scikit-learn users:

```python
# Python scikit-learn
from sklearn.linear_model import LogisticRegression
model = LogisticRegression()
model.fit(X_train, y_train)
predictions = model.predict(X_test)
```

```typescript
// SmartCore-JS (nearly identical!)
import { linearModel } from '@saltcorn/smartcore-js'
const model = new linearModel.LogisticRegression()
model.fit(xTrain, yTrain)
const predictions = model.predict(xTest)
```

### 2. TypeScript First

Full type safety and IntelliSense support:

```typescript
import { linearModel, type XType, type YType } from '@saltcorn/smartcore-js'

const model: linearModel.LinearRegression = new linearModel.LinearRegression()
const x: XType = [
  [1, 2],
  [3, 4],
]
const y: YType = [0, 1]

model.fit(x, y)
const predictions: YType = model.predict(x) // Type-checked
```

### 3. Method Chaining

Methods return `this` for fluent API:

```typescript
const predictions = new linearModel.LogisticRegression().fit(xTrain, yTrain).predict(xTest)
```

### 4. Sensible Defaults

All parameters have sensible defaults:

```typescript
// ✅ Works with no configuration
const model = new ensemble.RandomForestClassifier()
model.fit(x, y)

// ✅ Can customize as needed
const model = new ensemble.RandomForestClassifier({
  nTrees: 200,
  maxDepth: 15,
  minSamplesSplit: 5,
})
```

### 5. Explicit Over Implicit

Clear, explicit code over magic:

```typescript
// ✅ Clear what's happening
const scaler = new preprocessing.StandardScaler()
scaler.fit(xTrain)
const xScaled = scaler.transform(xTrain)
model.fit(xScaled, yTrain)

// Better: Use pipelines for complex workflows
const pipe = pipeline.makePipeline([new preprocessing.StandardScaler(), new linearModel.LogisticRegression()])
```

## Common Patterns

### Pattern 1: Train-Validate-Test Split

```typescript
import { modelSelection } from '@saltcorn/smartcore-js'

// Split data 70-15-15
const [xTemp, xTest, yTemp, yTest] = modelSelection.trainTestSplit(x, y, { testSize: 0.15, randomState: 42 })
const [xTrain, xVal, yTrain, yVal] = modelSelection.trainTestSplit(
  xTemp,
  yTemp,
  { testSize: 0.176, randomState: 42 }, // 0.176 of 85% ≈ 15%
)

// Train on training set
model.fit(xTrain, yTrain)

// Tune on validation set
const valScore = metrics.accuracyScore(yVal, model.predict(xVal))

// Final evaluation on test set
const testScore = metrics.accuracyScore(yTest, model.predict(xTest))
```

### Pattern 2: Preprocessing Pipeline

```typescript
const pipe = pipeline.makePipeline([
  new preprocessing.StandardScaler(), // Scale features
  new decomposition.PCA({ nComponents: 10 }), // Reduce dimensions
  new ensemble.RandomForestClassifier(), // Classify
])

pipe.fit(xTrain, yTrain)
const predictions = pipe.predict(xTest)
```

### Pattern 3: Model Comparison

```typescript
async function findBestModel(x, y) {
  const [xTrain, xTest, yTrain, yTest] = modelSelection.trainTestSplit(x, y)

  const models = [
    { name: 'Logistic Regression', model: new linearModel.LogisticRegression() },
    { name: 'Random Forest', model: new ensemble.RandomForestClassifier() },
    { name: 'KNN', model: new neighbors.KNNClassifier() },
  ]

  const results = models.map(({ name, model }) => {
    model.fit(xTrain, yTrain)
    const score = metrics.accuracyScore(yTest, model.predict(xTest))
    return { name, score, model }
  })

  return results.sort((a, b) => b.score - a.score)[0]
}
```

## Next Steps

Now that you understand the core concepts:

1. **[DataFrame Guide →](./03-dataframe.md)** - Learn advanced data handling
2. **[Linear Models →](./04-linear-models.md)** - Explore linear algorithms
3. **[Pipelines →](./15-pipelines.md)** - Build complex workflows

## Summary

**Key Takeaways:**

- **Estimators** learn from data via `fit()`
- **Predictors** make predictions via `predict()`
- **Transformers** transform data via `transform()`
- Always fit on training data only
- Use pipelines to automate workflows
- Models can be saved and loaded
- API follows scikit-learn conventions

---

**Previous**: [Getting Started ←](./01-getting-started.md) | **Next**: [DataFrame Guide →](./03-dataframe.md)
