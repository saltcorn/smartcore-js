import { ExtraTreesRegressorBuilder, ExtraTreesRegressor } from '../../dist/core-bindings/index.js'
import { loadIris } from '../../dist/dataset/index.js'
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
    const yWrapped = utilities.wrapTypedArray(utilities.arrayToTypedArray(y, { numberType: TypedArrayType.I32 }))
    const _ = new ExtraTreesRegressorBuilder(x, yWrapped).build()
  })

  it('predict', () => {
    const irisData = loadIris({ returnXY: true })
    const [x, y] = irisData instanceof Array ? irisData : []
    if (!(x && y)) {
      assert.fail('Expected both x and y to be defined')
    }
    const yWrapped = utilities.wrapTypedArray(utilities.arrayToTypedArray(y, { numberType: TypedArrayType.I32 }))
    const [, xTest, , yTest] = trainTestSplit(x, y, { testSize: 0.33 })

    const extraTreesRegressorBuilder = new ExtraTreesRegressorBuilder(x, yWrapped)
    const extraTreesRegressor = extraTreesRegressorBuilder.build()
    const score = accuracyScore(extraTreesRegressor.predict(xTest).field0, yTest)
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

    const extraTreesRegressorBuilder = new ExtraTreesRegressorBuilder(x, yWrapped)
    const extraTreesRegressor = extraTreesRegressorBuilder.build()
    const score1 = accuracyScore(extraTreesRegressor.predict(xTest).field0, yTest)
    const serializedExtraTreesRegressor = extraTreesRegressor.serialize()
    const deserializedExtraTreesRegressor = ExtraTreesRegressor.deserialize(serializedExtraTreesRegressor)
    const score2 = accuracyScore(deserializedExtraTreesRegressor.predict(xTest).field0, yTest)
    assert.equal(score1, score2)
  })
}
