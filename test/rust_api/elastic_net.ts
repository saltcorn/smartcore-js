import { ElasticNetBuilder, ElasticNet } from '../../dist/core-bindings/index.js'
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
    const _ = new ElasticNetBuilder(x, yWrapped).build()
  })

  it('predict', () => {
    const bostonData = loadBoston({ returnXY: true })
    const [x, y] = bostonData instanceof Array ? bostonData : []
    if (!(x && y)) {
      assert.fail('Expected both x and y to be defined')
    }
    const yWrapped = utilities.wrapTypedArray(utilities.arrayToTypedArray(y))
    const [, xTest, , yTest] = trainTestSplit(x, y, { testSize: 0.33 })

    const elasticNetBuilder = new ElasticNetBuilder(x, yWrapped)
    const elasticNet = elasticNetBuilder.build()
    const score = accuracyScore(elasticNet.predict(xTest).field0, yTest)
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

    const elasticNetBuilder = new ElasticNetBuilder(x, yWrapped)
    const elasticNet = elasticNetBuilder.build()
    const score1 = accuracyScore(elasticNet.predict(xTest).field0, yTest)
    const serializedElasticNet = elasticNet.serialize()
    const deserializedElasticNet = ElasticNet.deserialize(serializedElasticNet)
    const score2 = accuracyScore(deserializedElasticNet.predict(xTest).field0, yTest)
    assert.equal(score1, score2)
  })
}
