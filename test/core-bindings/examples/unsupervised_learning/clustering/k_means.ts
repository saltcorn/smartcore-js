import chalk from 'chalk'
import assert from 'assert'
import { dataset, KMeansParameters, KMeansF64I64 } from '../../../../../src-js/core-bindings/index.js'

export default () => {
  let digitsData = dataset.digits().loadDataset()
  let x = digitsData.denseMatrix()
  let trueLabels = digitsData.target
  let parameters = new KMeansParameters()
  parameters.withK(10n)
  let labels = KMeansF64I64.fit(x, parameters).predict(x)
  // Missing metrics
  // - homogeneity_score
  // - completeness_score
  // - v_measure_score
  console.log(chalk.red('Missing metrics: homogeneity_score, completeness_score, v_measure_score'))
}
