use bincode::{Decode, Encode};

use crate::dense_matrix::DenseMatrixType;

#[derive(Encode, Decode)]
pub struct PCASerializeData {
  pub fit_data_type: DenseMatrixType,
  pub pca: Vec<u8>,
}
