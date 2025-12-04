import assert from 'assert'
import { dataset, modelSelection, ensemble, metrics } from '../../../../src-js/index.js'

const { trainTestSplit } = modelSelection
const { meanSquaredError } = metrics
const { RandomForestRegressor } = ensemble

export default () => {
  it('Random Forest Regressor', () => {
    const bostonData = dataset.loadBoston({ returnXY: true })
    if (!Array.isArray(bostonData)) assert.fail('Expected bostonData to be an Array')
    const [x, y] = bostonData
    const [, xTest, , yTest] = trainTestSplit(x, y, { testSize: 0.2, shuffle: true })
    const yHatRf = new RandomForestRegressor().fit(x, y).predict(xTest)
    const score = meanSquaredError(yTest, yHatRf)
    assert(score)
  })
}
