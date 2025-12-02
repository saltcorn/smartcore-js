use bincode::{Decode, Encode};

use super::predict_output_type::RidgeRegressionPredictOutputType;
use crate::dense_matrix::DenseMatrixType;

#[derive(Encode, Decode)]
pub struct RidgeRegressionSerializeData {
  pub fit_data_variant_type: DenseMatrixType,
  pub predict_output_type: RidgeRegressionPredictOutputType,
  pub ridge_regression: Vec<u8>,
}
