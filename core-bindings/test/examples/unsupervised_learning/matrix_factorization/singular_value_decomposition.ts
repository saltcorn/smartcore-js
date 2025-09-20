import assert from 'assert'
import { dataset } from '../../../../index.js'

export default () => {
  it.skip('Singlular Value Decomposition  (SVD)', () => {
    let digitsData = dataset.digits().loadDataset()
    let x = digitsData.denseMatrix()
    let svd = x.svd()
    let u = svd.U()
    let v = svd.V()
    let s = svd.V()
    let xHat = u.matmul(s).matmul(v.transpose())
    // Iterator methods not implemented for DenseMatrix
    // for (let (xI, xHatI) in x.iter().zip(xHat.iter())) {
    //     assert!((xI - xHatI).abs() < 1e-3)
    // }
  })
}
