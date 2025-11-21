import assert from 'assert'
import chalk from 'chalk'
import {
  linearModel,
  //   preprocessing,
  dataset,
  ensemble,
  modelSelection,
  metrics,
  pipeline,
  cluster,
  decomposition,
  //   naiveBayes,
  //   neighbors,
  dataFrame,
} from '../src-js/index.js'
import { HammingI32, MahalanobisF64, ManhattanF64, MinkowskiF64 } from '../src-js/core-bindings/index.js'
import { extractNumericECommerceFields, readJSONFile } from './helpers.js'

let {
  // LogisticRegression, LinearRegression, RidgeRegression,
  ElasticNet,
  Lasso,
} = linearModel
let { RandomForestClassifier, RandomForestRegressor, ExtraTreesRegressor } = ensemble
// let { StandardScaler, OneHotEncoder } = preprocessing
let { KMeans, DBSCAN } = cluster
let { PCA, SVD } = decomposition
// let { BernoulliNB, CategoricalNB, GaussianNB, MultinomialNB } = naiveBayes
// let { KNNClassifier, KNNRegressor } = neighbors
let { loadIris, loadBoston, loadBreastCancer, loadDiabetes, loadDigits } = dataset
let { trainTestSplit } = modelSelection
let { accuracyScore } = metrics
// type DistanceType = metrics.DistanceType
let { makePipeline, deserializePipeline } = pipeline
const { DataFrame } = dataFrame

const parsedJson = readJSONFile('e-commerce-enhanced.json')
const df = new DataFrame(parsedJson, { exclude: ['transaction_id', 'customer_id', 'date', 'country', 'platform'] })

describe('Serialize + Deserialize', () => {
  //   it('StandardScaler', () => {
  //     const ss = new StandardScaler()
  //     const irisData = loadIris({ returnXY: true })
  //     if (!(irisData instanceof Array)) {
  //       assert.fail("Expected 'loadIris' to return an Array")
  //     }
  //     const [x] = irisData
  //     if (!x) {
  //       assert.fail("Expected 'loadIris' to return a non-empty Array")
  //     }
  //     ss.fit(x)
  //     const xt = ss.transform(x)
  //     const ssSerialized = ss.serialize()
  //     const ssDeserialized = StandardScaler.deserialize(ssSerialized)
  //     const xt2 = ssDeserialized.transform(x)
  //     assert.deepEqual(xt, xt2)
  //   })

  //   it('LogisticRegression', () => {
  //     const lr = new LogisticRegression({ alpha: 0.2 })
  //     const irisData = loadIris({ returnXY: true })
  //     const [x, y] = irisData instanceof Array ? irisData : []
  //     if (!(x && y)) {
  //       assert.fail('Expected "loadIris" to return an Array containing 2 items.')
  //     }
  //     const [xTrain, xTest, yTrain, yTest] = trainTestSplit(x, y, { testSize: 0.33 })
  //     lr.fit(xTrain, yTrain)
  //     const score1 = accuracyScore(lr.predict(xTest), yTest)
  //     const lrSerialized = lr.serialize()
  //     const lrDeserialized = LogisticRegression.deserialize(lrSerialized)
  //     const score2 = accuracyScore(lrDeserialized.predict(xTest), yTest)
  //     assert.equal(score1, score2)
  //   })

  it('RandomForestClassifier', () => {
    const rfc = new RandomForestClassifier()
    const irisData = loadIris({ returnXY: true })
    const [x, y] = irisData instanceof Array ? irisData : []
    if (!(x && y)) {
      assert.fail('Expected "loadIris" to return an Array containing 2 items.')
    }
    const [xTrain, xTest, yTrain, yTest] = trainTestSplit(x, y, { testSize: 0.33 })
    rfc.fit(xTrain, yTrain)
    const score1 = accuracyScore(rfc.predict(xTest), yTest)
    const rfcSerialized = rfc.serialize()
    const rfcDeserialized = RandomForestClassifier.deserialize(rfcSerialized)
    const score2 = accuracyScore(rfcDeserialized.predict(xTest), yTest)
    assert.equal(score1, score2)
  })

  it('RandomForestRegressor', () => {
    const rfr = new RandomForestRegressor()
    const irisData = loadIris({ returnXY: true })
    const [x, y] = irisData instanceof Array ? irisData : []
    if (!(x && y)) {
      assert.fail('Expected "loadIris" to return an Array containing 2 items.')
    }
    const [xTrain, xTest, yTrain, yTest] = trainTestSplit(x, y, { testSize: 0.33 })
    rfr.fit(xTrain, yTrain)
    const score1 = accuracyScore(rfr.predict(xTest), yTest)
    const rfrSerialized = rfr.serialize()
    const rfrDeserialized = RandomForestRegressor.deserialize(rfrSerialized)
    const score2 = accuracyScore(rfrDeserialized.predict(xTest), yTest)
    assert.equal(score1, score2)
  })

  it('ExtraTreesRegressor', () => {
    const etr = new ExtraTreesRegressor()
    const irisData = loadIris({ returnXY: true })
    const [x, y] = irisData instanceof Array ? irisData : []
    if (!(x && y)) {
      assert.fail('Expected "loadIris" to return an Array containing 2 items.')
    }
    const [xTrain, xTest, yTrain, yTest] = trainTestSplit(x, y, { testSize: 0.33 })
    etr.fit(xTrain, yTrain)
    const score1 = accuracyScore(etr.predict(xTest), yTest)
    const etrSerialized = etr.serialize()
    const etrDeserialized = ExtraTreesRegressor.deserialize(etrSerialized)
    const score2 = accuracyScore(etrDeserialized.predict(xTest), yTest)
    assert.equal(score1, score2)
  })

  it('KMeans', () => {
    const km = new KMeans()
    const irisData = loadIris({ returnXY: true })
    const [x, y] = irisData instanceof Array ? irisData : []
    if (!(x && y)) {
      assert.fail('Expected "loadIris" to return an Array containing 2 items.')
    }
    const [xTrain, xTest, yTrain, yTest] = trainTestSplit(x, y, { testSize: 0.33 })
    km.fit(xTrain)
    const score1 = accuracyScore(km.predict(xTest), yTest)
    const kmSerialized = km.serialize()
    const kmDeserialized = KMeans.deserialize(kmSerialized)
    const score2 = accuracyScore(kmDeserialized.predict(xTest), yTest)
    assert.equal(score1, score2)
  })

  it('DBSCAN', () => {
    const dbscan = new DBSCAN()
    const bostonData = loadBoston({ returnXY: true })
    const [x, y] = bostonData instanceof Array ? bostonData : []
    if (!(x && y)) {
      assert.fail('Expected "loadIris" to return an Array containing 2 items.')
    }
    const [xTrain, xTest, yTrain, yTest] = trainTestSplit(x, y, { testSize: 0.33 })
    dbscan.fit(xTrain)
    const score1 = accuracyScore(dbscan.predict(xTest), yTest)
    const dbscanSerialized = dbscan.serialize()
    const dbscanDeserialized = DBSCAN.deserialize(dbscanSerialized)
    const score2 = accuracyScore(dbscanDeserialized.predict(xTest), yTest)
    assert.equal(score1, score2)
  })

  it('PCA', () => {
    const columns = df.columnNames.filter((column) => !column.startsWith('customer'))
    const y = new Float64Array([1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1])
    const pca = new PCA({ nComponents: 24n, columns })
    const transformedColumns1 = pca.fit(df).transform(df)
    const pcaSerialized = pca.serialize()
    const pcaDeserialized = PCA.deserialize(pcaSerialized)
    const transformedColumns2 = pcaDeserialized.transform(df)
    assert.deepEqual(transformedColumns1, transformedColumns2)
  })

  //   it('RidgeRegression', () => {
  //     const rr = new RidgeRegression({ targetType: 'f64' })
  //     const bostonData = loadBoston({ returnXY: true })
  //     const [x, y] = bostonData instanceof Array ? bostonData : []
  //     if (!(x && y)) {
  //       assert.fail('Expected "loadBoston" to return an Array containing 2 items.')
  //     }
  //     const [xTrain, xTest, yTrain, yTest] = trainTestSplit(x, y, { testSize: 0.22 })
  //     rr.fit(xTrain, yTrain)
  //     const predictions1 = rr.predict(xTest)
  //     assert(predictions1)
  //     const rrSerialized = rr.serialize()
  //     const rrDeserialized = RidgeRegression.deserialize(rrSerialized)
  //     const predictions2 = rrDeserialized.predict(xTest)
  //     assert(predictions2)
  //     //TODO: Ensure parameters are being stored correctly
  //     console.log(
  //       chalk.red(
  //         'Values in the RidgeRegression predict output deviate.' +
  //           ' The deviation gets larger after serialization and deserialization.' +
  //           ' Explore using pre-scaled data.',
  //       ),
  //     )
  //   })

  it('SVD', () => {
    const svd = new SVD()
    const irisData = loadIris({ returnXY: true })
    const [x, y] = irisData instanceof Array ? irisData : []
    if (!(x && y)) {
      assert.fail('Expected "loadIris" to return an Array containing 2 items.')
    }
    svd.fit(x)
    const xTransformed1 = svd.transform(x)
    const svdSerialized = svd.serialize()
    const svdDeserialized = SVD.deserialize(svdSerialized)
    const xTransformed2 = svdDeserialized.transform(x)
    assert.deepEqual(xTransformed1, xTransformed2)
  })

  //   it('LinearRegression', () => {
  //     const lr = new LinearRegression()
  //     const bostonData = loadBoston({ returnXY: true })
  //     const [x, y] = bostonData instanceof Array ? bostonData : []
  //     if (!(x && y)) {
  //       assert.fail('Expected "loadBoston" to return an Array containing 2 items.')
  //     }
  //     const [xTrain, xTest, yTrain, yTest] = trainTestSplit(x, y, { testSize: 0.33 })
  //     lr.fit(xTrain, yTrain)
  //     const score1 = accuracyScore(lr.predict(xTest), yTest)
  //     const lrSerialized = lr.serialize()
  //     const lrDeserialized = LinearRegression.deserialize(lrSerialized)
  //     const score2 = accuracyScore(lrDeserialized.predict(xTest), yTest)
  //     assert.deepEqual(score1, score2)
  //   })

  it('Lasso', () => {
    const lasso = new Lasso()
    const bostonData = loadBoston({ returnXY: true })
    let [x, y] = bostonData instanceof Array ? bostonData : []
    if (!(x && y)) {
      assert.fail('Expected "loadBoston" to return an Array containing 2 items.')
    }
    const [xTrain, xTest, yTrain, yTest] = trainTestSplit(x, y, { testSize: 0.33 })
    lasso.fit(xTrain, yTrain)
    const score1 = accuracyScore(lasso.predict(xTest), yTest)
    const lassoSerialized = lasso.serialize()
    const lassoDeserialized = Lasso.deserialize(lassoSerialized)
    const score2 = accuracyScore(lassoDeserialized.predict(xTest), yTest)
    assert.equal(score1, score2)
  })

  it('ElasticNet', () => {
    const en = new ElasticNet()
    const bostonData = loadBoston({ returnXY: true })
    const [x, y] = bostonData instanceof Array ? bostonData : []
    if (!(x && y)) {
      assert.fail('Expected "loadBoston" to return an Array containing 2 items.')
    }
    const [xTrain, xTest, yTrain, yTest] = trainTestSplit(x, y, { testSize: 0.33 })
    en.fit(xTrain, yTrain)
    let score1 = accuracyScore(en.predict(xTest), yTest)
    const enSerialized = en.serialize()
    const enDeserialized = ElasticNet.deserialize(enSerialized)
    const score2 = accuracyScore(enDeserialized.predict(xTest), yTest)
    assert.equal(score1, score2)
  })

  //   it.skip('OneHotEncoder', () => {
  //     const ohe = new OneHotEncoder({ categoricalParams: new BigUint64Array() })
  //     const bostonData = loadBoston({ returnXY: true })
  //     const [x, y] = bostonData instanceof Array ? bostonData : []
  //     if (!(x && y)) {
  //       assert.fail('Expected "loadBoston" to return an Array containing 2 items.')
  //     }
  //     ohe.fit(x)
  //     const xTransformed1 = ohe.transform(x)
  //     const oheSerialized = ohe.serialize()
  //     const oheDeserialized = OneHotEncoder.deserialize(oheSerialized)
  //     const xTransformed2 = oheDeserialized.transform(x)
  //     assert.deepEqual(xTransformed1, xTransformed2)
  //   })

  //   it('BernoulliNB', () => {
  //     const bnb = new BernoulliNB()
  //     const irisData = loadIris({ returnXY: true })
  //     const [x, y] = irisData instanceof Array ? irisData : []
  //     if (!(x && y)) {
  //       assert.fail('Expected "loadIris" to return an Array containing 2 items.')
  //     }
  //     const [xTrain, xTest, yTrain, yTest] = trainTestSplit(x, y, { testSize: 0.33 })
  //     bnb.fit(xTrain, yTrain)
  //     let score1 = accuracyScore(bnb.predict(xTest), yTest)
  //     const bnbSerialized = bnb.serialize()
  //     const bnbDeserialized = BernoulliNB.deserialize(bnbSerialized)
  //     const score2 = accuracyScore(bnbDeserialized.predict(xTest), yTest)
  //     assert.equal(score1, score2)
  //   })

  //   it('CategoricalNB', () => {
  //     const df = new DataFrame(parsedJson, {
  //       include: [
  //         'product_views',
  //         'cart_additions',
  //         'cart_removals',
  //         'wishlist_additions',
  //         'search_queries',
  //         'page_scrolls',
  //         'click_count',
  //         'discount_used',
  //         'customer_age',
  //         'previous_purchases',
  //         'days_since_last_purchase',
  //         'email_opens_last_month',
  //         'reviews_written',
  //         'metrics.items_purchased',
  //         'metrics.purchases',
  //       ],
  //     })
  //     const cnb = new CategoricalNB()
  //     const y = new Float64Array([1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1])
  //     cnb.fit(df, y)
  //     const predictions1 = cnb.predict(df)
  //     const cnbSerialized = cnb.serialize()
  //     const cnbDeserialized = CategoricalNB.deserialize(cnbSerialized)
  //     const predictions2 = cnbDeserialized.predict(df)
  //     assert.deepEqual(predictions1, predictions2)
  //   })

  //   it('GaussianNB', () => {
  //     const gnb = new GaussianNB()
  //     const irisData = loadIris({ returnXY: true })
  //     const [x, y] = irisData instanceof Array ? irisData : []
  //     if (!(x && y)) {
  //       assert.fail('Expected "loadIris" to return an Array containing 2 items.')
  //     }
  //     const [xTrain, xTest, yTrain, yTest] = trainTestSplit(x, y, { testSize: 0.33 })
  //     gnb.fit(xTrain, yTrain)
  //     const score1 = accuracyScore(gnb.predict(xTest), yTest)
  //     const gnbSerialized = gnb.serialize()
  //     const gnbDeserialized = GaussianNB.deserialize(gnbSerialized)
  //     const score2 = accuracyScore(gnbDeserialized.predict(xTest), yTest)
  //     assert.equal(score1, score2)
  //   })

  //   it('MultinomialNB', () => {
  //     const df = new DataFrame(parsedJson, {
  //       include: [
  //         'product_views',
  //         'cart_additions',
  //         'cart_removals',
  //         'wishlist_additions',
  //         'search_queries',
  //         'page_scrolls',
  //         'click_count',
  //         'discount_used',
  //         'customer_age',
  //         'previous_purchases',
  //         'days_since_last_purchase',
  //         'email_opens_last_month',
  //         'reviews_written',
  //         'metrics.items_purchased',
  //         'metrics.purchases',
  //       ],
  //     })

  //     const mnb = new MultinomialNB()
  //     const y = new Float64Array([1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1])
  //     mnb.fit(df, y)
  //     const predictions1 = mnb.predict(df)
  //     const mnbSerialized = mnb.serialize()
  //     const mnbDeserialized = MultinomialNB.deserialize(mnbSerialized)
  //     const predictions2 = mnbDeserialized.predict(df)
  //     assert.deepEqual(predictions1, predictions2)
  //   })

  //   it('KNNClassifier', () => {
  //     const knnc = new KNNClassifier({ distanceType: 'manhattan' })
  //     const irisData = loadIris({ returnXY: true })
  //     const [x, y] = irisData instanceof Array ? irisData : []
  //     if (!(x && y)) {
  //       assert.fail('Expected "loadIris" to return an Array containing 2 items.')
  //     }
  //     const [xTrain, xTest, yTrain, yTest] = trainTestSplit(x, y, { testSize: 0.33 })
  //     knnc.fit(xTrain, yTrain)
  //     const score1 = accuracyScore(knnc.predict(xTest), yTest)
  //     const knncSerialized = knnc.serialize()
  //     const knncDeserialized = KNNClassifier.deserialize(knncSerialized)
  //     const score2 = accuracyScore(knncDeserialized.predict(xTest), yTest)
  //     assert.equal(score1, score2)
  //   })

  //   it('KNNRegressor', () => {
  //     const knnr = new KNNRegressor({ distanceType: 'minkowski', p: 10 })
  //     const bostonData = loadBoston({ returnXY: true })
  //     const [x, y] = bostonData instanceof Array ? bostonData : []
  //     if (!(x && y)) {
  //       assert.fail('Expected "loadBoston" to return an Array containing 2 items.')
  //     }
  //     const [xTrain, xTest, yTrain, yTest] = trainTestSplit(x, y, { testSize: 0.33 })
  //     knnr.fit(xTrain, yTrain)
  //     let score1 = accuracyScore(knnr.predict(xTest), yTest)
  //     const knnrSerialized = knnr.serialize()
  //     const knnrDeserialized = KNNRegressor.deserialize(knnrSerialized)
  //     const score2 = accuracyScore(knnrDeserialized.predict(xTest), yTest)
  //     assert.equal(score1, score2)
  //   })
})
