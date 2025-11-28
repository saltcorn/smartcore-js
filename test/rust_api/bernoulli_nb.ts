import { BernoulliNBBuilder, BernoulliNB } from '../../dist/core-bindings/index.js'
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
    const _ = new BernoulliNBBuilder(x, yWrapped).build()
  })

  it('predict', () => {
    const irisData = loadIris({ returnXY: true })
    const [x, y] = irisData instanceof Array ? irisData : []
    if (!(x && y)) {
      assert.fail('Expected both x and y to be defined')
    }
    const yWrapped = utilities.wrapTypedArray(utilities.arrayToTypedArray(y, { numberType: TypedArrayType.U32 }))
    const [, xTest, , yTest] = trainTestSplit(x, y, { testSize: 0.33 })

    const bernoulliNBBuilder = new BernoulliNBBuilder(x, yWrapped)
    const bernoulliNB = bernoulliNBBuilder.build()
    const score = accuracyScore(bernoulliNB.predict(xTest).field0, yTest)
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

    const bernoulliNBBuilder = new BernoulliNBBuilder(x, yWrapped)
    const bernoulliNB = bernoulliNBBuilder.build()
    const score1 = accuracyScore(bernoulliNB.predict(xTest).field0, yTest)
    const serializedBernoulliNB = bernoulliNB.serialize()
    const deserializedBernoulliNB = BernoulliNB.deserialize(serializedBernoulliNB)
    const score2 = accuracyScore(deserializedBernoulliNB.predict(xTest).field0, yTest)
    assert.equal(score1, score2)
  })
}
