import { dataset, trainTestSplitF32F32 } from '../../../index'

export default () => {
  it('Train Test Split', () => {
    let bostonData = dataset.boston().loadDataset()
    let x = bostonData.denseMatrix()
    let y = bostonData.target
    let [, , , ,] = trainTestSplitF32F32(x, y, 0.2, true)
  })
}
