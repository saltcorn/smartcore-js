# SmartCore-JS Documentation

Welcome to the comprehensive documentation for **SmartCore-JS**, a powerful machine learning library for Node.js that brings the performance of Rust's SmartCore to the JavaScript ecosystem.

## Table of Contents

### Getting Started

- [Installation and Quick Start](./user-guide/01-getting-started.md)
- [Core Concepts](./user-guide/02-core-concepts.md)
- [Data Handling with DataFrame](./user-guide/03-dataframe.md)

### User Guide

- **Supervised Learning**
  - [Linear Models](./user-guide/04-linear-models.md)
  - [Tree-Based Models](./user-guide/05-tree-models.md)
  - [Support Vector Machines](./user-guide/06-svm.md)
  - [Naive Bayes Classifiers](./user-guide/07-naive-bayes.md)
  - [K-Nearest Neighbors](./user-guide/08-neighbors.md)
  - [Ensemble Methods](./user-guide/09-ensemble.md)

- **Unsupervised Learning**
  - [Clustering Algorithms](./user-guide/10-clustering.md)
  - [Matrix Decomposition](./user-guide/11-decomposition.md)

- **Data Preprocessing**
  - [Scaling and Encoding](./user-guide/12-preprocessing.md)

- **Model Evaluation**
  - [Metrics](./user-guide/13-metrics.md)
  - [Model Selection](./user-guide/14-model-selection.md)

- **Advanced Topics**
  - [Pipelines](./user-guide/15-pipelines.md)
  - [Model Persistence](./user-guide/16-serialization.md)

### API Reference

- [Complete API Documentation](./api-reference/README.md)

### Examples

- [Practical Examples](./examples/README.md)

### Tutorials

- [End-to-End Tutorials](./tutorials/README.md)

## What is SmartCore-JS?

SmartCore-JS is a Node.js machine learning library that provides:

- **High Performance**: Built on top of Rust's SmartCore using NAPI-RS for native performance
- **Scikit-learn Compatible API**: Familiar interface for data scientists and ML engineers
- **TypeScript Support**: Full type definitions for better developer experience
- **Comprehensive Algorithms**: Wide range of supervised and unsupervised learning algorithms
- **DataFrame Support**: Flexible data handling with built-in DataFrame functionality
- **Pipeline System**: Chain transformers and estimators for efficient workflows

## Key Features

### 🚀 Performance

Native Rust implementation ensures fast computation for large datasets.

### 🔧 Easy to Use

Scikit-learn inspired API makes it simple to get started:

```typescript
import { linearModel, dataset } from '@saltcorn/smartcore-js'

const { LinearRegression } = linearModel
const { loadIris } = dataset

// Load data
const [x, y] = loadIris({ returnXY: true })

// Create and train model
const model = new LinearRegression()
model.fit(x, y)

// Make predictions
const predictions = model.predict(x)
```

### 🎯 Comprehensive

Wide range of algorithms covering:

- **Regression**: Linear, Ridge, Lasso, ElasticNet, SVR, Decision Trees, Random Forests
- **Classification**: Logistic Regression, SVC, Decision Trees, Random Forests, Naive Bayes, KNN
- **Clustering**: K-Means, DBSCAN
- **Dimensionality Reduction**: PCA, SVD
- **Preprocessing**: StandardScaler, OneHotEncoder

### 🔄 Pipelines

Chain multiple operations together:

```typescript
import { pipeline, preprocessing, linearModel } from '@saltcorn/smartcore-js'

const pipe = pipeline.makePipeline([new preprocessing.StandardScaler(), new linearModel.LogisticRegression()])

pipe.fit(x, y)
const predictions = pipe.predict(x)
```

### 💾 Model Persistence

Save and load trained models:

```typescript
// Save model
const serialized = model.serialize()

// Load model
const loadedModel = LinearRegression.deserialize(serialized)
```

## Installation

```bash
npm install @saltcorn/smartcore-js
```

Or with yarn:

```bash
yarn add @saltcorn/smartcore-js
```

## Quick Example

Here's a complete example of training a Random Forest Classifier:

```typescript
import { ensemble, dataset, modelSelection, metrics } from '@saltcorn/smartcore-js'

// Load dataset
const [x, y] = dataset.loadIris({ returnXY: true })

// Split into train and test sets
const [xTrain, xTest, yTrain, yTest] = modelSelection.trainTestSplit(x, y, { testSize: 0.3, randomState: 42 })

// Create and train model
const model = new ensemble.RandomForestClassifier({
  nTrees: 100,
  maxDepth: 10,
})
model.fit(xTrain, yTrain)

// Make predictions
const predictions = model.predict(xTest)

// Evaluate
const accuracy = metrics.accuracyScore(yTest, predictions)
console.log(`Accuracy: ${accuracy}`)
```

## System Requirements

- **Node.js**: >= 10.0.0
- **Supported Platforms**:
  - Windows (x64, ia32, arm64)
  - macOS (x64, arm64/Apple Silicon)
  - Linux (x64, arm64, armv7, musl)
  - FreeBSD (x64)
  - Android (arm64, armv7)
  - WebAssembly (wasm32-wasip1-threads)

## Contributing

SmartCore-JS is an open-source project. Contributions are welcome!

## License

This project is licensed under the MIT License.

## Support

- **Issues**: [GitHub Issues](https://github.com/saltcorn/smartcore-js/issues)
- **Documentation**: You're reading it!

## Next Steps

1. [Get Started with Installation →](./user-guide/01-getting-started.md)
2. [Learn Core Concepts →](./user-guide/02-core-concepts.md)
3. [Explore Examples →](./examples/README.md)

---

_Built with ❤️ using Rust's SmartCore and NAPI-RS_
