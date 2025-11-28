use bincode::{Decode, Encode};

use super::predict_output_type::GaussianNBPredictOutputType;
use crate::dense_matrix::DenseMatrixType;

#[derive(Encode, Decode)]
pub struct GaussianNBSerializeData {
  pub fit_data_variant_type: DenseMatrixType,
  pub predict_output_type: GaussianNBPredictOutputType,
  pub gaussian_nb: Vec<u8>,
}
