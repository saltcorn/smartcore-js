import ridgeRegression from './ridge_regression.ts'
import nearestNeighborClassification from './nearest_neighbor_classification.ts'
import nearestNeighborRegression from './nearest_neighbor_regression.ts'
import linearRegression from './linear_regression.ts'
import lasso from './lasso.ts'
import elasticNet from './elastic_net.ts'
import logisticRegression from './logistic_regression.ts'
import supportVectorClassifier from './support_vector_classifier.ts'
import supportVectorRegressor from './support_vector_regressor.ts'
import decisionTreeClassifier from './decision_tree_classifier.ts'
import randomForestRegressor from './random_forest_regressor.ts'
import naiveBayes from './naive_bayes.ts'

export default () => {
  describe('Supervised Learning', () => {
    nearestNeighborClassification()
    nearestNeighborRegression()
    linearRegression()
    ridgeRegression()
    lasso()
    elasticNet()
    logisticRegression()
    supportVectorClassifier()
    supportVectorRegressor()
    decisionTreeClassifier()
    randomForestRegressor()
    naiveBayes()
  })
}
