import assert from 'assert'
import { coreBindings, dataset, modelSelection, metrics, utilities } from '../../src-js/index.js'

const { RandomForestRegressorBuilder, RandomForestRegressor, TypedArrayType } = coreBindings
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
    const _ = new RandomForestRegressorBuilder(x, yWrapped).build()
  })

  it('predict', () => {
    const irisData = loadIris({ returnXY: true })
    const [x, y] = irisData instanceof Array ? irisData : []
    if (!(x && y)) {
      assert.fail('Expected both x and y to be defined')
    }
    const yWrapped = utilities.wrapTypedArray(utilities.arrayToTypedArray(y, { numberType: TypedArrayType.I32 }))
    const [, xTest, , yTest] = trainTestSplit(x, y, { testSize: 0.33 })

    const randomForestRegressorBuilder = new RandomForestRegressorBuilder(x, yWrapped)
    const randomForestRegressor = randomForestRegressorBuilder.build()
    const score = accuracyScore(randomForestRegressor.predict(xTest).field0, yTest)
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

    const randomForestRegressorBuilder = new RandomForestRegressorBuilder(x, yWrapped)
    const randomForestRegressor = randomForestRegressorBuilder.build()
    const score1 = accuracyScore(randomForestRegressor.predict(xTest).field0, yTest)
    const serializedRandomForestRegressor = randomForestRegressor.serialize()
    const deserializedRandomForestRegressor = RandomForestRegressor.deserialize(serializedRandomForestRegressor)
    const score2 = accuracyScore(deserializedRandomForestRegressor.predict(xTest).field0, yTest)
    assert.equal(score1, score2)
  })
}
