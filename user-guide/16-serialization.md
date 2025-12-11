# Model Persistence & Serialization

Save and load trained models for production deployment.

## Serialization Basics

All SmartCore-JS models support serialization to Buffer format.

```typescript
import { linearModel, dataset, modelSelection } from '@saltcorn/smartcore-js'
import fs from 'fs'

const [x, y] = dataset.loadIris({ returnXY: true })
const [xTrain, xTest, yTrain, yTest] = modelSelection.trainTestSplit(x, y)

// Train model
const model = new linearModel.LogisticRegression()
model.fit(xTrain, yTrain)

// Serialize to Buffer
const serialized: Buffer = model.serialize()

// Save to file
fs.writeFileSync('model.bin', serialized)
console.log('Model saved successfully')
```

## Deserialization

Load models using static `deserialize()` method.

```typescript
import { linearModel } from '@saltcorn/smartcore-js'
import fs from 'fs'

// Load from file
const modelData = fs.readFileSync('model.bin')

// Deserialize
const model = linearModel.LogisticRegression.deserialize(modelData)

// Use immediately (already trained)
const predictions = model.predict(xTest)
console.log('Predictions:', predictions)
```

## Pipeline Serialization

Pipelines can be serialized as complete units.

```typescript
import { pipeline, preprocessing, linearModel } from '@saltcorn/smartcore-js'

// Create and train pipeline
const pipe = pipeline.makePipeline([new preprocessing.StandardScaler(), new linearModel.LogisticRegression()])
pipe.fit(xTrain, yTrain)

// Serialize entire pipeline
const serialized = pipe.serialize()
fs.writeFileSync('pipeline.bin', JSON.stringify(serialized))

// Deserialize pipeline
const loaded = JSON.parse(fs.readFileSync('pipeline.bin', 'utf-8'))
const restoredPipe = pipeline.deserializePipeline(loaded)

// Use restored pipeline
const predictions = restoredPipe.predict(xTest)
```

## Storing with Metadata

Best practice: store models with metadata.

```typescript
interface SavedModel {
  model: string // Base64-encoded Buffer
  metadata: {
    algorithm: string
    version: string
    trainedAt: string
    trainingAccuracy: number
    features: string[]
    hyperparameters: Record<string, any>
  }
}

// Save with metadata
const savedModel: SavedModel = {
  model: model.serialize().toString('base64'),
  metadata: {
    algorithm: 'LogisticRegression',
    version: '1.0.0',
    trainedAt: new Date().toISOString(),
    trainingAccuracy: 0.96,
    features: ['sepal_length', 'sepal_width', 'petal_length', 'petal_width'],
    hyperparameters: { alpha: 0.1, maxIterations: 100 },
  },
}

fs.writeFileSync('model-with-metadata.json', JSON.stringify(savedModel, null, 2))

// Load with validation
const loadedData = JSON.parse(fs.readFileSync('model-with-metadata.json', 'utf-8'))

console.log('Model Info:')
console.log(`  Algorithm: ${loadedData.metadata.algorithm}`)
console.log(`  Trained: ${loadedData.metadata.trainedAt}`)
console.log(`  Accuracy: ${(loadedData.metadata.trainingAccuracy * 100).toFixed(2)}%`)

const model = linearModel.LogisticRegression.deserialize(Buffer.from(loadedData.model, 'base64'))
```

## Version Control

Track model versions for production deployment.

```typescript
interface ModelVersion {
  id: string
  version: string
  model: string
  performance: {
    trainAccuracy: number
    testAccuracy: number
    cvScore: number
  }
  createdAt: string
}

const versions: ModelVersion[] = []

// Save new version
const newVersion: ModelVersion = {
  id: generateId(),
  version: '1.0.0',
  model: model.serialize().toString('base64'),
  performance: {
    trainAccuracy: 0.96,
    testAccuracy: 0.94,
    cvScore: 0.95,
  },
  createdAt: new Date().toISOString(),
}

versions.push(newVersion)
fs.writeFileSync('model-versions.json', JSON.stringify(versions, null, 2))
```

## Production Deployment

```typescript
class ModelService {
  private model: any
  private metadata: any

  async loadModel(modelPath: string) {
    const data = JSON.parse(fs.readFileSync(modelPath, 'utf-8'))
    this.metadata = data.metadata

    // Load appropriate model type
    switch (data.metadata.algorithm) {
      case 'LogisticRegression':
        this.model = linearModel.LogisticRegression.deserialize(Buffer.from(data.model, 'base64'))
        break
      case 'RandomForestClassifier':
        this.model = ensemble.RandomForestClassifier.deserialize(Buffer.from(data.model, 'base64'))
        break
      default:
        throw new Error(`Unknown algorithm: ${data.metadata.algorithm}`)
    }

    console.log(`Loaded ${data.metadata.algorithm} v${data.metadata.version}`)
  }

  predict(input: any) {
    if (!this.model) {
      throw new Error('Model not loaded')
    }
    return this.model.predict(input)
  }

  getMetadata() {
    return this.metadata
  }
}

// Usage
const service = new ModelService()
await service.loadModel('model-with-metadata.json')
const predictions = service.predict(newData)
```

## Supported Model Types

All these models support serialization:

- **Linear Models**: LinearRegression, LogisticRegression, Ridge, Lasso, ElasticNet
- **Tree Models**: DecisionTreeClassifier, DecisionTreeRegressor
- **Ensemble**: RandomForestClassifier, RandomForestRegressor, ExtraTreesRegressor
- **SVM**: SVC, SVR
- **Naive Bayes**: GaussianNB, MultinomialNB, BernoulliNB, CategoricalNB
- **Neighbors**: KNNClassifier, KNNRegressor
- **Clustering**: KMeans, DBSCAN
- **Decomposition**: PCA, SVD
- **Preprocessing**: StandardScaler, OneHotEncoder
- **Pipelines**: Complete pipelines with all steps

## Best Practices

1. **Store metadata**: Algorithm name, version, performance metrics
2. **Use version control**: Track model iterations
3. **Validate on load**: Check model type and version
4. **Test after loading**: Verify model works correctly
5. **Secure storage**: Protect model files in production
6. **Document changes**: Keep changelog for model updates

```typescript
// ✅ Good practice - comprehensive save
const modelPackage = {
  model: model.serialize().toString('base64'),
  metadata: {
    algorithm: 'RandomForestClassifier',
    version: '2.1.0',
    trainedAt: new Date().toISOString(),
    trainingMetrics: {
      accuracy: 0.96,
      precision: 0.95,
      recall: 0.97,
      f1: 0.96,
    },
    testMetrics: {
      accuracy: 0.94,
      precision: 0.93,
      recall: 0.95,
      f1: 0.94,
    },
    features: featureNames,
    hyperparameters: {
      nTrees: 100,
      maxDepth: 10,
    },
    dataInfo: {
      trainSize: xTrain.length,
      testSize: xTest.length,
    },
  },
}
```

## Complete Example

```typescript
import { ensemble, preprocessing, pipeline, dataset, modelSelection, metrics } from '@saltcorn/smartcore-js'
import fs from 'fs'

// Train model
const [x, y] = dataset.loadBreastCancer({ returnXY: true })
const [xTrain, xTest, yTrain, yTest] = modelSelection.trainTestSplit(x, y, { testSize: 0.3 })

const pipe = pipeline.makePipeline([
  new preprocessing.StandardScaler(),
  new ensemble.RandomForestClassifier({ nTrees: 100 }),
])

pipe.fit(xTrain, yTrain)

// Evaluate
const trainPred = pipe.predict(xTrain)
const testPred = pipe.predict(xTest)

// Save with comprehensive metadata
const modelPackage = {
  model: JSON.stringify(pipe.serialize()),
  metadata: {
    algorithm: 'Pipeline(StandardScaler + RandomForestClassifier)',
    version: '1.0.0',
    trainedAt: new Date().toISOString(),
    trainAccuracy: metrics.accuracyScore(yTrain, trainPred),
    testAccuracy: metrics.accuracyScore(yTest, testPred),
    datasetSize: { train: xTrain.length, test: xTest.length },
  },
}

fs.writeFileSync('production-model.json', JSON.stringify(modelPackage, null, 2))
console.log('Model deployed successfully')

// Later: Load and use
const loaded = JSON.parse(fs.readFileSync('production-model.json', 'utf-8'))
const restoredPipe = pipeline.deserializePipeline(JSON.parse(loaded.model))
const newPredictions = restoredPipe.predict(newData)
```

---

**Previous**: [Pipelines ←](./15-pipelines.md) | **Next**: [Examples →](../examples/README.md)
