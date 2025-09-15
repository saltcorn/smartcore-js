import assert from 'assert'
import { dataset, KMeansParameters, KMeansF32F32 } from '../../../../index'

export default () => {
  let digitsData = dataset.digits().loadDataset()
  let x = digitsData.denseMatrix()
  let trueLabels = digitsData.target
  let parameters = new KMeansParameters()
  parameters.withK(10)
  let labels = KMeansF32F32.fit(x, parameters).predict(x)
  // Missing metrics
  // - homogeneity_score
  // - completeness_score
  // - v_measure_score
  assert.fail('Missing metrics: homogeneity_score, completeness_score, v_measure_score')
}
