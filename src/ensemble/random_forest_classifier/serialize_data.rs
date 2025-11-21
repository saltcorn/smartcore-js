use bincode::{Decode, Encode};

use super::predict_output_type::RandomForestClassifierPredictOutputType;
use crate::dense_matrix::DenseMatrixType;

#[derive(Encode, Decode)]
pub struct RandomForestClassifierSerializeData {
  pub fit_data_variant_type: DenseMatrixType,
  pub predict_output_type: RandomForestClassifierPredictOutputType,
  pub random_forest_classifier: Vec<u8>,
}
