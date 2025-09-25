import assert from 'assert'
import {
  linear_model,
  preprocessing,
  dataset,
  ensemble,
  model_selection,
  metrics,
  pipeline,
  cluster,
} from '../dist/index.js'

let { LogisticRegression } = linear_model
let { RandomForestClassifier, RandomForestRegressor, ExtraTreesRegressor } = ensemble
let { StandardScaler } = preprocessing
let { KMeans } = cluster
let { loadIris } = dataset
let { trainTestSplit } = model_selection
let { accuracyScore } = metrics
let { makePipeline } = pipeline

describe('Pipelines', () => {
  it('StandardScaler + LogisticRegression', () => {
    let pipe = makePipeline([
      ['standardscaler', new StandardScaler()],
      ['logisticregression', new LogisticRegression({ alpha: 0.2 })],
    ])
    let irisData = loadIris({ returnXY: true })
    let [x, y] = irisData instanceof Array ? irisData : []
    if (!(x && y)) {
      assert.fail('Expected both x and y to be defined')
    }
    let [xTrain, xTest, yTrain, yTest] = trainTestSplit(x, y, { testSize: 0.33 })
    pipe.fit(xTrain, yTrain)
    let score = accuracyScore(pipe.predict(xTest), yTest)
    assert(score)
  })

  it('StandardScaler + RandomForestClassifier', () => {
    let pipe = makePipeline([
      ['standardscaler', new StandardScaler()],
      ['randomforestclassifier', new RandomForestClassifier()],
    ])
    let irisData = loadIris({ returnXY: true })
    let [x, y] = irisData instanceof Array ? irisData : []
    if (!(x && y)) {
      assert.fail('Expected both x and y to be defined')
    }
    let [xTrain, xTest, yTrain, yTest] = trainTestSplit(x, y, { testSize: 0.33 })
    pipe.fit(xTrain, yTrain)
    let score = accuracyScore(pipe.predict(xTest), yTest)
    assert(score)
  })

  it('StandardScaler + RandomForestRegressor', () => {
    let pipe = makePipeline([
      ['standardscaler', new StandardScaler()],
      ['randomforestregressor', new RandomForestRegressor()],
    ])
    let irisData = loadIris({ returnXY: true })
    let [x, y] = irisData instanceof Array ? irisData : []
    if (!(x && y)) {
      assert.fail('Expected both x and y to be defined')
    }
    let [xTrain, xTest, yTrain, yTest] = trainTestSplit(x, y, { testSize: 0.33 })
    pipe.fit(xTrain, yTrain)
    let score = accuracyScore(pipe.predict(xTest), yTest)
    assert(score)
  })

  it('StandardScaler + ExtraTreesRegressor', () => {
    let pipe = makePipeline([
      ['standardscaler', new StandardScaler()],
      ['extratreesregressor', new ExtraTreesRegressor()],
    ])
    let irisData = loadIris({ returnXY: true })
    let [x, y] = irisData instanceof Array ? irisData : []
    if (!(x && y)) {
      assert.fail('Expected both x and y to be defined')
    }
    let [xTrain, xTest, yTrain, yTest] = trainTestSplit(x, y, { testSize: 0.33 })
    pipe.fit(xTrain, yTrain)
    let score = accuracyScore(pipe.predict(xTest), yTest)
    assert(score)
  })

  it('StandardScaler + KMeans', () => {
    let pipe = makePipeline([
      ['standardscaler', new StandardScaler()],
      ['kmeans', new KMeans()],
    ])
    let irisData = loadIris({ returnXY: true })
    let [x, y] = irisData instanceof Array ? irisData : []
    if (!(x && y)) {
      assert.fail('Expected both x and y to be defined')
    }
    let [xTrain, xTest, yTrain, yTest] = trainTestSplit(x, y, { testSize: 0.33 })
    pipe.fit(xTrain, yTrain)
    let score = accuracyScore(pipe.predict(xTest), yTest)
    assert(score)
  })
})
