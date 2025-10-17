import assert from 'assert'
import chalk from 'chalk'
import {
  dataset,
  DBSCANF64EuclidianF64Parameters,
  DBSCANF64I32EuclidianF64,
} from '../../../../../src-js/core-bindings/index.js'

export default () => {
  let circles = dataset.generator().makeCircles(1000, 0.5, 0.05)
  let x = circles.denseMatrix()
  let trueLabels = circles.target
  let parameters = new DBSCANF64EuclidianF64Parameters()
  parameters.withEps(0.2)
  parameters.withMinSamples(5)
  let labels = DBSCANF64I32EuclidianF64.fit(x, parameters).predict(x)
  // Missing metrics
  // - homogeneity_score
  // - completeness_score
  // - v_measure_score
  console.error(chalk.red('Missing metrics: homogeneity_score, completeness_score, v_measure_score'))
}
