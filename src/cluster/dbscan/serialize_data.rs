use bincode::{Decode, Encode};

use crate::{dense_matrix::DenseMatrixType, distance_type::DistanceVariantType};

#[derive(Encode, Decode)]
pub struct DBSCANSerializeData {
  pub fit_data_variant_type: DenseMatrixType,
  pub distance_type: DistanceVariantType,
  pub dbscan: Vec<u8>,
}
