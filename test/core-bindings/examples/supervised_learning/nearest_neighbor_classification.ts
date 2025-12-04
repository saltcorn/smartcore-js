import assert from 'assert'
import { dataset, metrics, modelSelection, neighbors } from '../../../../src-js/index.js'

const { trainTestSplit } = modelSelection
const { r2 } = metrics
const { KNNClassifier } = neighbors

export default () => {
  it('Nearest Neighbors Classification', () => {
    const breastCancerData = dataset.loadBreastCancer({ returnXY: true })
    if (!Array.isArray(breastCancerData)) assert.fail('Expected breastCancerData to be an Array.')
    const [x, y] = breastCancerData
    let [, xTest, , yTest] = trainTestSplit(x, y, { testSize: 0.2, shuffle: true })
    let yHatKnn = new KNNClassifier().fit(x, y).predict(xTest)
    let score = r2(yTest, yHatKnn)
    assert(score)
  })
}
