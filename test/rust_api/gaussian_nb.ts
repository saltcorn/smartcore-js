import { GaussianNBBuilder, GaussianNB } from '../../dist/core-bindings/index.js'
import { loadIris } from '../../dist/dataset/v2.js'
import assert from 'assert'
import { trainTestSplit } from '../../dist/model_selection/index.js'
import { accuracyScore } from '../../dist/metrics/index.js'
import { utilities } from '../../src-js/index.js'
import { TypedArrayType } from '../../src-js/core-bindings/index.js'

export default () => {
  it('create', () => {
    const irisData = loadIris({ returnXY: true })
    const [x, y] = irisData instanceof Array ? irisData : []
    if (!(x && y)) {
      assert.fail('Expected both x and y to be defined')
    }
    const yWrapped = utilities.wrapTypedArray(utilities.arrayToTypedArray(y, { numberType: TypedArrayType.U32 }))
    const _ = new GaussianNBBuilder(x, yWrapped).build()
  })

  it('predict', () => {
    const irisData = loadIris({ returnXY: true })
    const [x, y] = irisData instanceof Array ? irisData : []
    if (!(x && y)) {
      assert.fail('Expected both x and y to be defined')
    }
    const yWrapped = utilities.wrapTypedArray(utilities.arrayToTypedArray(y, { numberType: TypedArrayType.U32 }))
    const [, xTest, , yTest] = trainTestSplit(x, y, { testSize: 0.33 })

    const gaussianNBBuilder = new GaussianNBBuilder(x, yWrapped)
    const gaussianNB = gaussianNBBuilder.build()
    const score = accuracyScore(gaussianNB.predict(xTest).field0, yTest)
    assert(score >= 0)
  })

  it('serialize + deserialize', () => {
    const irisData = loadIris({ returnXY: true })
    const [x, y] = irisData instanceof Array ? irisData : []
    if (!(x && y)) {
      assert.fail('Expected both x and y to be defined')
    }
    const yWrapped = utilities.wrapTypedArray(utilities.arrayToTypedArray(y, { numberType: TypedArrayType.U32 }))
    const [, xTest, , yTest] = trainTestSplit(x, y, { testSize: 0.33 })

    const gaussianNBBuilder = new GaussianNBBuilder(x, yWrapped)
    const gaussianNB = gaussianNBBuilder.build()
    const score1 = accuracyScore(gaussianNB.predict(xTest).field0, yTest)
    const serializedGaussianNB = gaussianNB.serialize()
    const deserializedGaussianNB = GaussianNB.deserialize(serializedGaussianNB)
    const score2 = accuracyScore(deserializedGaussianNB.predict(xTest).field0, yTest)
    assert.equal(score1, score2)
  })
}
