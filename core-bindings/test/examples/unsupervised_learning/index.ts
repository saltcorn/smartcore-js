import clustering from './clustering/index.ts'
import dimensionality_reduction from './dimensionality_reduction/index.ts'
import matrix_factorization from './matrix_factorization/index.ts'

export default () => {
  describe('Unsupervised Learning', () => {
    clustering()
    dimensionality_reduction()
    matrix_factorization()
  })
}
