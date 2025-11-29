import {
  KNNClassifierBuilder,
  KNNClassifier,
  DistanceVariantType,
  TypedArrayType,
} from '../../dist/core-bindings/index.js'
import assert from 'assert'
import { trainTestSplit } from '../../dist/model_selection/index.js'
import { accuracyScore } from '../../dist/metrics/index.js'
import { utilities } from '../../dist/index.js'
import { loadBoston, loadDigitsI32 } from '../../dist/dataset/index.js'

export default () => {
  it('create', () => {
    const bostonData = loadBoston({ returnXY: true })
    const [x, y] = bostonData instanceof Array ? bostonData : []
    if (!(x && y)) {
      assert.fail('Expected both x and y to be defined')
    }
    const yWrapped = utilities.wrapTypedArray(Int32Array.from(y))

    const _ = new KNNClassifierBuilder(x, yWrapped).build()
  })

  describe('variants', () => {
    const bostonData = loadBoston({ returnXY: true })
    const [x, y] = bostonData instanceof Array ? bostonData : []
    if (!(x && y)) {
      assert.fail('Expected both x and y to be defined')
    }
    const yWrapped = utilities.wrapTypedArray(Int32Array.from(y))

    it('Euclidian', () => {
      const knnClassifierBuilder = new KNNClassifierBuilder(x, yWrapped)
      knnClassifierBuilder.withDistanceType(DistanceVariantType.Euclidian)
      knnClassifierBuilder.build()
    })

    it('Hamming', () => {
      const digitsData = loadDigitsI32({ returnXY: true })
      const [xH, yH] = digitsData instanceof Array ? digitsData : []
      if (!(xH && yH)) {
        assert.fail('Expected both xH and yH to be defined')
      }
      const yHWrapped = utilities.wrapTypedArray(utilities.arrayToTypedArray(yH, { numberType: TypedArrayType.I32 }))
      const knnClassifierBuilderH = new KNNClassifierBuilder(xH, yHWrapped)
      knnClassifierBuilderH.withDistanceType(DistanceVariantType.Hamming)
      knnClassifierBuilderH.build()
    })

    it('Manhattan', () => {
      const knnClassifierBuilder = new KNNClassifierBuilder(x, yWrapped)
      knnClassifierBuilder.withDistanceType(DistanceVariantType.Manhattan)
      knnClassifierBuilder.build()
    })

    it('Mahalanobis', () => {
      const knnClassifierBuilder = new KNNClassifierBuilder(x, yWrapped)
      knnClassifierBuilder.withDistanceType(DistanceVariantType.Mahalanobis)
      knnClassifierBuilder.withData(x)
      knnClassifierBuilder.build()
    })

    it('Minkowski', () => {
      const knnClassifierBuilder = new KNNClassifierBuilder(x, yWrapped)
      knnClassifierBuilder.withDistanceType(DistanceVariantType.Minkowski)
      knnClassifierBuilder.withP(1)
      knnClassifierBuilder.build()
    })
  })

  it('predict', () => {
    const bostonData = loadBoston({ returnXY: true })
    const [x, y] = bostonData instanceof Array ? bostonData : []
    if (!(x && y)) {
      assert.fail('Expected both x and y to be defined')
    }
    const yWrapped = utilities.wrapTypedArray(Int32Array.from(y))
    const [, xTest, , yTest] = trainTestSplit(x, y, { testSize: 0.33 })
    const knnClassifierBuilder = new KNNClassifierBuilder(x, yWrapped)
    const knnClassifier = knnClassifierBuilder.build()
    const score = accuracyScore(knnClassifier.predict(xTest).field0, yTest)
    assert(score >= 0)
  })

  it('serialize + deserialize', () => {
    const bostonData = loadBoston({ returnXY: true })
    const [x, y] = bostonData instanceof Array ? bostonData : []
    if (!(x && y)) {
      assert.fail('Expected both x and y to be defined')
    }
    const yWrapped = utilities.wrapTypedArray(Int32Array.from(y))
    const [, xTest, , yTest] = trainTestSplit(x, y, { testSize: 0.33 })
    const knnClassifierBuilder = new KNNClassifierBuilder(x, yWrapped)
    const knnClassifier = knnClassifierBuilder.build()
    const score1 = accuracyScore(knnClassifier.predict(xTest).field0, yTest)
    const serializedKNNClassifier = knnClassifier.serialize()
    const deserializedKNNClassifier = KNNClassifier.deserialize(serializedKNNClassifier)
    const score2 = accuracyScore(deserializedKNNClassifier.predict(xTest).field0, yTest)
    assert.equal(score1, score2)
  })
}
