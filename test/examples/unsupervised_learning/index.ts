import clustering from './clustering'
import dimensionality_reduction from './dimensionality_reduction'

export default () => {
  describe('Unsupervised Learning', () => {
    clustering()
    dimensionality_reduction()
  })
}
