# Matrix Decomposition

Dimensionality reduction techniques for feature extraction and visualization.

## Principal Component Analysis (PCA)

Reduce dimensions while preserving variance.

```typescript
import { decomposition, dataset, preprocessing, pipeline } from '@saltcorn/smartcore-js'

const [x] = dataset.loadDigits({ returnXY: true })

const pipe = pipeline.makePipeline([
  new preprocessing.StandardScaler(),
  new decomposition.PCA({ nComponents: 2 }), // Reduce to 2 dimensions
])

pipe.fit(x)
const reduced = pipe.transform(x)
console.log('Original shape:', [x.length, x[0].length])
console.log('Reduced shape:', [reduced.length, reduced[0].length])
```

**Parameters:**

- `nComponents`: Number of components to keep
- `columns`: Specific columns to use (for DataFrames)

**Use Cases:**

- Visualization (reduce to 2-3 dimensions)
- Feature extraction
- Noise reduction
- Speeding up training

## Singular Value Decomposition (SVD)

Matrix factorization technique.

```typescript
const svd = new decomposition.SVD({ nComponents: 10 })
svd.fit(x)
const transformed = svd.transform(x)
```

**Similar to PCA but:**

- More numerically stable
- Works with sparse matrices
- No mean centering required

## Complete Example

```typescript
import {
  decomposition,
  preprocessing,
  pipeline,
  ensemble,
  dataset,
  modelSelection,
  metrics,
} from '@saltcorn/smartcore-js'

const [x, y] = dataset.loadBreastCancer({ returnXY: true })
const [xTrain, xTest, yTrain, yTest] = modelSelection.trainTestSplit(x, y)

// Pipeline with PCA for dimensionality reduction
const pipe = pipeline.makePipeline([
  new preprocessing.StandardScaler(),
  new decomposition.PCA({ nComponents: 15 }), // Reduce from 30 to 15
  new ensemble.RandomForestClassifier(),
])

pipe.fit(xTrain, yTrain)
const predictions = pipe.predict(xTest)
const accuracy = metrics.accuracyScore(yTest, predictions)
console.log(`Accuracy with PCA: ${(accuracy * 100).toFixed(2)}%`)
```

## Choosing Number of Components

```typescript
// Try different numbers of components
const nComponentsOptions = [5, 10, 15, 20]

for (const nComponents of nComponentsOptions) {
  const pipe = pipeline.makePipeline([
    new preprocessing.StandardScaler(),
    new decomposition.PCA({ nComponents }),
    new ensemble.RandomForestClassifier(),
  ])

  pipe.fit(xTrain, yTrain)
  const score = metrics.accuracyScore(yTest, pipe.predict(xTest))
  console.log(`Components: ${nComponents}, Accuracy: ${(score * 100).toFixed(2)}%`)
}
```

---

**Previous**: [Clustering ←](./10-clustering.md) | **Next**: [Preprocessing →](./12-preprocessing.md)
