import ridge_regression from './ridge_regression'
import iris_flower_classification from './iris_flower_classification'
import pricipal_component_analysis from './pricipal_component_analysis'
import nearest_neighbor_classification from './nearest_neighbor_classification'
import nearest_neighbor_regression from './nearest_neighbor_regression'
import linear_regression from './linear_regression'
import lasso from './lasso'
import elastic_net from './elastic_net'
import logistic_regression from './logistic_regression'

describe('Examples', () => {
  describe('Quickstart', () => {
    iris_flower_classification()
  })

  describe('Supervised Learning', () => {
    nearest_neighbor_classification()
    nearest_neighbor_regression()
    linear_regression()
    ridge_regression()
    lasso()
    elastic_net()
    logistic_regression()
  })

  describe('Unsupervised Learning', () => {
    pricipal_component_analysis()
  })
})
