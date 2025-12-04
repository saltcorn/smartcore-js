import ridge_regression from './ridge_regression.ts'
import nearest_neighbor_classification from './nearest_neighbor_classification.ts'
import nearest_neighbor_regression from './nearest_neighbor_regression.ts'
import linear_regression from './linear_regression.ts'
import lasso from './lasso.ts'
import elastic_net from './elastic_net.ts'
import logistic_regression from './logistic_regression.ts'
// import support_vector_classifier from './support_vector_classifier.ts'
import support_vector_regressor from './support_vector_regressor.ts'
import decision_tree_classifier from './decision_tree_classifier.ts'
import random_forest_regressor from './random_forest_regressor.ts'
import naive_bayes from './naive_bayes.ts'

export default () => {
  describe('Supervised Learning', () => {
    nearest_neighbor_classification()
    nearest_neighbor_regression()
    linear_regression()
    ridge_regression()
    lasso()
    elastic_net()
    logistic_regression()
    // support_vector_classifier()
    support_vector_regressor()
    decision_tree_classifier()
    random_forest_regressor()
    naive_bayes()
  })
}
