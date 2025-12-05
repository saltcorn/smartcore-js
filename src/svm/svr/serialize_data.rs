use bincode::{Decode, Encode};

use crate::dense_matrix::DenseMatrixType;

#[derive(Encode, Decode)]
pub struct SVRSerializeData {
  pub fit_data_variant_type: DenseMatrixType,
  pub svr: Vec<u8>,
}
