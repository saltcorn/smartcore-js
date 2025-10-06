import assert from 'assert'
import { dataset, KMeansParameters, KMeansF64F64 } from '../../../../../src-js/core-bindings/index.js'

export default () => {
  let digitsData = dataset.digits().loadDataset()
  let x = digitsData.denseMatrix()
  let trueLabels = digitsData.target
  let parameters = new KMeansParameters()
  parameters.withK(10)
  let labels = KMeansF64F64.fit(x, parameters).predict(x)
  // Missing metrics
  // - homogeneity_score
  // - completeness_score
  // - v_measure_score
  assert.fail('Missing metrics: homogeneity_score, completeness_score, v_measure_score')
}
