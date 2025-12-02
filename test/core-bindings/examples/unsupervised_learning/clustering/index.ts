import k_means from './k_means.ts'
import dbscan from './dbscan.ts'

export default () => {
  describe('Clustering', () => {
    it('KMeans', k_means)
    it('DBSCAN', dbscan)
  })
}
