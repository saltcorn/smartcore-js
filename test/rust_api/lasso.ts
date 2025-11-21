import { LassoBuilder, Lasso } from '../../dist/core-bindings/index.js'
import { loadBoston } from '../../dist/dataset/v2.js'
import assert from 'assert'
import { trainTestSplit } from '../../dist/model_selection/index.js'
import { accuracyScore } from '../../dist/metrics/index.js'
import { utilities } from '../../src-js/index.js'

export default () => {
  it('create', () => {
    const bostonData = loadBoston({ returnXY: true })
    const [x, y] = bostonData instanceof Array ? bostonData : []
    if (!(x && y)) {
      assert.fail('Expected both x and y to be defined')
    }
    const yWrapped = utilities.wrapTypedArray(utilities.arrayToTypedArray(y))
    const _ = new LassoBuilder(x, yWrapped).build()
  })

  it('predict', () => {
    const bostonData = loadBoston({ returnXY: true })
    const [x, y] = bostonData instanceof Array ? bostonData : []
    if (!(x && y)) {
      assert.fail('Expected both x and y to be defined')
    }
    const yWrapped = utilities.wrapTypedArray(utilities.arrayToTypedArray(y))
    const [, xTest, , yTest] = trainTestSplit(x, y, { testSize: 0.33 })

    const lassoBuilder = new LassoBuilder(x, yWrapped)
    const lasso = lassoBuilder.build()
    const score = accuracyScore(lasso.predict(xTest).field0, yTest)
    assert(score >= 0)
  })

  it('serialize + deserialize', () => {
    const bostonData = loadBoston({ returnXY: true })
    const [x, y] = bostonData instanceof Array ? bostonData : []
    if (!(x && y)) {
      assert.fail('Expected both x and y to be defined')
    }
    const yWrapped = utilities.wrapTypedArray(utilities.arrayToTypedArray(y))
    const [, xTest, , yTest] = trainTestSplit(x, y, { testSize: 0.33 })

    const lassoBuilder = new LassoBuilder(x, yWrapped)
    const lasso = lassoBuilder.build()
    const score1 = accuracyScore(lasso.predict(xTest).field0, yTest)
    const serializedLasso = lasso.serialize()
    const deserializedLasso = Lasso.deserialize(serializedLasso)
    const score2 = accuracyScore(deserializedLasso.predict(xTest).field0, yTest)
    assert.equal(score1, score2)
  })
}
