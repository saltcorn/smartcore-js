import assert from 'assert'
import { dataset, metrics, linearModel, modelSelection } from '../../../../src-js/index.js'

const { trainTestSplit } = modelSelection
const { meanSquaredErrorScore } = metrics
const { ElasticNet } = linearModel

export default () => {
  it('Elastic Net', () => {
    const bostonData = dataset.loadBoston({ returnXY: true })
    if (!Array.isArray(bostonData)) assert.fail('Expected bostonData to be an Array')
    const [x, y] = bostonData
    const [, xTest, , yTest] = trainTestSplit(x, y, { testSize: 0.2, shuffle: true })
    const yHatEn = new ElasticNet({ alpha: 0.5, l1Ratio: 0.5 }).fit(x, y).predict(xTest)
    const score = meanSquaredErrorScore(yTest, yHatEn)
    assert(score)
  })
}
