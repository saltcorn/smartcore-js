import assert from 'assert'
import chalk from 'chalk'
import { DenseMatrix, dataset, DBSCANBuilder, DistanceVariantType } from '../../../../../src-js/core-bindings/index.js'

export default () => {
  let circles = dataset.generator().makeCircles(1000, 0.5, 0.05)
  let x = circles.denseMatrixV2()
  let trueLabels = circles.target
  let builder = new DBSCANBuilder(x)
  builder.distanceType = DistanceVariantType.Euclidian
  builder.eps = 0.2
  builder.minSamples = 5n
  let labels = builder.build().predict(x)
  // Missing metrics
  // - homogeneity_score
  // - completeness_score
  // - v_measure_score
  console.error(chalk.red('Missing metrics: homogeneity_score, completeness_score, v_measure_score'))
}
