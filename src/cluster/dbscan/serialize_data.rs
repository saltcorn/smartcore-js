use bincode::{Decode, Encode};

use super::distance_type::DistanceVariantType;
use crate::dense_matrix::DenseMatrixType;

#[derive(Encode, Decode)]
pub struct DBSCANSerializeData {
  pub fit_data_variant_type: DenseMatrixType,
  pub distance_type: DistanceVariantType,
  pub dbscan: Vec<u8>,
}
