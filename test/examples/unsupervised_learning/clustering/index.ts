import k_means from './k_means'
import dbscan from './dbscan'

export default () => {
  it.skip('KMeans', k_means)
  it.skip('DBSCAN', dbscan)
}
