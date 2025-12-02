import chalk from 'chalk'
import assert from 'assert'
import { dataset, KMeansParameters, KMeansF64I64 } from '../../../../../src-js/core-bindings/index.js'

const isARM = process.arch === 'arm' || process.arch === 'arm64'
const TIMEOUT = isARM ? 10000 : 2000

export default function (this: Mocha.Context) {
  this.timeout(TIMEOUT)

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
