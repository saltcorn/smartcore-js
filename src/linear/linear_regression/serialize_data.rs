use bincode::{Decode, Encode};

use super::predict_output_type::LinearRegressionPredictOutputType;
use crate::dense_matrix::DenseMatrixType;

#[derive(Encode, Decode)]
pub struct LinearRegressionSerializeData {
  pub fit_data_variant_type: DenseMatrixType,
  pub predict_output_type: LinearRegressionPredictOutputType,
  pub linear_regression: Vec<u8>,
}
