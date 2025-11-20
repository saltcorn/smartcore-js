use bincode::{Decode, Encode};

use crate::dense_matrix::DenseMatrixType;

#[derive(Encode, Decode)]
pub struct SVDSerializeData {
  pub fit_data_type: DenseMatrixType,
  pub svd: Vec<u8>,
}
