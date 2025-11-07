import {
  DbscanParams,
  DBSCANV2,
  DenseMatrix,
  DenseMatrixF64,
  DistanceName,
  DenseMatrixI32,
} from '../dist/core-bindings/index.js'
import { loadBoston, loadDigits, loadDigitsI32 } from '../dist/dataset/index.js'
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
    let dbscanParams = new DbscanParams(xData)
    dbscanParams.distanceType = DistanceName.Euclidian
    new DBSCANV2(dbscanParams)

    // Hamming
    let digitsData = loadDigitsI32({ returnXY: true })
    let [xH, yH] = digitsData instanceof Array ? digitsData : []
    if (!(xH && yH)) {
      assert.fail('Expected both xH and yH to be defined')
    }
    let xDataH = DenseMatrix.i32(xH.asRsMatrix('i32') as DenseMatrixI32)
    let dbscanParamsH = new DbscanParams(xDataH)
    dbscanParamsH.distanceType = DistanceName.Hamming
    let dbscan = new DBSCANV2(dbscanParamsH)

    // Manhattan
    dbscanParams.distanceType = DistanceName.Manhattan
    new DBSCANV2(dbscanParams)

    // Mahalanobis
    dbscanParams.distanceType = DistanceName.Mahalanobis
    dbscanParams.data = xData
    new DBSCANV2(dbscanParams)

    // Minkowski
    dbscanParams.distanceType = DistanceName.Minkowski
    dbscanParams.p = 1
    new DBSCANV2(dbscanParams)
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
