import iris_flower_classification from './k_nearest_neighbors.ts'
import logistic_regression from './logistic_regression.ts'

export default () => {
  describe('Quickstart', () => {
    describe('Iris Flower Classification', () => {
      iris_flower_classification()
      logistic_regression()
    })
  })
}
