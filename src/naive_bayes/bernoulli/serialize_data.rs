use bincode::{Decode, Encode};

use super::predict_output_type::BernoulliNBPredictOutputType;
use crate::dense_matrix::DenseMatrixType;

#[derive(Encode, Decode)]
pub struct BernoulliNBSerializeData {
  pub fit_data_variant_type: DenseMatrixType,
  pub predict_output_type: BernoulliNBPredictOutputType,
  pub bernoulli_nb: Vec<u8>,
}
