import assert from 'assert'
import { dataset, metrics, linearModel, modelSelection } from '../../../../src-js/index.js'

const { trainTestSplit } = modelSelection
const { meanSquaredErrorScore } = metrics
const { LinearRegression } = linearModel

export default () => {
  it('Linear Regression', () => {
    let bostonData = dataset.loadBoston({ returnXY: true })
    if (!Array.isArray(bostonData)) assert.fail('Expected bostonData to be an Array')
    const [x, y] = bostonData
    let [, xTest, , yTest] = trainTestSplit(x, y, { testSize: 0.2, shuffle: true })
    let yHatLr = new LinearRegression().fit(x, y).predict(xTest)
    let score = meanSquaredErrorScore(yTest, yHatLr)
    assert(score)
  })
}
