import { dataset, trainTestSplitF64F64 } from '../../../index.js'

export default () => {
  it('Train Test Split', () => {
    let bostonData = dataset.boston().loadDataset()
    let x = bostonData.denseMatrix()
    let y = bostonData.target
    let [, , , ,] = trainTestSplitF64F64(x, y, 0.2, true)
  })
}
