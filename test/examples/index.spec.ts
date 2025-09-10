import ridge_regression from './ridge_regression'
import iris_flower_classification from './iris_flower_classification'
import pricipal_component_analysis from './pricipal_component_analysis'

describe('Examples', () => {
  describe('Quickstart', () => {
    iris_flower_classification()
  })

  describe('Supervised Learning', () => {
    ridge_regression()
  })

  describe('Unsupervised Learning', () => {
    pricipal_component_analysis()
  })
})
