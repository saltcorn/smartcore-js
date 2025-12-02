import assert from 'assert'
import { coreBindings, dataset, modelSelection, metrics, utilities } from '../../src-js/index.js'

const { ElasticNetBuilder, ElasticNet, TypedArrayType } = coreBindings
const { loadIris } = dataset
const { trainTestSplit } = modelSelection
const { accuracyScore } = metrics

export default () => {
  it('create', () => {
    const irisData = loadIris({ returnXY: true })
    const [x, y] = irisData instanceof Array ? irisData : []
    if (!(x && y)) {
      assert.fail('Expected both x and y to be defined')
    }
    const yWrapped = utilities.wrapTypedArray(utilities.arrayToTypedArray(y, { numberType: TypedArrayType.I32 }))
    const _ = new ElasticNetBuilder(x, yWrapped).build()
  })

  it('predict', () => {
    const irisData = loadIris({ returnXY: true })
    const [x, y] = irisData instanceof Array ? irisData : []
    if (!(x && y)) {
      assert.fail('Expected both x and y to be defined')
    }
    const yWrapped = utilities.wrapTypedArray(utilities.arrayToTypedArray(y, { numberType: TypedArrayType.I32 }))
    const [, xTest, , yTest] = trainTestSplit(x, y, { testSize: 0.33 })

    const elasticNetBuilder = new ElasticNetBuilder(x, yWrapped)
    const elasticNet = elasticNetBuilder.build()
    const score = accuracyScore(elasticNet.predict(xTest).field0, yTest)
    assert(score >= 0)
  })

  it('serialize + deserialize', () => {
    const irisData = loadIris({ returnXY: true })
    const [x, y] = irisData instanceof Array ? irisData : []
    if (!(x && y)) {
      assert.fail('Expected both x and y to be defined')
    }
    const yWrapped = utilities.wrapTypedArray(utilities.arrayToTypedArray(y, { numberType: TypedArrayType.I32 }))
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
