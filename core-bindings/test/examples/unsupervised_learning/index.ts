import clustering from './clustering'
import dimensionality_reduction from './dimensionality_reduction'
import matrix_factorization from './matrix_factorization'

export default () => {
  describe('Unsupervised Learning', () => {
    clustering()
    dimensionality_reduction()
    matrix_factorization()
  })
}
