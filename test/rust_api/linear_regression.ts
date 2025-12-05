import assert from 'assert'
import { coreBindings, dataset, modelSelection, metrics, utilities } from '../../src-js/index.js'

const { LinearRegressionBuilder, LinearRegression, TypedArrayType } = coreBindings
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
    const yWrapped = utilities.arrayToTypedArray(y, { numberType: TypedArrayType.I32 })
    const _ = new LinearRegressionBuilder(x, yWrapped).build()
  })

  it('predict', () => {
    const irisData = loadIris({ returnXY: true })
    const [x, y] = irisData instanceof Array ? irisData : []
    if (!(x && y)) {
      assert.fail('Expected both x and y to be defined')
    }
    const yWrapped = utilities.arrayToTypedArray(y, { numberType: TypedArrayType.I32 })
    const [, xTest, , yTest] = trainTestSplit(x, y, { testSize: 0.33 })

    const linearRegressionBuilder = new LinearRegressionBuilder(x, yWrapped)
    const linearRegression = linearRegressionBuilder.build()
    const score = accuracyScore(linearRegression.predict(xTest).field0, yTest, false)
    assert(score >= 0)
  })

  it('serialize + deserialize', () => {
    const irisData = loadIris({ returnXY: true })
    const [x, y] = irisData instanceof Array ? irisData : []
    if (!(x && y)) {
      assert.fail('Expected both x and y to be defined')
    }
    const yWrapped = utilities.arrayToTypedArray(y, { numberType: TypedArrayType.I32 })
    const [, xTest, , yTest] = trainTestSplit(x, y, { testSize: 0.33 })

    const linearRegressionBuilder = new LinearRegressionBuilder(x, yWrapped)
    const linearRegression = linearRegressionBuilder.build()
    const score1 = accuracyScore(linearRegression.predict(xTest).field0, yTest, false)
    const serializedLinearRegression = linearRegression.serialize()
    const deserializedLinearRegression = LinearRegression.deserialize(serializedLinearRegression)
    const score2 = accuracyScore(deserializedLinearRegression.predict(xTest).field0, yTest, false)
    assert.equal(score1, score2)
  })
}
