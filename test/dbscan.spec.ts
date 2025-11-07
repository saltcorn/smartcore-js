import { DbscanParams, DBSCANV2, DenseMatrix, DenseMatrixF64, DistanceName } from '../dist/core-bindings/index.js'
import { loadBoston } from '../dist/dataset/index.js'
import assert from 'assert'
import { trainTestSplit } from '../dist/model_selection/index.js'
import { DenseMatrix as DenseMatrixOl } from '../dist/index.js'
import { accuracyScore } from '../dist/metrics/index.js'

describe('DBSCANV2', () => {
  it('create', () => {
    let bostonData = loadBoston({ returnXY: true })
    let [x, y] = bostonData instanceof Array ? bostonData : []
    if (!(x && y)) {
      assert.fail('Expected both x and y to be defined')
    }
    let xData = DenseMatrix.f64(x.asRsMatrix('f64') as DenseMatrixF64)
    let dbscan_params = new DbscanParams(xData)
    new DBSCANV2(dbscan_params)
  })

  it('variants', () => {
    let bostonData = loadBoston({ returnXY: true })
    let [x, y] = bostonData instanceof Array ? bostonData : []
    if (!(x && y)) {
      assert.fail('Expected both x and y to be defined')
    }
    let xData = DenseMatrix.f64(x.asRsMatrix('f64') as DenseMatrixF64)

    // Euclidian
    let dbscan_params = new DbscanParams(xData)
    dbscan_params.distanceType = DistanceName.Euclidian
    new DBSCANV2(dbscan_params)

    // Hamming
    dbscan_params.distanceType = DistanceName.Hamming
    new DBSCANV2(dbscan_params)

    // Manhattan
    dbscan_params.distanceType = DistanceName.Manhattan
    new DBSCANV2(dbscan_params)

    // Mahalanobis
    dbscan_params.distanceType = DistanceName.Mahalanobis
    new DBSCANV2(dbscan_params)

    // Minkowski
    dbscan_params.distanceType = DistanceName.Minkowski
    new DBSCANV2(dbscan_params)
  })

  it('predict', () => {
    let bostonData = loadBoston({ returnXY: true })
    let [x, y] = bostonData instanceof Array ? bostonData : []
    if (!(x && y)) {
      assert.fail('Expected both x and y to be defined')
    }
    let [xTrain, xTest, yTrain, yTest] = trainTestSplit(x, y, { testSize: 0.33 })

    let xData = DenseMatrix.f64((xTrain as DenseMatrixOl).asRsMatrix('f64') as DenseMatrixF64)
    let dbscan_params = new DbscanParams(xData)
    let dbscan = new DBSCANV2(dbscan_params)
    let xTestData = DenseMatrix.f64((xTest as DenseMatrixOl).asRsMatrix('f64') as DenseMatrixF64)
    let score = accuracyScore(dbscan.predict(xTestData), yTest)
    assert(score >= 0)
  })

  it('serialize + deserialize', () => {
    let bostonData = loadBoston({ returnXY: true })
    let [x, y] = bostonData instanceof Array ? bostonData : []
    if (!(x && y)) {
      assert.fail('Expected both x and y to be defined')
    }
    let [xTrain, xTest, yTrain, yTest] = trainTestSplit(x, y, { testSize: 0.33 })

    let xData = DenseMatrix.f64((xTrain as DenseMatrixOl).asRsMatrix('f64') as DenseMatrixF64)
    let dbscan_params = new DbscanParams(xData)
    let dbscan = new DBSCANV2(dbscan_params)
    let xTestData = DenseMatrix.f64((xTest as DenseMatrixOl).asRsMatrix('f64') as DenseMatrixF64)
    let score1 = accuracyScore(dbscan.predict(xTestData), yTest)
    let serializedDBSCAN = dbscan.serialize()
    let deserializedDBSCAN = DBSCANV2.deserialize(serializedDBSCAN)
    let score2 = accuracyScore(deserializedDBSCAN.predict(xTestData), yTest)
    assert.equal(score1, score2)
  })
})
