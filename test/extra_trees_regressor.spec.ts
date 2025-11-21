import {
  ExtraTreesRegressorBuilder,
  ExtraTreesRegressor,
  DenseMatrix,
  DenseMatrixF64,
  DistanceVariantType,
  DenseMatrixI32,
} from '../dist/core-bindings/index.js'
import { loadBoston, loadDigits, loadDigitsI32 } from '../dist/dataset/v2.js'
import assert from 'assert'
import { trainTestSplit } from '../dist/model_selection/index.js'
import { accuracyScore } from '../dist/metrics/index.js'
import { utilities } from '../src-js/index.js'

describe('ExtraTreesRegressor', () => {
  it('create', () => {
    const bostonData = loadBoston({ returnXY: true })
    const [x, y] = bostonData instanceof Array ? bostonData : []
    if (!(x && y)) {
      assert.fail('Expected both x and y to be defined')
    }
    const yWrapped = utilities.wrapTypedArray(utilities.arrayToTypedArray(y))
    const _ = new ExtraTreesRegressorBuilder(x, yWrapped).build()
  })

  it('predict', () => {
    const bostonData = loadBoston({ returnXY: true })
    const [x, y] = bostonData instanceof Array ? bostonData : []
    if (!(x && y)) {
      assert.fail('Expected both x and y to be defined')
    }
    const yWrapped = utilities.wrapTypedArray(utilities.arrayToTypedArray(y))
    const [, xTest, , yTest] = trainTestSplit(x, y, { testSize: 0.33 })

    const extraTreesRegressorBuilder = new ExtraTreesRegressorBuilder(x, yWrapped)
    const extraTreesRegressor = extraTreesRegressorBuilder.build()
    const score = accuracyScore(extraTreesRegressor.predict(xTest).field0, yTest)
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

    const extraTreesRegressorBuilder = new ExtraTreesRegressorBuilder(x, yWrapped)
    const extraTreesRegressor = extraTreesRegressorBuilder.build()
    const score1 = accuracyScore(extraTreesRegressor.predict(xTest).field0, yTest)
    const serializedExtraTreesRegressor = extraTreesRegressor.serialize()
    const deserializedExtraTreesRegressor = ExtraTreesRegressor.deserialize(serializedExtraTreesRegressor)
    const score2 = accuracyScore(deserializedExtraTreesRegressor.predict(xTest).field0, yTest)
    assert.equal(score1, score2)
  })
})
