import assert from 'assert'
import path from 'path'
import fs from 'fs'
import { dataset, AccuracyU32, KNNClassifierF32U32 } from '../../../index'

export default () => {
  it('Model Persistence', () => {
    let irisData = dataset.iris().loadDataset()
    let x = irisData.denseMatrix()
    let y = irisData.target
    let knn = KNNClassifierF32U32.fit(x, y)
    let filename = path.join(__dirname, '../../../target/iris_knn.model')
    // save the model
    let knnBytes = knn.serialize()
    fs.writeFileSync(filename, knnBytes)
    // load the model
    knnBytes = fs.readFileSync(filename)
    knn = KNNClassifierF32U32.deserialize(knnBytes)
    // predict class labels
    let yHat = knn.predict(x)
    let accuracy = new AccuracyU32()
    let score = accuracy.getScore(y, yHat)
    assert(score)
  })
}
