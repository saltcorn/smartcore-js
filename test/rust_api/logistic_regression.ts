import { LogisticRegressionBuilder, LogisticRegression } from '../../dist/core-bindings/index.js'
import { loadIris } from '../../dist/dataset/v2.js'
import assert from 'assert'
import { trainTestSplit } from '../../dist/model_selection/index.js'
import { accuracyScore } from '../../dist/metrics/index.js'
import { utilities } from '../../src-js/index.js'

export default () => {
  it('create', () => {
    const irisData = loadIris({ returnXY: true })
    const [x, y] = irisData instanceof Array ? irisData : []
    if (!(x && y)) {
      assert.fail('Expected both x and y to be defined')
    }
    const yWrapped = utilities.wrapTypedArray(utilities.arrayToTypedArray(y))
    const _ = new LogisticRegressionBuilder(x, yWrapped).build()
  })

  it('predict', () => {
    const irisData = loadIris({ returnXY: true })
    const [x, y] = irisData instanceof Array ? irisData : []
    if (!(x && y)) {
      assert.fail('Expected both x and y to be defined')
    }
    const yWrapped = utilities.wrapTypedArray(utilities.arrayToTypedArray(y))
    const [, xTest, , yTest] = trainTestSplit(x, y, { testSize: 0.33 })

    const linearRegressionBuilder = new LogisticRegressionBuilder(x, yWrapped)
    const linearRegression = linearRegressionBuilder.build()
    const score = accuracyScore(linearRegression.predict(xTest).field0, yTest)
    assert(score >= 0)
  })

  it('serialize + deserialize', () => {
    const irisData = loadIris({ returnXY: true })
    const [x, y] = irisData instanceof Array ? irisData : []
    if (!(x && y)) {
      assert.fail('Expected both x and y to be defined')
    }
    const yWrapped = utilities.wrapTypedArray(utilities.arrayToTypedArray(y))
    const [, xTest, , yTest] = trainTestSplit(x, y, { testSize: 0.33 })

    const linearRegressionBuilder = new LogisticRegressionBuilder(x, yWrapped)
    const linearRegression = linearRegressionBuilder.build()
    const score1 = accuracyScore(linearRegression.predict(xTest).field0, yTest)
    const serializedLogisticRegression = linearRegression.serialize()
    const deserializedLogisticRegression = LogisticRegression.deserialize(serializedLogisticRegression)
    const score2 = accuracyScore(deserializedLogisticRegression.predict(xTest).field0, yTest)
    assert.equal(score1, score2)
  })
}
