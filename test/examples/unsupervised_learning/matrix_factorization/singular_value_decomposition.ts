import assert from 'assert'
import { dataset, SVDParameters, SVDF32 } from '../../../../index'

export default () => {
  it('Singlular Value Decomposition  (SVD)', () => {
    let digitsData = dataset.digits().loadDataset()
    let x = digitsData.denseMatrix()
    let svd = x.svd()
    let u = svd.U()
    let v = svd.V()
    let s = svd.V()
    let xHat = u.matmul(s).matmul(v.transpose())
    assert(xTranformed)
  })
}
