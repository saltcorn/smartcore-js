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
  dataFrame,
} from '../src-js/index.js'
import { HammingI32, MahalanobisF64, ManhattanF64, MinkowskiF64 } from '../src-js/core-bindings/index.js'
import { extractNumericECommerceFields, readJSONFile } from './helpers.js'

let { LogisticRegression, LinearRegression, RidgeRegression, Lasso, ElasticNet } = linearModel
let { RandomForestClassifier, RandomForestRegressor, ExtraTreesRegressor } = ensemble
let { StandardScaler, OneHotEncoder } = preprocessing
let { KMeans, DBSCAN } = cluster
let { PCA, SVD } = decomposition
let { BernoulliNB, CategoricalNB, GaussianNB, MultinomialNB } = naiveBayes
let {
  KNNClassifier,
  // KNNRegressor
} = neighbors
let { loadIris, loadBoston, loadBreastCancer, loadDiabetes, loadDigits } = dataset
let { trainTestSplit } = modelSelection
let { accuracyScore } = metrics
type DistanceType = metrics.DistanceType
let { makePipeline, deserializePipeline } = pipeline
const { DataFrame } = dataFrame

const parsedJson = readJSONFile('e-commerce-enhanced.json')
const df = new DataFrame(parsedJson, { exclude: ['transaction_id', 'customer_id', 'date', 'country', 'platform'] })

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
      ['dbscan', new DBSCAN()],
    ])
    let bostonData = loadBoston({ returnXY: true })
    let [x, y] = bostonData instanceof Array ? bostonData : []
    if (!(x && y)) {
      assert.fail('Expected both x and y to be defined')
    }
    let [xTrain, xTest, yTrain, yTest] = trainTestSplit(x, y, { testSize: 0.33 })
    pipe.fit(xTrain, yTrain)
    let score = accuracyScore(pipe.predict(xTest), yTest)
    assert(score >= 0)
  })

  it('StandardScaler + PCA + RidgeRegression', () => {
    let columns = df.columnNames.filter((column) => !column.startsWith('customer'))
    // console.log('Selected: ', columns)
    let pipe = makePipeline(
      [new StandardScaler(), ['pca', new PCA({ nComponents: 14, columns })], new RidgeRegression()],
      {
        verbose: true,
      },
    )
    const y = new Float64Array([1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1])
    pipe.fit(df, y).transform(df)
    const predictions = pipe.predict(df)
    assert(predictions)
  })

  it('SVD + DBSCAN', () => {
    let pipe = makePipeline([
      ['svd', new SVD()],
      ['kmeans', new DBSCAN({ numberType: 'f64' })],
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

  it('StandardScaler + LinearRegression', () => {
    let pipe = makePipeline([
      ['standardscaler', new StandardScaler()],
      ['linearregression', new LinearRegression()],
    ])
    let bostonData = loadBoston({ returnXY: true })
    let [x, y] = bostonData instanceof Array ? bostonData : []
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
    let irisData = loadIris({ returnXY: true })
    let [x, y] = irisData instanceof Array ? irisData : []
    if (!(x && y)) {
      assert.fail('Expected both x and y to be defined')
    }
    let [xTrain, xTest, yTrain, yTest] = trainTestSplit(x, y, { testSize: 0.33 })
    pipe.fit(xTrain, yTrain)
    let score = accuracyScore(pipe.predict(xTest), yTest)
    assert(typeof score === 'number')
  })

  it('StandardScaler + Lasso', () => {
    let pipe = makePipeline([
      ['standardscaler', new StandardScaler()],
      ['lasso', new Lasso()],
    ])
    let bostonData = loadBoston({ returnXY: true })
    let [x, y] = bostonData instanceof Array ? bostonData : []
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
    let bostonData = loadBoston({ returnXY: true })
    let [x, y] = bostonData instanceof Array ? bostonData : []
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
    let bostonData = loadBoston({ returnXY: true })
    let [x, y] = bostonData instanceof Array ? bostonData : []
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

  it('OneHotEncoder + CategoricalNB', () => {
    const df = new DataFrame(parsedJson, {
      include: [
        'product_views',
        'cart_additions',
        'cart_removals',
        'wishlist_additions',
        'search_queries',
        'page_scrolls',
        'click_count',
        'discount_used',
        'customer_age',
        'previous_purchases',
        'days_since_last_purchase',
        'email_opens_last_month',
        'reviews_written',
        'metrics.items_purchased',
        'metrics.purchases',
      ],
    })
    let pipe = makePipeline([['categoricalnb', new CategoricalNB()]])
    const y = new Float64Array([1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1])
    pipe.fit(df, y).transform(df)
    const predictions = pipe.predict(df)
    assert(predictions)
  })

  it('OneHotEncoder + GaussianNB', () => {
    let pipe = makePipeline([
      ['onehotencoder', new OneHotEncoder({ categoricalParams: new BigUint64Array() })],
      ['gaussiannb', new GaussianNB()],
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

  it('StandardScaler + MultinomialNB', () => {
    const df = new DataFrame(parsedJson, {
      include: [
        'product_views',
        'cart_additions',
        'cart_removals',
        'wishlist_additions',
        'search_queries',
        'page_scrolls',
        'click_count',
        'discount_used',
        'customer_age',
        'previous_purchases',
        'days_since_last_purchase',
        'email_opens_last_month',
        'reviews_written',
        'metrics.items_purchased',
        'metrics.purchases',
      ],
    })

    let pipe = makePipeline([['multinomialnb', new MultinomialNB()]])
    const y = new Float64Array([1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1])
    pipe.fit(df, y).transform(df)
    const predictions = pipe.predict(df)
    assert(predictions)
  })

  it('OneHotEncoder + KNNClassifier', () => {
    let pipe = makePipeline([
      ['onehotencoder', new OneHotEncoder({ categoricalParams: new BigUint64Array() })],
      ['knnclassifier', new KNNClassifier({ distanceType: 'manhattan' })],
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

  //   it('OneHotEncoder + KNNRegressor', () => {
  //     let pipe = makePipeline([
  //       ['onehotencoder', new OneHotEncoder({ categoricalParams: new BigUint64Array() })],
  //       ['knnclassifier', new KNNRegressor({ distance: DistanceType.MINKOWSKI, p: 10 })],
  //     ])
  //     let bostonData = loadBoston({ returnXY: true, unsigned: true })
  //     let [x, y] = bostonData instanceof Array ? bostonData : []
  //     if (!(x && y)) {
  //       assert.fail('Expected both x and y to be defined')
  //     }
  //     let [xTrain, xTest, yTrain, yTest] = trainTestSplit(x, y, { testSize: 0.33 })
  //     pipe.fit(xTrain, yTrain)
  //     let score = accuracyScore(pipe.predict(xTest), yTest)
  //     assert.equal(typeof score, typeof 0)
  //   })
  //   it('AutoGenerated Names', () => {
  //     let pipe = makePipeline([
  //       ['onehotencoder', new OneHotEncoder({ categoricalParams: new BigUint64Array() })],
  //       new KNNRegressor({ distance: DistanceType.MINKOWSKI, p: 10 }),
  //     ])
  //     let bostonData = loadBoston({ returnXY: true, unsigned: true })
  //     let [x, y] = bostonData instanceof Array ? bostonData : []
  //     if (!(x && y)) {
  //       assert.fail('Expected both x and y to be defined')
  //     }
  //     let [xTrain, xTest, yTrain, yTest] = trainTestSplit(x, y, { testSize: 0.33 })
  //     pipe.fit(xTrain, yTrain)
  //     let score = accuracyScore(pipe.predict(xTest), yTest)
  //     assert.equal(typeof score, typeof 0)
  //   })

  it('Serialize + Deserialize', () => {
    let columns = df.columnNames.filter((column) => !column.startsWith('customer'))
    // console.log('Selected: ', columns)
    let pipe = makePipeline(
      [new StandardScaler(), ['pca', new PCA({ nComponents: 14, columns })], new RidgeRegression()],
      {
        verbose: true,
      },
    )
    const y = new Float64Array([1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1])
    pipe.fit(df, y).transform(df)
    const predictions = pipe.predict(df)
    assert(predictions)
    let serializedPipe = pipe.serialize()
    pipe = deserializePipeline(serializedPipe)
    assert(pipe.predict(df))
  })
})
