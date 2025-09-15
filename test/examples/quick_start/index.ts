import iris_flower_classification from './iris_flower_classification'
import logistic_regression from './logistic_regression'

export default () => {
  describe('Iris Flower Classification', () => {
    iris_flower_classification()
    logistic_regression()
  })
}
