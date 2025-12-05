import assert from 'assert'
import { coreBindings, modelSelection, metrics, utilities, dataset } from '../../src-js/index.js'

const { KNNRegressorBuilder, KNNRegressor, DistanceVariantType, TypedArrayType } = coreBindings
const { trainTestSplit } = modelSelection
const { accuracyScore } = metrics
const { loadBoston, loadDigitsI32 } = dataset

const isARM = process.arch === 'arm' || process.arch === 'arm64'
const TIMEOUT = isARM ? 20000 : 10000

export default () => {
  it('create', () => {
    const bostonData = loadBoston({ returnXY: true })
    const [x, y] = bostonData instanceof Array ? bostonData : []
    if (!(x && y)) {
      assert.fail('Expected both x and y to be defined')
    }
    const yWrapped = utilities.wrapTypedArray(Float32Array.from(y))

    const _ = new KNNRegressorBuilder(x, yWrapped).build()
  })

  describe('variants', () => {
    const bostonData = loadBoston({ returnXY: true })
    const [x, y] = bostonData instanceof Array ? bostonData : []
    if (!(x && y)) {
      assert.fail('Expected both x and y to be defined')
    }
    const yWrapped = utilities.wrapTypedArray(Float32Array.from(y))

    it('Euclidian', () => {
      const knnRegressorBuilder = new KNNRegressorBuilder(x, yWrapped)
      knnRegressorBuilder.withDistanceType(DistanceVariantType.Euclidian)
      knnRegressorBuilder.build()
    })

    it('Hamming', function (done) {
      this.timeout(TIMEOUT)
      const digitsData = loadDigitsI32({ returnXY: true })
      const [xH, yH] = digitsData instanceof Array ? digitsData : []
      if (!(xH && yH)) {
        assert.fail('Expected both xH and yH to be defined')
      }
      const yHWrapped = utilities.arrayToTypedArray(yH, { numberType: TypedArrayType.F32 })
      const knnRegressorBuilderH = new KNNRegressorBuilder(xH, yHWrapped)
      knnRegressorBuilderH.withDistanceType(DistanceVariantType.Hamming)
      knnRegressorBuilderH.build()
      done()
    })

    it('Manhattan', () => {
      const knnRegressorBuilder = new KNNRegressorBuilder(x, yWrapped)
      knnRegressorBuilder.withDistanceType(DistanceVariantType.Manhattan)
      knnRegressorBuilder.build()
    })

    it('Mahalanobis', () => {
      const knnRegressorBuilder = new KNNRegressorBuilder(x, yWrapped)
      knnRegressorBuilder.withDistanceType(DistanceVariantType.Mahalanobis)
      knnRegressorBuilder.withData(x)
      knnRegressorBuilder.build()
    })

    it('Minkowski', () => {
      const knnRegressorBuilder = new KNNRegressorBuilder(x, yWrapped)
      knnRegressorBuilder.withDistanceType(DistanceVariantType.Minkowski)
      knnRegressorBuilder.withP(1)
      knnRegressorBuilder.build()
    })
  })

  it('predict', () => {
    const bostonData = loadBoston({ returnXY: true })
    const [x, y] = bostonData instanceof Array ? bostonData : []
    if (!(x && y)) {
      assert.fail('Expected both x and y to be defined')
    }
    const yWrapped = utilities.wrapTypedArray(Float32Array.from(y))
    const [, xTest, , yTest] = trainTestSplit(x, y, { testSize: 0.33 })
    const knnRegressorBuilder = new KNNRegressorBuilder(x, yWrapped)
    const knnRegressor = knnRegressorBuilder.build()
    const score = accuracyScore(knnRegressor.predict(xTest).field0, yTest, false)
    assert(score >= 0)
  })

  it('serialize + deserialize', () => {
    const bostonData = loadBoston({ returnXY: true })
    const [x, y] = bostonData instanceof Array ? bostonData : []
    if (!(x && y)) {
      assert.fail('Expected both x and y to be defined')
    }
    const yWrapped = utilities.wrapTypedArray(Float32Array.from(y))
    const [, xTest, , yTest] = trainTestSplit(x, y, { testSize: 0.33 })
    const knnRegressorBuilder = new KNNRegressorBuilder(x, yWrapped)
    const knnRegressor = knnRegressorBuilder.build()
    const score1 = accuracyScore(knnRegressor.predict(xTest).field0, yTest, false)
    const serializedKNNRegressor = knnRegressor.serialize()
    const deserializedKNNRegressor = KNNRegressor.deserialize(serializedKNNRegressor)
    const score2 = accuracyScore(deserializedKNNRegressor.predict(xTest).field0, yTest, false)
    assert.equal(score1, score2)
  })
}
