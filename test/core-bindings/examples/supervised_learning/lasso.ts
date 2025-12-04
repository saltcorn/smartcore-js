import assert from 'assert'
import { dataset, metrics, linearModel, modelSelection } from '../../../../src-js/index.js'

const { trainTestSplit } = modelSelection
const { meanSquaredError } = metrics
const { Lasso } = linearModel

export default () => {
  it('Least Absolute Shrinkage and Selection Operator (LASSO)', () => {
    const bostonData = dataset.loadBoston({ returnXY: true })
    if (!Array.isArray(bostonData)) assert.fail('Expected bostonData to be an Array')
    const [x, y] = bostonData
    const [, xTest, , yTest] = trainTestSplit(x, y, { testSize: 0.2, shuffle: true })
    const yHatLasso = new Lasso({ alpha: 0.5 }).fit(x, y).predict(xTest)
    const score = meanSquaredError(yTest, yHatLasso)
    assert(score)
  })
}
