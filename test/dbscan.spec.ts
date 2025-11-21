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
    const bostonData = loadBoston({ returnXY: true })
    const [x, y] = bostonData instanceof Array ? bostonData : []
    if (!(x && y)) {
      assert.fail('Expected both x and y to be defined')
    }
    const dbscan = new DBSCANBuilder(x).build()
  })

  describe('variants', () => {
    const bostonData = loadBoston({ returnXY: true })
    const [x, y] = bostonData instanceof Array ? bostonData : []
    if (!(x && y)) {
      assert.fail('Expected both x and y to be defined')
    }

    it('Euclidian', () => {
      const dbscanBuilder = new DBSCANBuilder(x)
      dbscanBuilder.distanceType = DistanceVariantType.Euclidian
      dbscanBuilder.build()
    })

    it('Hamming', () => {
      const digitsData = loadDigitsI32({ returnXY: true })
      const [xH, yH] = digitsData instanceof Array ? digitsData : []
      if (!(xH && yH)) {
        assert.fail('Expected both xH and yH to be defined')
      }
      const dbscanBuilderH = new DBSCANBuilder(xH)
      dbscanBuilderH.distanceType = DistanceVariantType.Hamming
      dbscanBuilderH.build()
    })

    it('Manhattan', () => {
      const dbscanBuilder = new DBSCANBuilder(x)
      dbscanBuilder.distanceType = DistanceVariantType.Manhattan
      dbscanBuilder.build()
    })

    it('Mahalanobis', () => {
      const dbscanBuilder = new DBSCANBuilder(x)
      dbscanBuilder.distanceType = DistanceVariantType.Mahalanobis
      dbscanBuilder.data = x
      dbscanBuilder.build()
    })

    it('Minkowski', () => {
      const dbscanBuilder = new DBSCANBuilder(x)
      dbscanBuilder.distanceType = DistanceVariantType.Minkowski
      dbscanBuilder.p = 1
      dbscanBuilder.build()
    })
  })

  it('predict', () => {
    const bostonData = loadBoston({ returnXY: true })
    const [x, y] = bostonData instanceof Array ? bostonData : []
    if (!(x && y)) {
      assert.fail('Expected both x and y to be defined')
    }
    const [xTrain, xTest, yTrain, yTest] = trainTestSplit(x, y, { testSize: 0.33 })

    const dbscanBuilder = new DBSCANBuilder(x)
    const dbscan = dbscanBuilder.build()
    const score = accuracyScore(dbscan.predict(xTest).field0, yTest)
    assert(score >= 0)
  })

  it('serialize + deserialize', () => {
    const bostonData = loadBoston({ returnXY: true })
    const [x, y] = bostonData instanceof Array ? bostonData : []
    if (!(x && y)) {
      assert.fail('Expected both x and y to be defined')
    }
    const [xTrain, xTest, yTrain, yTest] = trainTestSplit(x, y, { testSize: 0.33 })

    const dbscanBuilder = new DBSCANBuilder(x)
    const dbscan = dbscanBuilder.build()
    const score1 = accuracyScore(dbscan.predict(xTest).field0, yTest)
    const serializedDBSCAN = dbscan.serialize()
    const deserializedDBSCAN = DBSCAN.deserialize(serializedDBSCAN)
    const score2 = accuracyScore(deserializedDBSCAN.predict(xTest).field0, yTest)
    assert.equal(score1, score2)
  })
})
