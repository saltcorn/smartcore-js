import assert from 'assert'
import { dataset, EuclidianF32DBSCANF32Parameters, DBSCANF32F32 } from '../../../../index'

export default () => {
  let circles = dataset.generator().makeCircles(1000, 0.5, 0.05)
  let x = circles.denseMatrix()
  let trueLabels = circles.target
  let parameters = new EuclidianF32DBSCANF32Parameters()
  parameters.withEps(0.2)
  parameters.withMinSamples(5)
  let labels = DBSCANF32F32.fit(x, parameters).predict(x)
  // Missing metrics
  // - homogeneity_score
  // - completeness_score
  // - v_measure_score
  assert.fail('Missing metrics: homogeneity_score, completeness_score, v_measure_score')
}
