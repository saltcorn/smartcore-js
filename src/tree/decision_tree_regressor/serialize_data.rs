use bincode::{Decode, Encode};

use super::predict_output_type::DecisionTreeRegressorPredictOutputType;
use crate::dense_matrix::DenseMatrixType;

#[derive(Encode, Decode)]
pub struct DecisionTreeRegressorSerializeData {
  pub fit_data_variant_type: DenseMatrixType,
  pub predict_output_type: DecisionTreeRegressorPredictOutputType,
  pub decision_tree_regressor: Vec<u8>,
}
