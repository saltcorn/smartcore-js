# Linear Models

Linear models are fundamental machine learning algorithms that model relationships between features and targets using linear functions.

## Table of Contents

- [Overview](#overview)
- [Linear Regression](#linear-regression)
- [Logistic Regression](#logistic-regression)
- [Ridge Regression](#ridge-regression)
- [Lasso Regression](#lasso-regression)
- [Elastic Net](#elastic-net)
- [Choosing the Right Model](#choosing-the-right-model)

## Overview

SmartCore-JS provides several linear models for both regression and classification tasks:

| Model              | Type           | Use Case                          | Regularization |
| ------------------ | -------------- | --------------------------------- | -------------- |
| LinearRegression   | Regression     | Predicting continuous values      | None           |
| LogisticRegression | Classification | Binary/multiclass classification  | L2 (optional)  |
| RidgeRegression    | Regression     | Regression with multicollinearity | L2 (Ridge)     |
| Lasso              | Regression     | Feature selection, sparse models  | L1 (Lasso)     |
| ElasticNet         | Regression     | Combined L1 + L2 benefits         | L1 + L2        |

## Linear Regression

Ordinary Least Squares (OLS) regression for predicting continuous values.

### Basic Usage

```typescript
import { linearModel, dataset, modelSelection, metrics } from '@saltcorn/smartcore-js'

// Load data
const [x, y] = dataset.loadBoston({ returnXY: true })

// Split data
const [xTrain, xTest, yTrain, yTest] = modelSelection.trainTestSplit(x, y, { testSize: 0.3 })

// Create and train model
const model = new linearModel.LinearRegression()
model.fit(xTrain, yTrain)

// Predict
const predictions = model.predict(xTest)

// Evaluate
const r2 = metrics.r2Score(yTest, predictions)
const mse = metrics.meanSquaredErrorScore(yTest, predictions)
const mae = metrics.meanAbsoluteErrorScore(yTest, predictions)

console.log(`R² Score: ${r2.toFixed(4)}`)
console.log(`MSE: ${mse.toFixed(4)}`)
console.log(`MAE: ${mae.toFixed(4)}`)
```

### Parameters

```typescript
interface ILinearRegressionParameters {
  solver?: 'SVD' | 'QR' // Solver algorithm
  fitDataXType?: 'F32' | 'F64' // Input data type
  fitDataYType?: 'F32' | 'F64' // Target data type
  columns?: string[] // Column selection for DataFrames
}

// Example with custom parameters
const model = new linearModel.LinearRegression({
  solver: 'QR',
  fitDataXType: 'F64',
  fitDataYType: 'F64',
})
```

### Solver Options

- **SVD** (Singular Value Decomposition): More stable, handles rank-deficient matrices
- **QR** (QR Decomposition): Faster, good for well-conditioned matrices

### When to Use

✅ **Good for:**

- Simple linear relationships
- Interpretable coefficients needed
- Baseline model
- Fast training required

❌ **Not ideal for:**

- Highly correlated features (use Ridge instead)
- Non-linear relationships
- Outliers heavily influence results

### Complete Example

```typescript
import { linearModel, dataset, preprocessing, pipeline } from '@saltcorn/smartcore-js'

// Load and prepare data
const [x, y] = dataset.loadDiabetes({ returnXY: true })
const [xTrain, xTest, yTrain, yTest] = modelSelection.trainTestSplit(x, y)

// Create pipeline with scaling
const pipe = pipeline.makePipeline([
  new preprocessing.StandardScaler(),
  new linearModel.LinearRegression({ solver: 'QR' }),
])

// Train
pipe.fit(xTrain, yTrain)

// Evaluate
const trainPred = pipe.predict(xTrain)
const testPred = pipe.predict(xTest)

console.log('Training R²:', metrics.r2Score(yTrain, trainPred).toFixed(4))
console.log('Test R²:', metrics.r2Score(yTest, testPred).toFixed(4))
```

## Logistic Regression

Classification algorithm for binary and multiclass problems.

### Basic Usage

```typescript
import { linearModel, dataset, metrics } from '@saltcorn/smartcore-js'

// Load data
const [x, y] = dataset.loadIris({ returnXY: true })
const [xTrain, xTest, yTrain, yTest] = modelSelection.trainTestSplit(x, y)

// Create and train model
const model = new linearModel.LogisticRegression()
model.fit(xTrain, yTrain)

// Predict
const predictions = model.predict(xTest)

// Evaluate
const accuracy = metrics.accuracyScore(yTest, predictions)
const precision = metrics.precisionScore(yTest, predictions)
const recall = metrics.recallScore(yTest, predictions)
const f1 = metrics.f1Score(yTest, predictions)

console.log(`Accuracy: ${(accuracy * 100).toFixed(2)}%`)
console.log(`Precision: ${precision.toFixed(4)}`)
console.log(`Recall: ${recall.toFixed(4)}`)
console.log(`F1 Score: ${f1.toFixed(4)}`)
```

### Parameters

```typescript
interface ILogisticRegressionParameters {
  alpha?: number // Regularization parameter (default: 0.0)
  fitIntercept?: boolean // Whether to fit intercept (default: true)
  maxIterations?: number // Maximum optimization iterations (default: 100)
  fitDataXType?: 'F32' | 'F64'
  fitDataYType?: 'F32' | 'F64'
  columns?: string[]
}

// Example with regularization
const model = new linearModel.LogisticRegression({
  alpha: 0.1, // L2 regularization
  maxIterations: 200,
  fitIntercept: true,
})
```

### Regularization

The `alpha` parameter controls L2 regularization:

- `alpha = 0`: No regularization (standard logistic regression)
- `alpha > 0`: L2 penalty, helps prevent overfitting
- Higher alpha = stronger regularization

### Binary Classification Example

```typescript
// Breast cancer detection
const [x, y] = dataset.loadBreastCancer({ returnXY: true })
const [xTrain, xTest, yTrain, yTest] = modelSelection.trainTestSplit(x, y, {
  testSize: 0.2,
  randomState: 42,
})

const model = new linearModel.LogisticRegression({ alpha: 0.01 })
model.fit(xTrain, yTrain)

const predictions = model.predict(xTest)
const accuracy = metrics.accuracyScore(yTest, predictions)

console.log(`Binary Classification Accuracy: ${(accuracy * 100).toFixed(2)}%`)
```

### Multiclass Classification Example

```typescript
// Digit recognition
const [x, y] = dataset.loadDigits({ returnXY: true })
const [xTrain, xTest, yTrain, yTest] = modelSelection.trainTestSplit(x, y)

const model = new linearModel.LogisticRegression({
  alpha: 0.05,
  maxIterations: 500,
})
model.fit(xTrain, yTrain)

const predictions = model.predict(xTest)
const accuracy = metrics.accuracyScore(yTest, predictions)

console.log(`Multiclass Accuracy: ${(accuracy * 100).toFixed(2)}%`)
```

## Ridge Regression

Linear regression with L2 regularization, ideal for handling multicollinearity.

### Basic Usage

```typescript
import { linearModel } from '@saltcorn/smartcore-js'

const model = new linearModel.RidgeRegression()
model.fit(xTrain, yTrain)
const predictions = model.predict(xTest)
```

### Parameters

```typescript
interface IRidgeRegressionParameters {
  alpha?: number // Regularization strength (default: 1.0)
  solver?: 'Cholesky' | 'SVD' // Solver algorithm
  normalize?: boolean // Whether to normalize features
  fitDataXType?: 'F32' | 'F64'
  fitDataYType?: 'F32' | 'F64'
  columns?: string[]
}

// Example with custom alpha
const model = new linearModel.RidgeRegression({
  alpha: 0.5,
  solver: 'SVD',
  normalize: true,
})
```

### How Ridge Works

Ridge adds a penalty term to the loss function:

```
Loss = MSE + alpha * sum(coefficients²)
```

- **alpha = 0**: Equivalent to Linear Regression
- **alpha > 0**: Shrinks coefficients toward zero
- **Higher alpha**: Stronger regularization, smaller coefficients

### When to Use Ridge

✅ **Good for:**

- Highly correlated features
- More features than observations
- Preventing overfitting
- All features potentially relevant

❌ **Not ideal for:**

- Feature selection (use Lasso instead)
- Truly sparse models

### Complete Example

```typescript
// Compare different alpha values
const alphas = [0.01, 0.1, 1.0, 10.0, 100.0]
const results = []

for (const alpha of alphas) {
  const model = new linearModel.RidgeRegression({ alpha })
  model.fit(xTrain, yTrain)

  const trainPred = model.predict(xTrain)
  const testPred = model.predict(xTest)

  const trainR2 = metrics.r2Score(yTrain, trainPred)
  const testR2 = metrics.r2Score(yTest, testPred)

  results.push({ alpha, trainR2, testR2 })
  console.log(`Alpha ${alpha}: Train R²=${trainR2.toFixed(4)}, Test R²=${testR2.toFixed(4)}`)
}

// Find best alpha
const best = results.reduce((a, b) => (a.testR2 > b.testR2 ? a : b))
console.log(`Best alpha: ${best.alpha}`)
```

## Lasso Regression

Linear regression with L1 regularization, performs automatic feature selection.

### Basic Usage

```typescript
import { linearModel } from '@saltcorn/smartcore-js'

const model = new linearModel.Lasso()
model.fit(xTrain, yTrain)
const predictions = model.predict(xTest)
```

### Parameters

```typescript
interface ILassoParameters {
  alpha?: number // Regularization strength (default: 1.0)
  normalize?: boolean // Whether to normalize features
  maxIterations?: number // Maximum iterations (default: 1000)
  tolerance?: number // Convergence tolerance (default: 0.0001)
  fitDataXType?: 'F32' | 'F64'
  fitDataYType?: 'F32' | 'F64'
  columns?: string[]
}

const model = new linearModel.Lasso({
  alpha: 0.1,
  normalize: true,
  maxIterations: 2000,
})
```

### How Lasso Works

Lasso adds an L1 penalty:

```
Loss = MSE + alpha * sum(|coefficients|)
```

**Key difference from Ridge:**

- Lasso can set coefficients exactly to zero
- Performs automatic feature selection
- Results in sparse models

### Feature Selection with Lasso

```typescript
// Use Lasso for feature selection
const model = new linearModel.Lasso({ alpha: 0.1 })
model.fit(xTrain, yTrain)

// Features with non-zero coefficients are selected
// (Note: Coefficient extraction would require model inspection in actual use)
const predictions = model.predict(xTest)
const r2 = metrics.r2Score(yTest, predictions)

console.log(`Model R² with selected features: ${r2.toFixed(4)}`)
```

### When to Use Lasso

✅ **Good for:**

- Feature selection
- Sparse models (many irrelevant features)
- Interpretability with fewer features
- High-dimensional data

❌ **Not ideal for:**

- All features are relevant
- Grouped correlated features (may select only one)

## Elastic Net

Combines L1 (Lasso) and L2 (Ridge) regularization.

### Basic Usage

```typescript
import { linearModel } from '@saltcorn/smartcore-js'

const model = new linearModel.ElasticNet()
model.fit(xTrain, yTrain)
const predictions = model.predict(xTest)
```

### Parameters

```typescript
interface IElasticNetParameters {
  alpha?: number // Overall regularization strength (default: 1.0)
  l1Ratio?: number // Mix of L1 and L2 (default: 0.5)
  normalize?: boolean
  maxIterations?: number
  tolerance?: number
  fitDataXType?: 'F32' | 'F64'
  fitDataYType?: 'F32' | 'F64'
  columns?: string[]
}

const model = new linearModel.ElasticNet({
  alpha: 0.5,
  l1Ratio: 0.5, // 0.5 = equal mix of L1 and L2
})
```

### Understanding l1Ratio

```typescript
// l1Ratio controls the mix of regularization:

// l1Ratio = 0: Pure Ridge (L2 only)
const ridge = new linearModel.ElasticNet({ l1Ratio: 0 })

// l1Ratio = 1: Pure Lasso (L1 only)
const lasso = new linearModel.ElasticNet({ l1Ratio: 1 })

// l1Ratio = 0.5: Equal mix
const elastic = new linearModel.ElasticNet({ l1Ratio: 0.5 })
```

### When to Use Elastic Net

✅ **Good for:**

- Grouped correlated features
- Want both feature selection and coefficient shrinkage
- Lasso is too aggressive
- Ridge doesn't select features

### Complete Example

```typescript
// Grid search for best parameters
const alphas = [0.01, 0.1, 1.0]
const l1Ratios = [0.1, 0.5, 0.9]

let bestModel = null
let bestScore = -Infinity

for (const alpha of alphas) {
  for (const l1Ratio of l1Ratios) {
    const model = new linearModel.ElasticNet({ alpha, l1Ratio })
    model.fit(xTrain, yTrain)

    const testPred = model.predict(xTest)
    const r2 = metrics.r2Score(yTest, testPred)

    console.log(`alpha=${alpha}, l1Ratio=${l1Ratio}: R²=${r2.toFixed(4)}`)

    if (r2 > bestScore) {
      bestScore = r2
      bestModel = { alpha, l1Ratio, r2 }
    }
  }
}

console.log(`Best: alpha=${bestModel.alpha}, l1Ratio=${bestModel.l1Ratio}, R²=${bestModel.r2.toFixed(4)}`)
```

## Choosing the Right Model

### Decision Tree

```
1. Task Type?
   ├─ Classification → Logistic Regression
   └─ Regression → Continue to 2

2. Multicollinearity?
   ├─ Yes → Continue to 3
   └─ No → Linear Regression

3. Feature Selection Needed?
   ├─ Yes → Continue to 4
   └─ No → Ridge Regression

4. How Many Relevant Features?
   ├─ Few → Lasso
   ├─ Many → Ridge
   └─ Unknown → Elastic Net
```

### Comparison Table

| Scenario              | Recommended Model  | Why                         |
| --------------------- | ------------------ | --------------------------- |
| Simple baseline       | LinearRegression   | Fast, interpretable         |
| Binary classification | LogisticRegression | Standard for classification |
| Correlated features   | RidgeRegression    | Handles multicollinearity   |
| Feature selection     | Lasso              | Sets coefficients to zero   |
| Mixed requirements    | ElasticNet         | Combines benefits           |

### Practical Guidelines

**Use Linear Regression when:**

- Features are independent
- Simple relationships expected
- Need fast training
- Want interpretable baseline

**Use Logistic Regression when:**

- Classification task
- Need probability estimates
- Binary or multiclass labels

**Use Ridge Regression when:**

- Many correlated features
- All features likely relevant
- Overfitting is a concern
- Don't need feature selection

**Use Lasso when:**

- High-dimensional data
- Many irrelevant features
- Need sparse model
- Want automatic feature selection

**Use Elastic Net when:**

- Correlated feature groups
- Want both regularization and selection
- Lasso is too aggressive
- Not sure about feature relevance

## Model Persistence

All linear models support serialization:

```typescript
// Train and save
const model = new linearModel.LogisticRegression({ alpha: 0.1 })
model.fit(xTrain, yTrain)
const serialized = model.serialize()

// Save to file
import fs from 'fs'
fs.writeFileSync('logistic_model.bin', serialized)

// Load later
const loaded = fs.readFileSync('logistic_model.bin')
const restoredModel = linearModel.LogisticRegression.deserialize(loaded)
const predictions = restoredModel.predict(xTest)
```

## Best Practices

### 1. Always Scale Features

```typescript
import { preprocessing, pipeline } from '@saltcorn/smartcore-js'

// ✅ Good - scale features
const pipe = pipeline.makePipeline([
  new preprocessing.StandardScaler(),
  new linearModel.RidgeRegression({ alpha: 1.0 }),
])
```

### 2. Use Cross-Validation

```typescript
// Validate hyperparameters with cross-validation
const alphas = [0.001, 0.01, 0.1, 1.0, 10.0]

for (const alpha of alphas) {
  const model = new linearModel.Ridge({ alpha })
  // Perform cross-validation (simplified)
  const scores = []
  for (let fold = 0; fold < 5; fold++) {
    // Split, train, evaluate
    // scores.push(foldScore)
  }
  const avgScore = scores.reduce((a, b) => a + b) / scores.length
  console.log(`Alpha ${alpha}: Avg R² = ${avgScore.toFixed(4)}`)
}
```

### 3. Check for Overfitting

```typescript
// Compare train and test performance
model.fit(xTrain, yTrain)

const trainPred = model.predict(xTrain)
const testPred = model.predict(xTest)

const trainR2 = metrics.r2Score(yTrain, trainPred)
const testR2 = metrics.r2Score(yTest, testPred)

console.log(`Train R²: ${trainR2.toFixed(4)}`)
console.log(`Test R²: ${testR2.toFixed(4)}`)

if (trainR2 - testR2 > 0.1) {
  console.log('⚠️ Possible overfitting - consider regularization')
}
```

### 4. Handle Missing Values

```typescript
// Remove or impute missing values before training
const cleanData = data.filter((row) => !row.includes(NaN))
```

## Summary

**Key Takeaways:**

- **LinearRegression**: Simple, fast, no regularization
- **LogisticRegression**: Classification, supports regularization
- **Ridge**: L2 regularization, handles multicollinearity
- **Lasso**: L1 regularization, feature selection
- **ElasticNet**: L1 + L2, flexible regularization
- Always scale features for regularized models
- Use cross-validation for hyperparameter tuning
- Check for overfitting on test set

---

**Previous**: [DataFrame →](./03-dataframe.md) | **Next**: [Tree Models →](./05-tree-models.md)
