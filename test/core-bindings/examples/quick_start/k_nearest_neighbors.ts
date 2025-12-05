import assert from 'assert'
import { dataset, metrics, neighbors } from '../../../../src-js/index.js'

const { accuracyScore } = metrics
const { KNNClassifier } = neighbors

export default () => {
  it('K-Nearest Neigbors', () => {
    let irisData = dataset.loadIris({ returnXY: true })
    if (!Array.isArray(irisData)) {
      assert.fail('Expected irisData to be an Array')
    }
    let [x, y] = irisData
    let yHat = new KNNClassifier().fit(x, y).predict(x)
    let accuracy = accuracyScore(y, yHat, false)
    assert(accuracy)
  })
}
