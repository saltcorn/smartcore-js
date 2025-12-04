import assert from 'assert'
import { dataset, modelSelection, metrics, neighbors } from '../../../../src-js/index.js'

const { trainTestSplit } = modelSelection
const { meanSquaredError } = metrics
const { KNNRegressor } = neighbors

export default () => {
  it('Nearest Neighbors Regression', () => {
    const bostonData = dataset.loadBoston({ returnXY: true })
    if (!Array.isArray(bostonData)) assert.fail('Expected bostonData to be an Array')
    const [x, y] = bostonData
    let [, xTest, , yTest] = trainTestSplit(x, y, { testSize: 0.2, shuffle: true })
    let yHatKnn = new KNNRegressor().fit(x, y).predict(xTest)
    let score = meanSquaredError(yTest, yHatKnn)
    assert(score)
  })
}
