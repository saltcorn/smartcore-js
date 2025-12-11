# Support Vector Machines

Support Vector Machines (SVM) are powerful supervised learning algorithms for classification and regression.

## Support Vector Classifier (SVC)

Classification using support vector machines.

```typescript
import { svm, dataset, modelSelection, metrics, preprocessing, pipeline } from '@saltcorn/smartcore-js'

const [x, y] = dataset.loadIris({ returnXY: true })
const [xTrain, xTest, yTrain, yTest] = modelSelection.trainTestSplit(x, y)

// SVM works best with scaled features
const pipe = pipeline.makePipeline([
  new preprocessing.StandardScaler(),
  new svm.SVC({
    kernel: 'rbf', // 'linear', 'rbf', 'poly', 'sigmoid'
    c: 1.0, // Regularization parameter
  }),
])

pipe.fit(xTrain, yTrain)
const predictions = pipe.predict(xTest)
const accuracy = metrics.accuracyScore(yTest, predictions)
console.log(`Accuracy: ${(accuracy * 100).toFixed(2)}%`)
```

**Key Parameters:**

- `kernel`: Kernel type ('linear', 'rbf', 'poly', 'sigmoid')
- `c`: Regularization parameter (smaller = more regularization)
- `gamma`: Kernel coefficient (for 'rbf', 'poly', 'sigmoid')
- `degree`: Degree of polynomial kernel

## Support Vector Regressor (SVR)

Regression using support vector machines.

```typescript
import { svm, dataset } from '@saltcorn/smartcore-js'

const [x, y] = dataset.loadBoston({ returnXY: true })
const [xTrain, xTest, yTrain, yTest] = modelSelection.trainTestSplit(x, y)

const pipe = pipeline.makePipeline([
  new preprocessing.StandardScaler(),
  new svm.SVR({
    kernel: 'rbf',
    c: 1.0,
    epsilon: 0.1, // Epsilon-tube within predictions
  }),
])

pipe.fit(xTrain, yTrain)
const predictions = pipe.predict(xTest)
const r2 = metrics.r2Score(yTest, predictions)
console.log(`R² Score: ${r2.toFixed(4)}`)
```

## Kernel Functions

Different kernels for different data patterns:

**Linear**: For linearly separable data

```typescript
new svm.SVC({ kernel: 'linear' })
```

**RBF (Radial Basis Function)**: General purpose, works well for non-linear data

```typescript
new svm.SVC({ kernel: 'rbf', gamma: 'scale' })
```

**Polynomial**: For polynomial decision boundaries

```typescript
new svm.SVC({ kernel: 'poly', degree: 3 })
```

**Sigmoid**: Sigmoid function kernel

```typescript
new svm.SVC({ kernel: 'sigmoid' })
```

## When to Use SVM

✅ **Good for:**

- High-dimensional data
- Clear margin of separation
- Non-linear decision boundaries (with RBF kernel)
- Binary and multiclass classification

❌ **Not ideal for:**

- Very large datasets (slow training)
- Noisy data with overlapping classes
- When probabilities are needed

## Best Practices

1. **Always scale features**: SVM is sensitive to feature scales
2. **Start with RBF kernel**: Good default choice
3. **Tune C and gamma**: Use cross-validation
4. **Use pipelines**: Ensure consistent preprocessing

```typescript
// Complete example with scaling
import { svm, preprocessing, pipeline } from '@saltcorn/smartcore-js'

const pipe = pipeline.makePipeline([
  new preprocessing.StandardScaler(), // Essential for SVM!
  new svm.SVC({ kernel: 'rbf', c: 1.0 }),
])

pipe.fit(xTrain, yTrain)
const predictions = pipe.predict(xTest)
```

## Model Serialization

```typescript
// Save SVM model
const serialized = model.serialize()
fs.writeFileSync('svm_model.bin', serialized)

// Load model
const loaded = fs.readFileSync('svm_model.bin')
const restoredModel = svm.SVC.deserialize(loaded)
```

---

**Previous**: [Tree Models ←](./05-tree-models.md) | **Next**: [Naive Bayes →](./07-naive-bayes.md)
