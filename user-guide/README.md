# SmartCore-JS User Guide

Complete guide to using SmartCore-JS for machine learning in Node.js.

## Getting Started

- **[01. Getting Started](./01-getting-started.md)** - Installation, quick start, and basic workflow
- **[02. Core Concepts](./02-core-concepts.md)** - Estimators, predictors, transformers, and API design
- **[03. DataFrame](./03-dataframe.md)** - Working with structured data

## Algorithms

### Supervised Learning

#### Linear Models

- **[04. Linear Models](./04-linear-models.md)** - LinearRegression, LogisticRegression, Ridge, Lasso, ElasticNet

#### Tree-Based Models

- **[05. Tree Models](./05-tree-models.md)** - Decision trees for classification and regression
- **[09. Ensemble Methods](./09-ensemble.md)** - Random forests and extra trees

#### Other Classifiers

- **[06. Support Vector Machines](./06-svm.md)** - SVC and SVR
- **[07. Naive Bayes](./07-naive-bayes.md)** - Gaussian, Multinomial, Bernoulli, Categorical
- **[08. K-Nearest Neighbors](./08-neighbors.md)** - KNN for classification and regression

### Unsupervised Learning

- **[10. Clustering](./10-clustering.md)** - K-Means and DBSCAN
- **[11. Decomposition](./11-decomposition.md)** - PCA and SVD for dimensionality reduction

## Utilities & Tools

- **[12. Preprocessing](./12-preprocessing.md)** - StandardScaler, OneHotEncoder
- **[13. Metrics](./13-metrics.md)** - Evaluation metrics for classification and regression
- **[14. Model Selection](./14-model-selection.md)** - Train-test split and cross-validation
- **[15. Pipelines](./15-pipelines.md)** - Chaining transformers and estimators
- **[16. Serialization](./16-serialization.md)** - Saving and loading models

## Learning Path

### Beginner

1. Start with [Getting Started](./01-getting-started.md)
2. Understand [Core Concepts](./02-core-concepts.md)
3. Learn [Linear Models](./04-linear-models.md)
4. Master [Metrics](./13-metrics.md)

### Intermediate

1. Explore [DataFrames](./03-dataframe.md)
2. Try [Ensemble Methods](./09-ensemble.md)
3. Learn [Preprocessing](./12-preprocessing.md)
4. Use [Pipelines](./15-pipelines.md)

### Advanced

1. Master [Model Selection](./14-model-selection.md)
2. Explore all algorithm types
3. Learn [Serialization](./16-serialization.md)
4. Build production systems

## Quick Reference

### Common Tasks

**Classification:**

```typescript
import { linearModel, dataset, modelSelection, metrics } from '@saltcorn/smartcore-js'

const [x, y] = dataset.loadIris({ returnXY: true })
const [xTrain, xTest, yTrain, yTest] = modelSelection.trainTestSplit(x, y)

const model = new linearModel.LogisticRegression()
model.fit(xTrain, yTrain)
const accuracy = metrics.accuracyScore(yTest, model.predict(xTest))
```

**Regression:**

```typescript
import { linearModel, dataset } from '@saltcorn/smartcore-js'

const [x, y] = dataset.loadBoston({ returnXY: true })
const model = new linearModel.LinearRegression()
model.fit(x, y)
```

**Pipeline:**

```typescript
import { pipeline, preprocessing, ensemble } from '@saltcorn/smartcore-js'

const pipe = pipeline.makePipeline([new preprocessing.StandardScaler(), new ensemble.RandomForestClassifier()])
pipe.fit(xTrain, yTrain)
```

## Additional Resources

- [Main Documentation](../README.md)
- [API Reference](../api-reference/README.md)
- [Examples](../examples/README.md)
- [GitHub Repository](https://github.com/saltcorn/smartcore-js)

---

**Next**: Choose a guide based on your needs, or start with [Getting Started](./01-getting-started.md)
