use bincode::{Decode, Encode};

use super::predict_output_type::DecisionTreeClassifierPredictOutputType;
use crate::dense_matrix::DenseMatrixType;

#[derive(Encode, Decode)]
pub struct DecisionTreeClassifierSerializeData {
  pub fit_data_variant_type: DenseMatrixType,
  pub predict_output_type: DecisionTreeClassifierPredictOutputType,
  pub decision_tree_classifier: Vec<u8>,
}
