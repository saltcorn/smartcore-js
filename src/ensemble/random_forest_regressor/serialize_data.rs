use bincode::{Decode, Encode};

use super::predict_output_type::RandomForestRegressorPredictOutputType;
use crate::dense_matrix::DenseMatrixType;

#[derive(Encode, Decode)]
pub struct RandomForestRegressorSerializeData {
  pub fit_data_variant_type: DenseMatrixType,
  pub predict_output_type: RandomForestRegressorPredictOutputType,
  pub random_forest_regressor: Vec<u8>,
}
