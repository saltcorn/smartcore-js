import assert from 'assert'
import { coreBindings, dataset, modelSelection, metrics, utilities } from '../../src-js/index.js'

const { RandomForestClassifierBuilder, RandomForestClassifier, TypedArrayType } = coreBindings
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
    const _ = new RandomForestClassifierBuilder(x, yWrapped).build()
  })

  it('predict', () => {
    const irisData = loadIris({ returnXY: true })
    const [x, y] = irisData instanceof Array ? irisData : []
    if (!(x && y)) {
      assert.fail('Expected both x and y to be defined')
    }
    const yWrapped = utilities.wrapTypedArray(utilities.arrayToTypedArray(y, { numberType: TypedArrayType.I32 }))
    const [, xTest, , yTest] = trainTestSplit(x, y, { testSize: 0.33 })

    const randomForestClassifierBuilder = new RandomForestClassifierBuilder(x, yWrapped)
    const randomForestClassifier = randomForestClassifierBuilder.build()
    const score = accuracyScore(randomForestClassifier.predict(xTest).field0, yTest, false)
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

    const randomForestClassifierBuilder = new RandomForestClassifierBuilder(x, yWrapped)
    const randomForestClassifier = randomForestClassifierBuilder.build()
    const score1 = accuracyScore(randomForestClassifier.predict(xTest).field0, yTest, false)
    const serializedRandomForestClassifier = randomForestClassifier.serialize()
    const deserializedRandomForestClassifier = RandomForestClassifier.deserialize(serializedRandomForestClassifier)
    const score2 = accuracyScore(deserializedRandomForestClassifier.predict(xTest).field0, yTest, false)
    assert.equal(score1, score2)
  })
}
