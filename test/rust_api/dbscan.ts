import assert from 'assert'
import { coreBindings, dataset, modelSelection, metrics } from '../../src-js/index.js'

const { DBSCANBuilder, DBSCAN, DistanceVariantType } = coreBindings
const { loadBoston, loadDigitsI32 } = dataset
const { trainTestSplit } = modelSelection
const { accuracyScore } = metrics

export default () => {
  it('create', () => {
    const bostonData = loadBoston({ returnXY: true })
    const [x, y] = bostonData instanceof Array ? bostonData : []
    if (!(x && y)) {
      assert.fail('Expected both x and y to be defined')
    }
    const _ = new DBSCANBuilder(x).build()
  })

  describe('variants', () => {
    const bostonData = loadBoston({ returnXY: true })
    const [x, y] = bostonData instanceof Array ? bostonData : []
    if (!(x && y)) {
      assert.fail('Expected both x and y to be defined')
    }

    it('Euclidian', () => {
      const dbscanBuilder = new DBSCANBuilder(x)
      dbscanBuilder.withDistanceType(DistanceVariantType.Euclidian)
      dbscanBuilder.build()
    })

    it('Hamming', () => {
      const digitsData = loadDigitsI32({ returnXY: true })
      const [xH, yH] = digitsData instanceof Array ? digitsData : []
      if (!(xH && yH)) {
        assert.fail('Expected both xH and yH to be defined')
      }
      const dbscanBuilderH = new DBSCANBuilder(xH)
      dbscanBuilderH.withDistanceType(DistanceVariantType.Hamming)
      dbscanBuilderH.build()
    })

    it('Manhattan', () => {
      const dbscanBuilder = new DBSCANBuilder(x)
      dbscanBuilder.withDistanceType(DistanceVariantType.Manhattan)
      dbscanBuilder.build()
    })

    it('Mahalanobis', () => {
      const dbscanBuilder = new DBSCANBuilder(x)
      dbscanBuilder.withDistanceType(DistanceVariantType.Mahalanobis)
      dbscanBuilder.withData(x)
      dbscanBuilder.build()
    })

    it('Minkowski', () => {
      const dbscanBuilder = new DBSCANBuilder(x)
      dbscanBuilder.withDistanceType(DistanceVariantType.Minkowski)
      dbscanBuilder.withP(1)
      dbscanBuilder.build()
    })
  })

  it('predict', () => {
    const bostonData = loadBoston({ returnXY: true })
    const [x, y] = bostonData instanceof Array ? bostonData : []
    if (!(x && y)) {
      assert.fail('Expected both x and y to be defined')
    }
    const [, xTest, , yTest] = trainTestSplit(x, y, { testSize: 0.33 })

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
    const [, xTest, , yTest] = trainTestSplit(x, y, { testSize: 0.33 })

    const dbscanBuilder = new DBSCANBuilder(x)
    const dbscan = dbscanBuilder.build()
    const score1 = accuracyScore(dbscan.predict(xTest).field0, yTest)
    const serializedDBSCAN = dbscan.serialize()
    const deserializedDBSCAN = DBSCAN.deserialize(serializedDBSCAN)
    const score2 = accuracyScore(deserializedDBSCAN.predict(xTest).field0, yTest)
    assert.equal(score1, score2)
  })
}
