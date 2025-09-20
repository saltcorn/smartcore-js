import k_means from './k_means.ts'
import dbscan from './dbscan.ts'

export default () => {
  describe('Clustering', () => {
    it.skip('KMeans', k_means)
    it.skip('DBSCAN', dbscan)
  })
}
