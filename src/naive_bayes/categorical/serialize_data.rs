use bincode::{Decode, Encode};

use crate::dense_matrix::DenseMatrixType;

#[derive(Encode, Decode)]
pub struct CategoricalNBSerializeData {
  pub fit_data_variant_type: DenseMatrixType,
  pub categorical_nb: Vec<u8>,
}
