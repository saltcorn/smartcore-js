# Pipelines

Pipelines allow you to chain multiple data transformations and estimators into a single workflow, making your code cleaner, more maintainable, and less prone to errors.

## Table of Contents

- [Introduction](#introduction)
- [Creating Pipelines](#creating-pipelines)
- [Pipeline Operations](#pipeline-operations)
- [Advanced Features](#advanced-features)
- [Best Practices](#best-practices)
- [Practical Examples](#practical-examples)

## Introduction

A **Pipeline** is a sequence of transformers followed by a final estimator. It ensures that:

1. All preprocessing steps are applied consistently
2. The same transformations are used for training and testing
3. Code is more readable and maintainable
4. No data leakage occurs
5. Models can be serialized as a single unit

### Why Use Pipelines?

**Without Pipeline:**

```typescript
// ❌ Error-prone, verbose
const scaler = new preprocessing.StandardScaler()
scaler.fit(xTrain)
const xTrainScaled = scaler.transform(xTrain)
const xTestScaled = scaler.transform(xTest)

const pca = new decomposition.PCA({ nComponents: 10 })
pca.fit(xTrainScaled)
const xTrainReduced = pca.transform(xTrainScaled)
const xTestReduced = pca.transform(xTestScaled)

const model = new linearModel.LogisticRegression()
model.fit(xTrainReduced, yTrain)
const predictions = model.predict(xTestReduced)
```

**With Pipeline:**

```typescript
// ✅ Clean, simple, no leakage
const pipe = pipeline.makePipeline([
  new preprocessing.StandardScaler(),
  new decomposition.PCA({ nComponents: 10 }),
  new linearModel.LogisticRegression(),
])

pipe.fit(xTrain, yTrain)
const predictions = pipe.predict(xTest)
```

## Creating Pipelines

### Basic Pipeline

```typescript
import { pipeline, preprocessing, linearModel } from '@saltcorn/smartcore-js'

const pipe = pipeline.makePipeline([new preprocessing.StandardScaler(), new linearModel.LogisticRegression()])
```

### Named Steps

You can name each step for clarity:

```typescript
const pipe = pipeline.makePipeline([
  ['scaler', new preprocessing.StandardScaler()],
  ['classifier', new linearModel.LogisticRegression()],
])
```

### Automatic Naming

Steps without names get automatic names:

```typescript
const pipe = pipeline.makePipeline([
  new preprocessing.StandardScaler(), // Named 'StandardScaler0'
  new linearModel.LogisticRegression(), // Named 'LogisticRegression1'
])
```

### Configuration Options

```typescript
interface PipelineConfig {
  verbose?: boolean // Log step execution
  memory?: boolean // Cache intermediate results
  validateOnConstruction?: boolean // Validate pipeline structure
}

const pipe = pipeline.makePipeline([new preprocessing.StandardScaler(), new linearModel.LogisticRegression()], {
  verbose: true, // Print progress
  memory: false, // Don't cache
  validateOnConstruction: true, // Validate immediately
})
```

## Pipeline Operations

### Training (fit)

```typescript
// Fit all steps
pipe.fit(xTrain, yTrain)

// Internally:
// 1. StandardScaler.fit(xTrain) then transform(xTrain)
// 2. LogisticRegression.fit(transformed_xTrain, yTrain)
```

### Prediction (predict)

```typescript
const predictions = pipe.predict(xTest)

// Internally:
// 1. StandardScaler.transform(xTest)
// 2. LogisticRegression.predict(transformed_xTest)
```

### Transformation (transform)

For pipelines ending with a transformer:

```typescript
const pipe = pipeline.makePipeline([new preprocessing.StandardScaler(), new decomposition.PCA({ nComponents: 2 })])

pipe.fit(xTrain, yTrain) // y can be null for unsupervised
const xTrainTransformed = pipe.transform(xTrain)
const xTestTransformed = pipe.transform(xTest)
```

### Method Chaining

```typescript
const predictions = new pipeline.makePipeline([
  new preprocessing.StandardScaler(),
  new linearModel.LogisticRegression(),
])
  .fit(xTrain, yTrain)
  .predict(xTest)
```

## Advanced Features

### Multiple Transformers

Chain multiple preprocessing steps:

```typescript
const pipe = pipeline.makePipeline([
  new preprocessing.StandardScaler(), // Normalize features
  new decomposition.PCA({ nComponents: 50 }), // Reduce dimensions
  new preprocessing.StandardScaler(), // Normalize again after PCA
  new ensemble.RandomForestClassifier(), // Classify
])
```

### Passthrough Steps

Skip a step without removing it:

```typescript
const pipe = pipeline.makePipeline([
  ['scaler', new preprocessing.StandardScaler()],
  ['pca', 'passthrough'], // Skip PCA
  ['classifier', new linearModel.LogisticRegression()],
])
```

### Null Steps

```typescript
const pipe = pipeline.makePipeline([
  ['scaler', new preprocessing.StandardScaler()],
  ['pca', null], // Explicitly null
  ['classifier', new linearModel.LogisticRegression()],
])
```

### Verbose Mode

See what's happening at each step:

```typescript
const pipe = pipeline.makePipeline(
  [
    ['scaler', new preprocessing.StandardScaler()],
    ['pca', new decomposition.PCA({ nComponents: 10 })],
    ['classifier', new linearModel.LogisticRegression()],
  ],
  { verbose: true },
)

pipe.fit(xTrain, yTrain)
// Output:
// [Pipeline] (1/3) Processing step: scaler
//   Input: Dataframe(100 x 20)
//   Output: Dataframe(100 x 20)
// [Pipeline] (2/3) Processing step: pca
//   Input: Dataframe(100 x 20)
//   Output: Dataframe(100 x 10)
// [Pipeline] (3/3) Processing step: classifier
// [Pipeline] Fit complete
```

### Memory Caching

Cache intermediate results for faster repeated operations:

```typescript
const pipe = pipeline.makePipeline(
  [
    new preprocessing.StandardScaler(),
    new decomposition.PCA({ nComponents: 10 }),
    new linearModel.LogisticRegression(),
  ],
  { memory: true },
)

pipe.fit(xTrain, yTrain)
// First transform: computes everything
pipe.transform(xTrain)
// Second transform: uses cached results
pipe.transform(xTrain) // ⚡ Faster
```

### Working with DataFrames

Pipelines work seamlessly with DataFrames:

```typescript
import { dataFrame } from '@saltcorn/smartcore-js'

const df = new dataFrame.DataFrame(data)

const pipe = pipeline.makePipeline([
  new preprocessing.StandardScaler({
    columns: ['age', 'income'], // Only scale these columns
  }),
  new linearModel.LogisticRegression(),
])

pipe.fit(df, y)
const predictions = pipe.predict(df)
```

## Best Practices

### 1. Always Use Pipelines for Preprocessing

```typescript
// ✅ Good - consistent preprocessing
const pipe = pipeline.makePipeline([new preprocessing.StandardScaler(), new linearModel.LogisticRegression()])
pipe.fit(xTrain, yTrain)
pipe.predict(xTest)

// ❌ Bad - might forget to scale test data
const scaler = new preprocessing.StandardScaler()
scaler.fit(xTrain)
const xTrainScaled = scaler.transform(xTrain)
model.fit(xTrainScaled, yTrain)
model.predict(xTest) // Forgot to scale!
```

### 2. Name Your Steps

```typescript
// ✅ Good - clear names
const pipe = pipeline.makePipeline([
  ['scaling', new preprocessing.StandardScaler()],
  ['dimensionality_reduction', new decomposition.PCA({ nComponents: 10 })],
  ['classification', new linearModel.LogisticRegression()],
])

// ❌ OK but less clear
const pipe = pipeline.makePipeline([
  new preprocessing.StandardScaler(),
  new decomposition.PCA({ nComponents: 10 }),
  new linearModel.LogisticRegression(),
])
```

### 3. Keep Pipelines Focused

```typescript
// ✅ Good - clear purpose
const preprocessingPipe = pipeline.makePipeline([
  new preprocessing.StandardScaler(),
  new decomposition.PCA({ nComponents: 10 }),
])

// ✅ Good - separate pipelines for different models
const logisticPipe = pipeline.makePipeline([preprocessingPipe, new linearModel.LogisticRegression()])

const rfPipe = pipeline.makePipeline([preprocessingPipe, new ensemble.RandomForestClassifier()])
```

### 4. Use Verbose Mode for Debugging

```typescript
// During development
const pipe = pipeline.makePipeline([...steps], { verbose: true })

// In production
const pipe = pipeline.makePipeline([...steps], { verbose: false })
```

### 5. Serialize Complete Pipelines

```typescript
// Train and save entire pipeline
const pipe = pipeline.makePipeline([new preprocessing.StandardScaler(), new linearModel.LogisticRegression()])
pipe.fit(xTrain, yTrain)

// Save everything together
const serialized = pipe.serialize()
fs.writeFileSync('pipeline.bin', JSON.stringify(serialized))

// Load and use immediately
const loaded = JSON.parse(fs.readFileSync('pipeline.bin', 'utf-8'))
const restoredPipe = pipeline.deserializePipeline(loaded)
const predictions = restoredPipe.predict(xNew) // No separate scaler needed!
```

## Practical Examples

### Example 1: Complete ML Workflow

```typescript
import {
  pipeline,
  preprocessing,
  decomposition,
  ensemble,
  dataset,
  modelSelection,
  metrics,
} from '@saltcorn/smartcore-js'

// Load data
const [x, y] = dataset.loadBreastCancer({ returnXY: true })
const [xTrain, xTest, yTrain, yTest] = modelSelection.trainTestSplit(x, y, { testSize: 0.3 })

// Create comprehensive pipeline
const pipe = pipeline.makePipeline(
  [
    ['scaling', new preprocessing.StandardScaler()],
    ['pca', new decomposition.PCA({ nComponents: 15 })],
    ['classifier', new ensemble.RandomForestClassifier({ nTrees: 100 })],
  ],
  {
    verbose: true,
  },
)

// Train
console.log('Training pipeline...')
pipe.fit(xTrain, yTrain)

// Evaluate
const trainPred = pipe.predict(xTrain)
const testPred = pipe.predict(xTest)

console.log('Train Accuracy:', metrics.accuracyScore(yTrain, trainPred).toFixed(4))
console.log('Test Accuracy:', metrics.accuracyScore(yTest, testPred).toFixed(4))

// Save
const serialized = pipe.serialize()
fs.writeFileSync('breast_cancer_model.json', JSON.stringify(serialized))
```

### Example 2: Model Comparison with Pipelines

```typescript
import { pipeline, preprocessing, linearModel, ensemble, neighbors } from '@saltcorn/smartcore-js'

// Common preprocessing
const preprocessor = [
  ['scaler', new preprocessing.StandardScaler()],
  ['pca', new decomposition.PCA({ nComponents: 10 })],
]

// Different models
const models = [
  {
    name: 'Logistic Regression',
    pipe: pipeline.makePipeline([...preprocessor, ['model', new linearModel.LogisticRegression()]]),
  },
  {
    name: 'Random Forest',
    pipe: pipeline.makePipeline([...preprocessor, ['model', new ensemble.RandomForestClassifier()]]),
  },
  {
    name: 'KNN',
    pipe: pipeline.makePipeline([...preprocessor, ['model', new neighbors.KNNClassifier({ k: 5 })]]),
  },
]

// Compare all models
for (const { name, pipe } of models) {
  pipe.fit(xTrain, yTrain)
  const score = metrics.accuracyScore(yTest, pipe.predict(xTest))
  console.log(`${name}: ${(score * 100).toFixed(2)}%`)
}
```

### Example 3: Feature Engineering Pipeline

```typescript
import { dataFrame, pipeline, preprocessing, linearModel } from '@saltcorn/smartcore-js'

// Load DataFrame with mixed types
const df = new dataFrame.DataFrame(customerData, {
  exclude: ['id', 'timestamp'],
})

// Separate numeric and categorical columns
const numericCols = ['age', 'income', 'score']
const categoricalCols = ['category', 'region']

// Create pipeline
const pipe = pipeline.makePipeline([
  ['encode', new preprocessing.OneHotEncoder({ catIdx: new BigUint64Array([0, 1]) })],
  ['scale', new preprocessing.StandardScaler({ columns: numericCols })],
  ['model', new linearModel.LogisticRegression()],
])

pipe.fit(df, y)
const predictions = pipe.predict(dfTest)
```

### Example 4: Unsupervised Pipeline

```typescript
// Clustering pipeline
const clusterPipe = pipeline.makePipeline([
  ['scaling', new preprocessing.StandardScaler()],
  ['dimensionality', new decomposition.PCA({ nComponents: 2 })],
  ['clustering', new cluster.KMeans({ k: 3 })],
])

// Fit and predict clusters
clusterPipe.fit(x) // No y needed
const clusters = clusterPipe.predict(x)

console.log('Cluster assignments:', clusters)
```

### Example 5: Cross-Validation with Pipeline

```typescript
// K-fold cross-validation with pipeline
const kFolds = 5
const pipe = pipeline.makePipeline([new preprocessing.StandardScaler(), new linearModel.LogisticRegression()])

const foldSize = Math.floor(x.length / kFolds)
const scores = []

for (let i = 0; i < kFolds; i++) {
  // Split data
  const testStart = i * foldSize
  const testEnd = (i + 1) * foldSize

  const xTest = x.slice(testStart, testEnd)
  const yTest = y.slice(testStart, testEnd)
  const xTrain = [...x.slice(0, testStart), ...x.slice(testEnd)]
  const yTrain = [...y.slice(0, testStart), ...y.slice(testEnd)]

  // Train and evaluate
  pipe.fit(xTrain, yTrain)
  const pred = pipe.predict(xTest)
  const score = metrics.accuracyScore(yTest, pred)
  scores.push(score)

  console.log(`Fold ${i + 1}: ${(score * 100).toFixed(2)}%`)
}

const avgScore = scores.reduce((a, b) => a + b) / scores.length
console.log(`Average: ${(avgScore * 100).toFixed(2)}%`)
```

### Example 6: Grid Search with Pipelines

```typescript
// Search for best hyperparameters
const alphas = [0.001, 0.01, 0.1, 1.0]
const nComponents = [5, 10, 15, 20]

let bestPipe = null
let bestScore = 0
let bestParams = null

for (const alpha of alphas) {
  for (const nComp of nComponents) {
    const pipe = pipeline.makePipeline([
      new preprocessing.StandardScaler(),
      new decomposition.PCA({ nComponents: nComp }),
      new linearModel.LogisticRegression({ alpha }),
    ])

    pipe.fit(xTrain, yTrain)
    const score = metrics.accuracyScore(yTest, pipe.predict(xTest))

    if (score > bestScore) {
      bestScore = score
      bestPipe = pipe
      bestParams = { alpha, nComponents: nComp }
    }
  }
}

console.log('Best params:', bestParams)
console.log('Best score:', (bestScore * 100).toFixed(2) + '%')
```

## Common Patterns

### Pattern 1: Standard Classification Pipeline

```typescript
const classificationPipe = pipeline.makePipeline([
  new preprocessing.StandardScaler(), // Normalize
  new decomposition.PCA({ nComponents: 10 }), // Reduce dimensions
  new linearModel.LogisticRegression(), // Classify
])
```

### Pattern 2: Standard Regression Pipeline

```typescript
const regressionPipe = pipeline.makePipeline([
  new preprocessing.StandardScaler(), // Normalize
  new linearModel.Ridge({ alpha: 1.0 }), // Regularized regression
])
```

### Pattern 3: Complex Feature Engineering

```typescript
const featurePipe = pipeline.makePipeline([
  new preprocessing.OneHotEncoder({ catIdx: new BigUint64Array([0, 2]) }), // Encode categoricals
  new preprocessing.StandardScaler(), // Scale all features
  new decomposition.PCA({ nComponents: 20 }), // Reduce
  new ensemble.RandomForestClassifier(), // Classify
])
```

### Pattern 4: Dimensionality Reduction

```typescript
const dimReductionPipe = pipeline.makePipeline([
  new preprocessing.StandardScaler(),
  new decomposition.SVD({ nComponents: 2 }), // or PCA
])

dimReductionPipe.fit(x)
const reduced = dimReductionPipe.transform(x)
```

## Pipeline Validation

The pipeline validates its structure on creation (when `validateOnConstruction: true`):

```typescript
// ✅ Valid - transformers followed by predictor
pipeline.makePipeline([
  new preprocessing.StandardScaler(), // ✓ Transformer
  new decomposition.PCA(), // ✓ Transformer
  new linearModel.LogisticRegression(), // ✓ Predictor
])

// ❌ Invalid - predictor in the middle
pipeline.makePipeline([
  new preprocessing.StandardScaler(),
  new linearModel.LogisticRegression(), // ✗ Can't have predictor here
  new decomposition.PCA(), // ✗ Can't follow predictor
])

// ✅ Valid - all transformers
pipeline.makePipeline([new preprocessing.StandardScaler(), new decomposition.PCA()])
```

## Troubleshooting

### Common Issues

**Issue: "Pipeline must be fitted before calling 'predict'"**

```typescript
// ❌ Wrong
const pipe = pipeline.makePipeline([...])
pipe.predict(x) // Error!

// ✅ Correct
pipe.fit(xTrain, yTrain)
pipe.predict(x)
```

**Issue: Step names must be unique**

```typescript
// ❌ Wrong
pipeline.makePipeline([
  ['step1', new preprocessing.StandardScaler()],
  ['step1', new decomposition.PCA()], // Duplicate name!
])

// ✅ Correct
pipeline.makePipeline([
  ['scaler', new preprocessing.StandardScaler()],
  ['pca', new decomposition.PCA()],
])
```

**Issue: Cannot predict with transformer-only pipeline**

```typescript
// ❌ Wrong
const pipe = pipeline.makePipeline([new preprocessing.StandardScaler(), new decomposition.PCA()])
pipe.fit(x)
pipe.predict(x) // Error! No predictor

// ✅ Correct - use transform
const transformed = pipe.transform(x)
```

## Summary

**Key Takeaways:**

- **Pipelines** chain transformers and estimators into workflows
- Ensure consistent preprocessing for train and test data
- Prevent data leakage automatically
- Make code cleaner and more maintainable
- Support serialization as single units
- Work with arrays, matrices, and DataFrames
- Enable verbose logging for debugging
- Validate structure on construction

---

**Previous**: [Model Selection ←](./14-model-selection.md) | **Next**: [Model Persistence →](./16-serialization.md)
