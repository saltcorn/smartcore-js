import { RidgeRegressionBuilder, RidgeRegression } from '../../dist/core-bindings/index.js'
import { loadBoston } from '../../dist/dataset/v2.js'
import assert from 'assert'
import { trainTestSplit } from '../../dist/model_selection/index.js'
import { accuracyScore } from '../../dist/metrics/index.js'
import { utilities } from '../../src-js/index.js'

export default () => {
  it('create', () => {
    const irisData = loadBoston({ returnXY: true })
    const [x, y] = irisData instanceof Array ? irisData : []
    if (!(x && y)) {
      assert.fail('Expected both x and y to be defined')
    }
    const yWrapped = utilities.wrapTypedArray(utilities.arrayToTypedArray(y))
    const _ = new RidgeRegressionBuilder(x, yWrapped).build()
  })

  it('predict', () => {
    const irisData = loadBoston({ returnXY: true })
    const [x, y] = irisData instanceof Array ? irisData : []
    if (!(x && y)) {
      assert.fail('Expected both x and y to be defined')
    }
    const yWrapped = utilities.wrapTypedArray(utilities.arrayToTypedArray(y))
    const [, xTest, , yTest] = trainTestSplit(x, y, { testSize: 0.33 })

    const ridgeRegressionBuilder = new RidgeRegressionBuilder(x, yWrapped)
    const ridgeRegression = ridgeRegressionBuilder.build()
    const score = accuracyScore(ridgeRegression.predict(xTest).field0, yTest)
    assert(score >= 0)
  })

  it('serialize + deserialize', () => {
    const irisData = loadBoston({ returnXY: true })
    const [x, y] = irisData instanceof Array ? irisData : []
    if (!(x && y)) {
      assert.fail('Expected both x and y to be defined')
    }
    const yWrapped = utilities.wrapTypedArray(utilities.arrayToTypedArray(y))
    const [, xTest, , yTest] = trainTestSplit(x, y, { testSize: 0.33 })

    const ridgeRegressionBuilder = new RidgeRegressionBuilder(x, yWrapped)
    const ridgeRegression = ridgeRegressionBuilder.build()
    const score1 = accuracyScore(ridgeRegression.predict(xTest).field0, yTest)
    const serializedRidgeRegression = ridgeRegression.serialize()
    const deserializedRidgeRegression = RidgeRegression.deserialize(serializedRidgeRegression)
    const score2 = accuracyScore(deserializedRidgeRegression.predict(xTest).field0, yTest)
    assert.equal(score1, score2)
  })
}
