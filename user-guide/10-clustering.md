# Clustering Algorithms

Unsupervised learning algorithms for grouping similar data points.

## K-Means Clustering

Partition data into k clusters.

```typescript
import { cluster, dataset, preprocessing, pipeline } from '@saltcorn/smartcore-js'

const [x] = dataset.loadIris({ returnXY: true })

const pipe = pipeline.makePipeline([
  new preprocessing.StandardScaler(),
  new cluster.KMeans({ k: 3 }), // 3 clusters
])

pipe.fit(x) // No y needed for clustering
const clusterLabels = pipe.predict(x)
console.log('Cluster assignments:', clusterLabels)
```

**Parameters:**

- `k`: Number of clusters
- `maxIterations`: Maximum iterations (default: 100)
- `tolerance`: Convergence threshold

## DBSCAN

Density-based clustering.

```typescript
const model = new cluster.DBSCAN({
  eps: 0.5, // Maximum distance between points
  minSamples: 5, // Minimum points to form cluster
})
model.fit(x)
const labels = model.predict(x)
```

**Parameters:**

- `eps`: Maximum distance for neighborhood
- `minSamples`: Minimum samples in neighborhood

**Advantages:**

- Finds clusters of arbitrary shape
- Identifies outliers
- No need to specify number of clusters

## Example with Evaluation

```typescript
import { cluster, metrics, preprocessing, pipeline } from '@saltcorn/smartcore-js'

const pipe = pipeline.makePipeline([new preprocessing.StandardScaler(), new cluster.KMeans({ k: 3 })])

pipe.fit(x)
const predictions = pipe.predict(x)

// Evaluate clustering quality (if ground truth available)
if (yTrue) {
  const score = metrics.hcvScore(yTrue, predictions)
  console.log('HCV Score:', score.toFixed(4))
}
```

---

**Previous**: [Ensemble Methods ←](./09-ensemble.md) | **Next**: [Decomposition →](./11-decomposition.md)
