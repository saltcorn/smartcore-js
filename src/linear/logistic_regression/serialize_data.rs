use bincode::{Decode, Encode};

use super::predict_output_type::LogisticRegressionPredictOutputType;
use crate::dense_matrix::DenseMatrixType;

#[derive(Encode, Decode)]
pub struct LogisticRegressionSerializeData {
  pub fit_data_variant_type: DenseMatrixType,
  pub predict_output_type: LogisticRegressionPredictOutputType,
  pub logistic_regression: Vec<u8>,
}
