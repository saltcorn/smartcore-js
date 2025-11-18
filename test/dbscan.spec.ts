import {
  DBSCANBuilder,
  DBSCAN,
  DenseMatrix,
  DenseMatrixF64,
  DistanceVariantType,
  DenseMatrixI32,
} from '../dist/core-bindings/index.js'
import { loadBoston, loadDigits, loadDigitsI32 } from '../dist/dataset/v2.js'
import assert from 'assert'
import { trainTestSplit } from '../dist/model_selection/index.js'
import { accuracyScore } from '../dist/metrics/index.js'

describe('DBSCAN', () => {
  it('create', () => {
    let bostonData = loadBoston({ returnXY: true })
    let [x, y] = bostonData instanceof Array ? bostonData : []
    if (!(x && y)) {
      assert.fail('Expected both x and y to be defined')
    }
    let dbscan = new DBSCANBuilder(x).build()
  })

  describe('variants', () => {
    let bostonData = loadBoston({ returnXY: true })
    let [x, y] = bostonData instanceof Array ? bostonData : []
    if (!(x && y)) {
      assert.fail('Expected both x and y to be defined')
    }

    it('Euclidian', () => {
      let dbscanBuilder = new DBSCANBuilder(x)
      dbscanBuilder.distanceType = DistanceVariantType.Euclidian
      dbscanBuilder.build()
    })

    it('Hamming', () => {
      let digitsData = loadDigitsI32({ returnXY: true })
      let [xH, yH] = digitsData instanceof Array ? digitsData : []
      if (!(xH && yH)) {
        assert.fail('Expected both xH and yH to be defined')
      }
      let dbscanBuilderH = new DBSCANBuilder(xH)
      dbscanBuilderH.distanceType = DistanceVariantType.Hamming
      dbscanBuilderH.build()
    })

    it('Manhattan', () => {
      let dbscanBuilder = new DBSCANBuilder(x)
      dbscanBuilder.distanceType = DistanceVariantType.Manhattan
      dbscanBuilder.build()
    })

    it('Mahalanobis', () => {
      let dbscanBuilder = new DBSCANBuilder(x)
      dbscanBuilder.distanceType = DistanceVariantType.Mahalanobis
      dbscanBuilder.data = x
      dbscanBuilder.build()
    })

    it('Minkowski', () => {
      let dbscanBuilder = new DBSCANBuilder(x)
      dbscanBuilder.distanceType = DistanceVariantType.Minkowski
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

    let dbscanBuilder = new DBSCANBuilder(x)
    let dbscan = dbscanBuilder.build()
    let score = accuracyScore(dbscan.predict(xTest).field0, yTest)
    assert(score >= 0)
  })

  it('serialize + deserialize', () => {
    let bostonData = loadBoston({ returnXY: true })
    let [x, y] = bostonData instanceof Array ? bostonData : []
    if (!(x && y)) {
      assert.fail('Expected both x and y to be defined')
    }
    let [xTrain, xTest, yTrain, yTest] = trainTestSplit(x, y, { testSize: 0.33 })

    let dbscanBuilder = new DBSCANBuilder(x)
    let dbscan = dbscanBuilder.build()
    let score1 = accuracyScore(dbscan.predict(xTest).field0, yTest)
    let serializedDBSCAN = dbscan.serialize()
    let deserializedDBSCAN = DBSCAN.deserialize(serializedDBSCAN)
    let score2 = accuracyScore(deserializedDBSCAN.predict(xTest).field0, yTest)
    assert.equal(score1, score2)
  })
})
