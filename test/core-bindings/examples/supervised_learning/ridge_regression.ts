import assert from 'assert'
import { dataset, linearModel, metrics, modelSelection } from '../../../../src-js/index.js'

const { RidgeRegression } = linearModel
const { meanSquaredErrorScore } = metrics
const { trainTestSplit } = modelSelection

export default () => {
  it('Ridge Regression', () => {
    const bostonData = dataset.loadBoston({ returnXY: true })
    if (!Array.isArray(bostonData)) assert.fail('Expected bostonData to be an Array')
    const [x, y] = bostonData
    const [, xTest, , yTest] = trainTestSplit(x, y, { testSize: 0.2, shuffle: true })
    const yHatRr = new RidgeRegression({ alpha: 0.5 }).fit(x, y).predict(xTest)
    const score = meanSquaredErrorScore(yTest, yHatRr)
    assert(score)
  })
}
