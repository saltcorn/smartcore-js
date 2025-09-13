import ridge_regression from './ridge_regression'
import iris_flower_classification from './iris_flower_classification'
import pricipal_component_analysis from './pricipal_component_analysis'
import nearest_neighbor_classification from './nearest_neighbor_classification'
import nearest_neighbor_regression from './nearest_neighbor_regression'
import linear_regression from './linear_regression'
import lasso from './lasso'
import elastic_net from './elastic_net'
import logistic_regression from './logistic_regression'
import support_vector_classifier from './support_vector_classifier'
import support_vector_regressor from './support_vector_regressor'
import decision_tree_classifier from './decision_tree_classifier'
import random_forest_regressor from './random_forest_regressor'

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
    support_vector_classifier()
    support_vector_regressor()
    decision_tree_classifier()
    random_forest_regressor()
  })

  describe('Unsupervised Learning', () => {
    pricipal_component_analysis()
  })
})
