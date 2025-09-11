import ridge_regression from './ridge_regression'
import iris_flower_classification from './iris_flower_classification'
import pricipal_component_analysis from './pricipal_component_analysis'
import k_nearest_neighbor from './k_nearest_neighbor'

describe('Examples', () => {
  describe('Quickstart', () => {
    iris_flower_classification()
  })

  describe('Supervised Learning', () => {
    k_nearest_neighbor()
    ridge_regression()
  })

  describe('Unsupervised Learning', () => {
    pricipal_component_analysis()
  })
})
