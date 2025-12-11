# Getting Started with SmartCore-JS

Welcome to SmartCore-JS! This guide will help you install the library and create your first machine learning model.

## Installation

### Using npm

```bash
npm install @saltcorn/smartcore-js
```

### Using yarn

```bash
yarn add @saltcorn/smartcore-js
```

### Using pnpm

```bash
pnpm add @saltcorn/smartcore-js
```

## System Requirements

- **Node.js**: Version 10.0.0 or higher
- **Operating Systems**:
  - Windows (x64, ia32, arm64)
  - macOS (Intel and Apple Silicon)
  - Linux (x64, arm64, armv7)
  - FreeBSD
  - Android
  - WebAssembly

## Quick Start

Let's create your first machine learning model using the Iris dataset, a classic dataset for classification problems.

### Example 1: Basic Classification

```typescript
import { linearModel, dataset, metrics } from '@saltcorn/smartcore-js'

// Load the Iris dataset
const [x, y] = dataset.loadIris({ returnXY: true })

// Create a Logistic Regression model
const model = new linearModel.LogisticRegression()

// Train the model
model.fit(x, y)

// Make predictions
const predictions = model.predict(x)

// Evaluate the model
const accuracy = metrics.accuracyScore(y, predictions)
console.log(`Training Accuracy: ${(accuracy * 100).toFixed(2)}%`)
```

**Output:**

```
Training Accuracy: 98.00%
```

### Example 2: Train-Test Split

In real-world scenarios, you should always split your data into training and testing sets:

```typescript
import { linearModel, dataset, modelSelection, metrics } from '@saltcorn/smartcore-js'

// Load dataset
const [x, y] = dataset.loadIris({ returnXY: true })

// Split data into training (70%) and testing (30%) sets
const [xTrain, xTest, yTrain, yTest] = modelSelection.trainTestSplit(x, y, { testSize: 0.3, randomState: 42 })

// Create and train model
const model = new linearModel.LogisticRegression()
model.fit(xTrain, yTrain)

// Evaluate on test set
const testPredictions = model.predict(xTest)
const testAccuracy = metrics.accuracyScore(yTest, testPredictions)

console.log(`Test Accuracy: ${(testAccuracy * 100).toFixed(2)}%`)
```

### Example 3: Using Different Algorithms

SmartCore-JS makes it easy to try different algorithms:

```typescript
import { linearModel, ensemble, neighbors, dataset, modelSelection, metrics } from '@saltcorn/smartcore-js'

// Load and split data
const [x, y] = dataset.loadIris({ returnXY: true })
const [xTrain, xTest, yTrain, yTest] = modelSelection.trainTestSplit(x, y, { testSize: 0.3, randomState: 42 })

// Try multiple algorithms
const algorithms = [
  { name: 'Logistic Regression', model: new linearModel.LogisticRegression() },
  { name: 'Random Forest', model: new ensemble.RandomForestClassifier() },
  { name: 'K-Nearest Neighbors', model: new neighbors.KNNClassifier({ k: 5 }) },
]

for (const algo of algorithms) {
  // Train
  algo.model.fit(xTrain, yTrain)

  // Test
  const predictions = algo.model.predict(xTest)
  const accuracy = metrics.accuracyScore(yTest, predictions)

  console.log(`${algo.name}: ${(accuracy * 100).toFixed(2)}%`)
}
```

**Output:**

```
Logistic Regression: 97.78%
Random Forest: 95.56%
K-Nearest Neighbors: 97.78%
```

## Basic Workflow

The typical machine learning workflow in SmartCore-JS follows these steps:

### 1. Import Required Modules

```typescript
import {
  linearModel, // Linear models like regression
  ensemble, // Ensemble methods
  dataset, // Built-in datasets
  modelSelection, // Train/test split, cross-validation
  metrics, // Evaluation metrics
  preprocessing, // Data preprocessing
} from '@saltcorn/smartcore-js'
```

### 2. Load or Prepare Data

```typescript
// Option 1: Use built-in datasets
const [x, y] = dataset.loadIris({ returnXY: true })

// Option 2: Use your own data as arrays
const x = [
  [1, 2],
  [3, 4],
  [5, 6],
]
const y = [0, 1, 0]

// Option 3: Use DataFrame for complex data
import { dataFrame } from '@saltcorn/smartcore-js'
const df = new dataFrame.DataFrame(yourData)
```

### 3. Split Data (Optional but Recommended)

```typescript
const [xTrain, xTest, yTrain, yTest] = modelSelection.trainTestSplit(x, y, { testSize: 0.3, randomState: 42 })
```

### 4. Create and Configure Model

```typescript
// Simple instantiation with defaults
const model = new linearModel.LinearRegression()

// Or with custom parameters
const model = new ensemble.RandomForestClassifier({
  nTrees: 100,
  maxDepth: 10,
  minSamplesSplit: 2,
})
```

### 5. Train the Model

```typescript
model.fit(xTrain, yTrain)
```

### 6. Make Predictions

```typescript
const predictions = model.predict(xTest)
```

### 7. Evaluate Performance

```typescript
// Classification metrics
const accuracy = metrics.accuracyScore(yTest, predictions)
const precision = metrics.precisionScore(yTest, predictions)
const recall = metrics.recallScore(yTest, predictions)
const f1 = metrics.f1Score(yTest, predictions)

// Regression metrics
const mse = metrics.meanSquaredErrorScore(yTest, predictions)
const mae = metrics.meanAbsoluteErrorScore(yTest, predictions)
const r2 = metrics.r2Score(yTest, predictions)
```

### 8. Save Model (Optional)

```typescript
// Serialize model to Buffer
const modelData = model.serialize()

// Save to file
import fs from 'fs'
fs.writeFileSync('model.bin', modelData)

// Later, load the model
const loadedData = fs.readFileSync('model.bin')
const loadedModel = linearModel.LinearRegression.deserialize(loadedData)
```

## Built-in Datasets

SmartCore-JS includes several classic datasets for learning and experimentation:

### Iris Dataset

```typescript
const [x, y] = dataset.loadIris({ returnXY: true })
// Classification: 150 samples, 4 features, 3 classes
// Features: sepal length, sepal width, petal length, petal width
```

### Boston Housing Dataset

```typescript
const [x, y] = dataset.loadBoston({ returnXY: true })
// Regression: 506 samples, 13 features
// Target: Median house value
```

### Breast Cancer Dataset

```typescript
const [x, y] = dataset.loadBreastCancer({ returnXY: true })
// Classification: 569 samples, 30 features, 2 classes
// Binary classification: malignant or benign
```

### Diabetes Dataset

```typescript
const [x, y] = dataset.loadDiabetes({ returnXY: true })
// Regression: 442 samples, 10 features
// Target: Disease progression
```

### Digits Dataset

```typescript
const [x, y] = dataset.loadDigits({ returnXY: true })
// Classification: 1797 samples, 64 features, 10 classes
// Handwritten digit recognition (0-9)
```

## Synthetic Data Generators

Create synthetic datasets for testing and experimentation:

### Make Blobs

```typescript
const [x, y] = dataset.makeBlobs({
  numSamples: 100,
  numFeatures: 2,
  numCenters: 3,
  returnXY: true,
})
// Creates clustered data
```

### Make Circles

```typescript
const [x, y] = dataset.makeCircles({
  numSamples: 100,
  factor: 0.5,
  noise: 0.1,
  returnXY: true,
})
// Creates circular decision boundary
```

### Make Moons

```typescript
const [x, y] = dataset.makeMoons({
  numSamples: 100,
  noise: 0.1,
  returnXY: true,
})
// Creates interleaving half circles
```

## TypeScript Support

SmartCore-JS is written in TypeScript and provides full type definitions:

```typescript
import { linearModel, type XType, type YType } from '@saltcorn/smartcore-js'

// Types are automatically inferred
const model: linearModel.LinearRegression = new linearModel.LinearRegression()

// Explicit typing
const x: XType = [
  [1, 2],
  [3, 4],
]
const y: YType = new Float64Array([0, 1])

model.fit(x, y)
const predictions: YType = model.predict(x)
```

## Common Patterns

### Pattern 1: Model Comparison

```typescript
function compareModels(models: Array<{ name: string; model: any }>, x, y) {
  const [xTrain, xTest, yTrain, yTest] = modelSelection.trainTestSplit(x, y, { testSize: 0.3 })

  const results = []

  for (const { name, model } of models) {
    model.fit(xTrain, yTrain)
    const pred = model.predict(xTest)
    const score = metrics.accuracyScore(yTest, pred)
    results.push({ name, score })
  }

  return results.sort((a, b) => b.score - a.score)
}
```

### Pattern 2: Feature Scaling

```typescript
import { preprocessing } from '@saltcorn/smartcore-js'

// Create scaler
const scaler = new preprocessing.StandardScaler()

// Fit on training data
scaler.fit(xTrain)

// Transform both train and test
const xTrainScaled = scaler.transform(xTrain)
const xTestScaled = scaler.transform(xTest)

// Use scaled data for training
model.fit(xTrainScaled, yTrain)
```

### Pattern 3: Pipeline for Cleaner Code

```typescript
import { pipeline, preprocessing, linearModel } from '@saltcorn/smartcore-js'

// Create pipeline
const pipe = pipeline.makePipeline([new preprocessing.StandardScaler(), new linearModel.LogisticRegression()])

// Fit and predict in one go
pipe.fit(xTrain, yTrain)
const predictions = pipe.predict(xTest)
```

## Next Steps

Now that you've learned the basics, explore these topics:

1. **[Core Concepts →](./02-core-concepts.md)** - Understand the fundamental concepts
2. **[DataFrame Guide →](./03-dataframe.md)** - Learn about advanced data handling
3. **[Linear Models →](./04-linear-models.md)** - Deep dive into linear algorithms
4. **[Examples →](../examples/README.md)** - See more practical examples

## Troubleshooting

### Import Errors

If you encounter import errors:

```typescript
// ✅ Correct - Named imports
import { linearModel, dataset } from '@saltcorn/smartcore-js'

// ❌ Incorrect - Default import
import smartcore from '@saltcorn/smartcore-js'
```

### Type Errors

If TypeScript complains about types:

```typescript
// Ensure y is a typed array or number array
const y = [1, 2, 3] // ✅ OK
const y = ['a', 'b', 'c'] // ❌ Wrong - must be numeric
```

### Performance Issues

For large datasets:

- Use native typed arrays (`Float64Array`, `Float32Array`) instead of regular arrays
- Consider using pipelines to avoid redundant transformations
- Use appropriate data types for your use case

## Getting Help

- **Documentation**: You're reading it!
- **GitHub Issues**: [Report bugs or request features](https://github.com/saltcorn/smartcore-js/issues)
- **Examples**: Check the [examples directory](../examples/README.md)

---

**Next**: [Core Concepts →](./02-core-concepts.md)
