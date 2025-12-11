# Naive Bayes Classifiers

Naive Bayes classifiers are probabilistic classifiers based on Bayes' theorem with strong independence assumptions.

## Available Classifiers

### Gaussian Naive Bayes

Assumes features follow a Gaussian (normal) distribution.

```typescript
import { naiveBayes, dataset, modelSelection, metrics } from '@saltcorn/smartcore-js'

const [x, y] = dataset.loadIris({ returnXY: true })
const [xTrain, xTest, yTrain, yTest] = modelSelection.trainTestSplit(x, y)

const model = new naiveBayes.GaussianNB()
model.fit(xTrain, yTrain)

const predictions = model.predict(xTest)
const accuracy = metrics.accuracyScore(yTest, predictions)
console.log(`Accuracy: ${(accuracy * 100).toFixed(2)}%`)
```

**Best for:** Continuous features with Gaussian distribution

### Multinomial Naive Bayes

For discrete features (e.g., word counts, frequencies).

```typescript
const model = new naiveBayes.MultinomialNB({
  alpha: 1.0, // Smoothing parameter
})
model.fit(xTrain, yTrain)
const predictions = model.predict(xTest)
```

**Best for:** Text classification, document categorization

### Bernoulli Naive Bayes

For binary/boolean features.

```typescript
const model = new naiveBayes.BernoulliNB({
  alpha: 1.0,
})
model.fit(xTrain, yTrain)
const predictions = model.predict(xTest)
```

**Best for:** Binary feature data, presence/absence features

### Categorical Naive Bayes

For categorical features.

```typescript
const model = new naiveBayes.CategoricalNB()
model.fit(xTrain, yTrain)
const predictions = model.predict(xTest)
```

**Best for:** Categorical data, discrete features

## Advantages & Limitations

✅ **Advantages:**

- Fast training and prediction
- Works well with small datasets
- Handles high-dimensional data
- Simple and interpretable
- Good for text classification

❌ **Limitations:**

- Assumes feature independence (rarely true)
- Can be outperformed by more sophisticated models
- Sensitive to feature distribution assumptions

## Complete Example

```typescript
import { naiveBayes, preprocessing, pipeline, dataset, modelSelection, metrics } from '@saltcorn/smartcore-js'

const [x, y] = dataset.loadBreastCancer({ returnXY: true })
const [xTrain, xTest, yTrain, yTest] = modelSelection.trainTestSplit(x, y, { testSize: 0.3 })

// Pipeline with scaling
const pipe = pipeline.makePipeline([new preprocessing.StandardScaler(), new naiveBayes.GaussianNB()])

pipe.fit(xTrain, yTrain)
const predictions = pipe.predict(xTest)

console.log('Accuracy:', metrics.accuracyScore(yTest, predictions).toFixed(4))
console.log('Precision:', metrics.precisionScore(yTest, predictions).toFixed(4))
console.log('Recall:', metrics.recallScore(yTest, predictions).toFixed(4))
```

## Model Serialization

```typescript
const serialized = model.serialize()
fs.writeFileSync('naive_bayes.bin', serialized)

const loaded = fs.readFileSync('naive_bayes.bin')
const restoredModel = naiveBayes.GaussianNB.deserialize(loaded)
```

---

**Previous**: [Support Vector Machines ←](./06-svm.md) | **Next**: [K-Nearest Neighbors →](./08-neighbors.md)
