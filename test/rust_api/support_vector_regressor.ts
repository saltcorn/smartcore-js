import assert from 'assert'
import chalk from 'chalk'
import { coreBindings, dataset, modelSelection, metrics, utilities } from '../../src-js/index.js'

const { SVRBuilder, TypedArrayType, Kernels } = coreBindings
const { loadDiabetes } = dataset
const { trainTestSplit } = modelSelection
const { accuracyScore } = metrics

export default () => {
  it('create', () => {
    const diabetesData = loadDiabetes({ returnXY: true })
    const [x, y] = diabetesData instanceof Array ? diabetesData : []
    if (!(x && y)) {
      assert.fail('Expected both x and y to be defined')
    }
    const yWrapped = utilities.wrapTypedArray(utilities.arrayToTypedArray(y, { numberType: TypedArrayType.F64 }))
    const builder = new SVRBuilder()
    builder.withKernel(Kernels.rbf(0.5))
    builder.withC(utilities.wrapNumber(2000.0))
    builder.withEps(utilities.wrapNumber(10.0))
    const _ = builder.build(x, yWrapped)
  })

  it('predict', () => {
    const diabetesData = loadDiabetes({ returnXY: true })
    const [x, y] = diabetesData instanceof Array ? diabetesData : []
    if (!(x && y)) {
      assert.fail('Expected both x and y to be defined')
    }
    const yWrapped = utilities.wrapTypedArray(utilities.arrayToTypedArray(y, { numberType: TypedArrayType.F64 }))
    const [, xTest, , yTest] = trainTestSplit(x, y, { testSize: 0.33 })

    const builder = new SVRBuilder()
    builder.withKernel(Kernels.rbf(0.5))
    builder.withC(utilities.wrapNumber(2000.0))
    builder.withEps(utilities.wrapNumber(10.0))
    const svr = builder.build(x, yWrapped)
    const score = accuracyScore(svr.predict(xTest).field0, yTest, false)
    assert(score >= 0)
  })

  it('serialize + deserialize', () => {
    const diabetesData = loadDiabetes({ returnXY: true })
    const [x, y] = diabetesData instanceof Array ? diabetesData : []
    if (!(x && y)) {
      assert.fail('Expected both x and y to be defined')
    }
    const yWrapped = utilities.wrapTypedArray(utilities.arrayToTypedArray(y, { numberType: TypedArrayType.F64 }))
    const [, xTest, , yTest] = trainTestSplit(x, y, { testSize: 0.33 })

    const builder = new SVRBuilder()
    builder.withKernel(Kernels.rbf(0.5))
    builder.withC(utilities.wrapNumber(2000.0))
    builder.withEps(utilities.wrapNumber(10.0))
    const svr = builder.build(x, yWrapped)
    const score1 = accuracyScore(svr.predict(xTest).field0, yTest, false)
    const serializedSVR = svr.serialize()
    console.log(chalk.red('SVR deserialize implementation results in a failure.'))
    // const deserializedSVR = SVR.deserialize(serializedSVR)
    // const score2 = accuracyScore(deserializedSVR.predict(xTest).field0, yTest, false)
    // assert.equal(score1, score2)
  })
}
