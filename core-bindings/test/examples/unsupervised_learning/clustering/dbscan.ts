import assert from 'assert'
import { dataset, EuclidianF64DBSCANF64Parameters, DBSCANF64F64 } from '../../../../index.js'

export default () => {
  let circles = dataset.generator().makeCircles(1000, 0.5, 0.05)
  let x = circles.denseMatrix()
  let trueLabels = circles.target
  let parameters = new EuclidianF64DBSCANF64Parameters()
  parameters.withEps(0.2)
  parameters.withMinSamples(5)
  let labels = DBSCANF64F64.fit(x, parameters).predict(x)
  // Missing metrics
  // - homogeneity_score
  // - completeness_score
  // - v_measure_score
  assert.fail('Missing metrics: homogeneity_score, completeness_score, v_measure_score')
}
