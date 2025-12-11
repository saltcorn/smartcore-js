# Preprocessing

Data preprocessing transforms raw data into a format suitable for machine learning models.

## StandardScaler

Standardize features by removing mean and scaling to unit variance.

```typescript
import { preprocessing, dataset } from '@saltcorn/smartcore-js'

const [x, y] = dataset.loadIris({ returnXY: true })

const scaler = new preprocessing.StandardScaler()
scaler.fit(xTrain)

const xTrainScaled = scaler.transform(xTrain)
const xTestScaled = scaler.transform(xTest)
```

**Formula:** `z = (x - mean) / std`

**When to use:**

- Before SVM, KNN, neural networks
- When features have different scales
- For gradient-based optimizers

## OneHotEncoder

Encode categorical features as one-hot vectors.

```typescript
const encoder = new preprocessing.OneHotEncoder({
  catIdx: new BigUint64Array([0, 2]), // Columns 0 and 2 are categorical
})
encoder.fit(xTrain)
const xTrainEncoded = encoder.transform(xTrain)
const xTestEncoded = encoder.transform(xTest)
```

**When to use:**

- Categorical features
- Non-ordinal categories
- Before tree-based models (optional)

## With DataFrames

```typescript
import { dataFrame, preprocessing } from '@saltcorn/smartcore-js'

const df = new dataFrame.DataFrame(data)

// Scale specific columns
const scaler = new preprocessing.StandardScaler({
  columns: ['age', 'income', 'score'],
})
scaler.fit(df)
const scaledDf = scaler.transform(df) // Returns DataFrame
```

## In Pipelines

```typescript
import { pipeline, preprocessing, linearModel } from '@saltcorn/smartcore-js'

const pipe = pipeline.makePipeline([
  new preprocessing.StandardScaler(),
  new preprocessing.OneHotEncoder({ catIdx: new BigUint64Array([]) }),
  new linearModel.LogisticRegression(),
])

pipe.fit(xTrain, yTrain)
const predictions = pipe.predict(xTest)
```

## Best Practices

1. **Fit on training data only**: Prevent data leakage
2. **Use pipelines**: Ensure consistent preprocessing
3. **Scale before distance-based algorithms**: Essential for KNN, SVM
4. **Not always necessary**: Tree-based models don't require scaling

```typescript
// ✅ Correct - fit on train, transform both
scaler.fit(xTrain)
const xTrainScaled = scaler.transform(xTrain)
const xTestScaled = scaler.transform(xTest)

// ❌ Wrong - data leakage
scaler.fit(xTest) // Never fit on test!
```

---

**Previous**: [Decomposition ←](./11-decomposition.md) | **Next**: [Metrics →](./13-metrics.md)
