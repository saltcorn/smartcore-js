import {
  DBSCANBuilder,
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
    let dbscan = new DBSCANBuilder(xData).build()
  })

  describe('variants', () => {
    let bostonData = loadBoston({ returnXY: true })
    let [x, y] = bostonData instanceof Array ? bostonData : []
    if (!(x && y)) {
      assert.fail('Expected both x and y to be defined')
    }
    let xData = DenseMatrix.f64(x.asRsMatrix('f64') as DenseMatrixF64)

    it('Euclidian', () => {
      let dbscanBuilder = new DBSCANBuilder(xData)
      dbscanBuilder.distanceType = DistanceName.Euclidian
      dbscanBuilder.build()
    })

    it('Hamming', () => {
      let digitsData = loadDigitsI32({ returnXY: true })
      let [xH, yH] = digitsData instanceof Array ? digitsData : []
      if (!(xH && yH)) {
        assert.fail('Expected both xH and yH to be defined')
      }
      let xDataH = DenseMatrix.i32(xH.asRsMatrix('i32') as DenseMatrixI32)
      let dbscanBuilderH = new DBSCANBuilder(xDataH)
      dbscanBuilderH.distanceType = DistanceName.Hamming
      dbscanBuilderH.build()
    })

    it('Manhattan', () => {
      let dbscanBuilder = new DBSCANBuilder(xData)
      dbscanBuilder.distanceType = DistanceName.Manhattan
      dbscanBuilder.build()
    })

    it('Mahalanobis', () => {
      let dbscanBuilder = new DBSCANBuilder(xData)
      dbscanBuilder.distanceType = DistanceName.Mahalanobis
      dbscanBuilder.data = xData
      dbscanBuilder.build()
    })

    it('Minkowski', () => {
      let dbscanBuilder = new DBSCANBuilder(xData)
      dbscanBuilder.distanceType = DistanceName.Minkowski
      dbscanBuilder.p = 1
      dbscanBuilder.build()
    })
  })

  it('predict', () => {
    let bostonData = loadBoston({ returnXY: true })
    let [x, y] = bostonData instanceof Array ? bostonData : []
    if (!(x && y)) {
      assert.fail('Expected both x and y to be defined')
    }
    let [xTrain, xTest, yTrain, yTest] = trainTestSplit(x, y, { testSize: 0.33 })

    let xData = DenseMatrix.f64((xTrain as DenseMatrixOl).asRsMatrix('f64') as DenseMatrixF64)
    let dbscanBuilder = new DBSCANBuilder(xData)
    let dbscan = dbscanBuilder.build()
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
    let dbscanBuilder = new DBSCANBuilder(xData)
    let dbscan = dbscanBuilder.build()
    let xTestData = DenseMatrix.f64((xTest as DenseMatrixOl).asRsMatrix('f64') as DenseMatrixF64)
    let score1 = accuracyScore(dbscan.predict(xTestData), yTest)
    let serializedDBSCAN = dbscan.serialize()
    let deserializedDBSCAN = DBSCANV2.deserialize(serializedDBSCAN)
    let score2 = accuracyScore(deserializedDBSCAN.predict(xTestData), yTest)
    assert.equal(score1, score2)
  })
})
