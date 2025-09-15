import iris_flower_classification from './k_nearest_neighbors'
import logistic_regression from './logistic_regression'

export default () => {
  describe('Iris Flower Classification', () => {
    iris_flower_classification()
    logistic_regression()
  })
}
