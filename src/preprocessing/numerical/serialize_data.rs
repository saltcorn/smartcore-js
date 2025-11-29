use bincode::{Decode, Encode};

use crate::dense_matrix::DenseMatrixType;

#[derive(Encode, Decode)]
pub struct StandardScalerSerializeData {
  pub fit_data_type: DenseMatrixType,
  pub standard_scaler: Vec<u8>,
}
