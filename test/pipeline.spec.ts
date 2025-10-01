import assert from 'assert'
import {
  linearModel,
  preprocessing,
  dataset,
  ensemble,
  modelSelection,
  metrics,
  pipeline,
  cluster,
  decomposition,
  naiveBayes,
  neighbors,
} from '../dist/index.js'
import { HammingF64, MahalanobisF64, ManhattanF64, MinkowskiF64 } from '../core-bindings/index.js'

let { LogisticRegression, LinearRegression, RidgeRegression, Lasso, ElasticNet } = linearModel
let { RandomForestClassifier, RandomForestRegressor, ExtraTreesRegressor } = ensemble
let { StandardScaler, OneHotEncoder } = preprocessing
let { KMeans, DBSCAN } = cluster
let { PCA, SVD } = decomposition
let { BernoulliNB, CategoricalNB, GaussianNB, MultinomialNB } = naiveBayes
let { KNNClassifier, KNNRegressor } = neighbors
let { loadIris, loadBoston, loadBreastCancer, loadDiabetes, loadDigits } = dataset
let { trainTestSplit } = modelSelection
let { accuracyScore, DistanceType } = metrics
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

  it('StandardScaler + DBSCAN', () => {
    let pipe = makePipeline([
      ['standardscaler', new StandardScaler()],
      ['kmeans', new DBSCAN()],
    ])
    let irisData = loadBoston({ returnXY: true })
    let [x, y] = irisData instanceof Array ? irisData : []
    if (!(x && y)) {
      assert.fail('Expected both x and y to be defined')
    }
    let [xTrain, xTest, yTrain, yTest] = trainTestSplit(x, y, { testSize: 0.33 })
    pipe.fit(xTrain, yTrain)
    let score = accuracyScore(pipe.predict(xTest), yTest)
    assert.equal(score, 0)
  })

  it.skip('PCA + DBSCAN', () => {
    let pipe = makePipeline([
      ['pca', new PCA({ nComponents: 2 })],
      ['ridgeregression', new RidgeRegression()],
    ])
    let digitsData = loadDigits({ returnXY: true })
    let [x, y] = digitsData instanceof Array ? digitsData : []
    if (!(x && y)) {
      assert.fail('Expected both x and y to be defined')
    }
    let [xTrain, xTest, yTrain, yTest] = trainTestSplit(x, y, { testSize: 0.33 })
    pipe.fit(xTrain, yTrain)
    let score = accuracyScore(pipe.predict(xTest), yTest)
    assert.equal(score, 0)
  })

  it.skip('SVD + DBSCAN', () => {
    let pipe = makePipeline([
      ['pca', new SVD()],
      ['kmeans', new DBSCAN({ distance: new ManhattanF64() })],
    ])
    let irisData = loadBoston({ returnXY: true })
    let [x, y] = irisData instanceof Array ? irisData : []
    if (!(x && y)) {
      assert.fail('Expected both x and y to be defined')
    }
    let [xTrain, xTest, yTrain, yTest] = trainTestSplit(x, y, { testSize: 0.33 })
    pipe.fit(xTrain, yTrain)
    let score = accuracyScore(pipe.predict(xTest), yTest)
    assert.equal(score, 0)
  })

  it('StandardScaler + LinearRegression', () => {
    let pipe = makePipeline([
      ['standardscaler', new StandardScaler()],
      ['linearregression', new LinearRegression()],
    ])
    let irisData = loadBoston({ returnXY: true })
    let [x, y] = irisData instanceof Array ? irisData : []
    if (!(x && y)) {
      assert.fail('Expected both x and y to be defined')
    }
    let [xTrain, xTest, yTrain, yTest] = trainTestSplit(x, y, { testSize: 0.33 })
    pipe.fit(xTrain, yTrain)
    let score = accuracyScore(pipe.predict(xTest), yTest)
    assert.equal(score, 0)
  })

  it('StandardScaler + RidgeRegression', () => {
    let pipe = makePipeline([
      ['standardscaler', new StandardScaler()],
      ['ridgeregression', new RidgeRegression()],
    ])
    let irisData = loadBoston({ returnXY: true })
    let [x, y] = irisData instanceof Array ? irisData : []
    if (!(x && y)) {
      assert.fail('Expected both x and y to be defined')
    }
    let [xTrain, xTest, yTrain, yTest] = trainTestSplit(x, y, { testSize: 0.33 })
    pipe.fit(xTrain, yTrain)
    let score = accuracyScore(pipe.predict(xTest), yTest)
    assert.equal(score, 0)
  })

  it('StandardScaler + Lasso', () => {
    let pipe = makePipeline([
      ['standardscaler', new StandardScaler()],
      ['lasso', new Lasso()],
    ])
    let irisData = loadBoston({ returnXY: true })
    let [x, y] = irisData instanceof Array ? irisData : []
    if (!(x && y)) {
      assert.fail('Expected both x and y to be defined')
    }
    let [xTrain, xTest, yTrain, yTest] = trainTestSplit(x, y, { testSize: 0.33 })
    pipe.fit(xTrain, yTrain)
    let score = accuracyScore(pipe.predict(xTest), yTest)
    assert.equal(score, 0)
  })

  it('StandardScaler + ElasticNet', () => {
    let pipe = makePipeline([
      ['standardscaler', new StandardScaler()],
      ['elasticnet', new ElasticNet()],
    ])
    let irisData = loadBoston({ returnXY: true })
    let [x, y] = irisData instanceof Array ? irisData : []
    if (!(x && y)) {
      assert.fail('Expected both x and y to be defined')
    }
    let [xTrain, xTest, yTrain, yTest] = trainTestSplit(x, y, { testSize: 0.33 })
    pipe.fit(xTrain, yTrain)
    let score = accuracyScore(pipe.predict(xTest), yTest)
    assert.equal(score, 0)
  })

  it('OneHotEncoder + ElasticNet', () => {
    let pipe = makePipeline([
      ['onehotencoder', new OneHotEncoder({ categoricalParams: new BigUint64Array() })],
      ['elasticnet', new ElasticNet()],
    ])
    let irisData = loadBoston({ returnXY: true })
    let [x, y] = irisData instanceof Array ? irisData : []
    if (!(x && y)) {
      assert.fail('Expected both x and y to be defined')
    }
    let [xTrain, xTest, yTrain, yTest] = trainTestSplit(x, y, { testSize: 0.33 })
    pipe.fit(xTrain, yTrain)
    let score = accuracyScore(pipe.predict(xTest), yTest)
    assert.equal(score, 0)
  })

  it('OneHotEncoder + BernoulliNB', () => {
    let pipe = makePipeline([
      ['onehotencoder', new OneHotEncoder({ categoricalParams: new BigUint64Array() })],
      ['bernoullinb', new BernoulliNB()],
    ])
    let irisData = loadIris({ returnXY: true, unsigned: true })
    let [x, y] = irisData instanceof Array ? irisData : []
    if (!(x && y)) {
      assert.fail('Expected both x and y to be defined')
    }
    let [xTrain, xTest, yTrain, yTest] = trainTestSplit(x, y, { testSize: 0.33 })
    pipe.fit(xTrain, yTrain)
    let score = accuracyScore(pipe.predict(xTest), yTest)
    assert(score)
  })

  it.skip('OneHotEncoder + CategoricalNB', () => {
    let pipe = makePipeline([
      ['onehotencoder', new OneHotEncoder({ categoricalParams: new BigUint64Array() })],
      ['categoricalnb', new CategoricalNB()],
    ])
    let irisData = loadIris({ returnXY: true, unsigned: true })
    let [x, y] = irisData instanceof Array ? irisData : []
    if (!(x && y)) {
      assert.fail('Expected both x and y to be defined')
    }
    let [xTrain, xTest, yTrain, yTest] = trainTestSplit(x, y, { testSize: 0.33 })
    pipe.fit(xTrain, yTrain)
    let score = accuracyScore(pipe.predict(xTest), yTest)
    assert(score)
  })

  it('OneHotEncoder + GaussianNB', () => {
    let pipe = makePipeline([
      ['onehotencoder', new OneHotEncoder({ categoricalParams: new BigUint64Array() })],
      ['gaussiannb', new GaussianNB()],
    ])
    let irisData = loadIris({ returnXY: true, unsigned: true })
    let [x, y] = irisData instanceof Array ? irisData : []
    if (!(x && y)) {
      assert.fail('Expected both x and y to be defined')
    }
    let [xTrain, xTest, yTrain, yTest] = trainTestSplit(x, y, { testSize: 0.33 })
    pipe.fit(xTrain, yTrain)
    let score = accuracyScore(pipe.predict(xTest), yTest)
    assert(score)
  })

  it.skip('StandardScaler + MultinomialNB', () => {
    // fails on 32-bit systems and the WASI targets
    let pipe = makePipeline([
      // ['standardscaler', new StandardScaler()],
      ['multinomialnb', new MultinomialNB()],
    ])
    let breastCancerData = loadBreastCancer({ returnXY: true, unsigned: true })
    let [x, y] = breastCancerData instanceof Array ? breastCancerData : []
    if (!(x && y)) {
      assert.fail('Expected both x and y to be defined')
    }
    let [xTrain, xTest, yTrain, yTest] = trainTestSplit(x, y, { testSize: 0.33 })
    pipe.fit(xTrain, yTrain)
    let score = accuracyScore(pipe.predict(xTest), yTest)
    assert(score)
  })

  it('OneHotEncoder + KNNClassifier', () => {
    let pipe = makePipeline([
      ['onehotencoder', new OneHotEncoder({ categoricalParams: new BigUint64Array() })],
      ['knnclassifier', new KNNClassifier({ distance: DistanceType.HAMMING })],
    ])
    let irisData = loadIris({ returnXY: true, unsigned: true })
    let [x, y] = irisData instanceof Array ? irisData : []
    if (!(x && y)) {
      assert.fail('Expected both x and y to be defined')
    }
    let [xTrain, xTest, yTrain, yTest] = trainTestSplit(x, y, { testSize: 0.33 })
    pipe.fit(xTrain, yTrain)
    let score = accuracyScore(pipe.predict(xTest), yTest)
    assert(score)
  })

  it('OneHotEncoder + KNNRegressor', () => {
    let pipe = makePipeline([
      ['onehotencoder', new OneHotEncoder({ categoricalParams: new BigUint64Array() })],
      ['knnclassifier', new KNNRegressor({ distance: DistanceType.MINKOWSKI, p: 10 })],
    ])
    let bostonData = loadBoston({ returnXY: true, unsigned: true })
    let [x, y] = bostonData instanceof Array ? bostonData : []
    if (!(x && y)) {
      assert.fail('Expected both x and y to be defined')
    }
    let [xTrain, xTest, yTrain, yTest] = trainTestSplit(x, y, { testSize: 0.33 })
    pipe.fit(xTrain, yTrain)
    let score = accuracyScore(pipe.predict(xTest), yTest)
    assert.equal(typeof score, typeof 0)
  })

  it('AutoGenerated Names', () => {
    let pipe = makePipeline([
      new OneHotEncoder({ categoricalParams: new BigUint64Array() }),
      new KNNRegressor({ distance: DistanceType.MINKOWSKI, p: 10 }),
    ])
    let bostonData = loadBoston({ returnXY: true, unsigned: true })
    let [x, y] = bostonData instanceof Array ? bostonData : []
    if (!(x && y)) {
      assert.fail('Expected both x and y to be defined')
    }
    let [xTrain, xTest, yTrain, yTest] = trainTestSplit(x, y, { testSize: 0.33 })
    pipe.fit(xTrain, yTrain)
    let score = accuracyScore(pipe.predict(xTest), yTest)
    assert.equal(typeof score, typeof 0)
  })
})
