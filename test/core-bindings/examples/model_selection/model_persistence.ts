import assert from 'assert'
import path from 'path'
import fs from 'fs'
import os from 'os'
import { coreBindings, dataset, metrics, neighbors } from '../../../../src-js/index.js'

const { DistanceVariantType } = coreBindings
const { loadIris } = dataset
const { accuracyScore } = metrics
const { KNNClassifier } = neighbors

export default () => {
  it('Model Persistence', () => {
    const irisData = loadIris({ returnXY: true })
    if (!Array.isArray(irisData)) assert.fail('Expected irisData to be an Array')
    const [x, y] = irisData
    let knn = new KNNClassifier({ distanceType: DistanceVariantType.Euclidian }).fit(x, y)
    const filename = path.join(os.tmpdir(), 'iris_knn.model')
    // save the model
    let knnBytes = knn.serialize()
    fs.writeFileSync(filename, knnBytes)
    // load the model
    knnBytes = fs.readFileSync(filename)
    knn = KNNClassifier.deserialize(knnBytes)
    // predict class labels
    const yHat = knn.predict(x)
    const score = accuracyScore(y, yHat, false)
    assert(score)
  })
}
