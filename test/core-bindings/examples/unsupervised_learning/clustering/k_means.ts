import chalk from 'chalk'
import assert from 'assert'
import { dataset, DenseMatrix, KMeans, KMeansBuilder } from '../../../../../src-js/core-bindings/index.js'

const isARM = process.arch === 'arm' || process.arch === 'arm64'
const TIMEOUT = isARM ? 10000 : 2000

export default function (this: Mocha.Context) {
  this.timeout(TIMEOUT)

  let digitsData = dataset.digits().loadDataset()
  let x = DenseMatrix.f64(digitsData.denseMatrix())
  let trueLabels = digitsData.target
  let builder = new KMeansBuilder(x)
  builder.withK(10n)
  let labels = builder.build().predict(x)
  // Missing metrics
  // - homogeneity_score
  // - completeness_score
  // - v_measure_score
  console.log(chalk.red('Missing metrics: homogeneity_score, completeness_score, v_measure_score'))
}
