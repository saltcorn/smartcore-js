use bincode::{Decode, Encode};

use super::predict_output_type::LassoPredictOutputType;
use crate::dense_matrix::DenseMatrixType;

#[derive(Encode, Decode)]
pub struct LassoSerializeData {
  pub fit_data_variant_type: DenseMatrixType,
  pub predict_output_type: LassoPredictOutputType,
  pub lasso: Vec<u8>,
}
