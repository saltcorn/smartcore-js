import assert from 'assert'
import { coreBindings, dataset, modelSelection, metrics, utilities } from '../../src-js/index.js'

const { LogisticRegressionBuilder, LogisticRegression, TypedArrayType } = coreBindings
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
    const _ = new LogisticRegressionBuilder(x, yWrapped).build()
  })

  it('predict', () => {
    const irisData = loadIris({ returnXY: true })
    const [x, y] = irisData instanceof Array ? irisData : []
    if (!(x && y)) {
      assert.fail('Expected both x and y to be defined')
    }
    const yWrapped = utilities.wrapTypedArray(utilities.arrayToTypedArray(y, { numberType: TypedArrayType.I32 }))
    const [, xTest, , yTest] = trainTestSplit(x, y, { testSize: 0.33 })

    const logisticRegressionBuilder = new LogisticRegressionBuilder(x, yWrapped)
    const logisticRegression = logisticRegressionBuilder.build()
    const score = accuracyScore(logisticRegression.predict(xTest).field0, yTest, false)
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

    const logisticRegressionBuilder = new LogisticRegressionBuilder(x, yWrapped)
    const logisticRegression = logisticRegressionBuilder.build()
    const score1 = accuracyScore(logisticRegression.predict(xTest).field0, yTest, false)
    const serializedLogisticRegression = logisticRegression.serialize()
    const deserializedLogisticRegression = LogisticRegression.deserialize(serializedLogisticRegression)
    const score2 = accuracyScore(deserializedLogisticRegression.predict(xTest).field0, yTest, false)
    assert.equal(score1, score2)
  })
}
