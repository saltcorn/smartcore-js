use bincode::{Decode, Encode};

use super::predict_output_type::MultinomialNBPredictOutputType;
use crate::dense_matrix::DenseMatrixType;

#[derive(Encode, Decode)]
pub struct MultinomialNBSerializeData {
  pub fit_data_variant_type: DenseMatrixType,
  pub predict_output_type: MultinomialNBPredictOutputType,
  pub multinomial_nb: Vec<u8>,
}
