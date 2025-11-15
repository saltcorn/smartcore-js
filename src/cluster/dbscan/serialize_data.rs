use bincode::{Decode, Encode};

use super::{dense_matrix::DenseMatrixTypeVariantName, distance_type::DistanceVariantType};

#[derive(Encode, Decode)]
pub struct DBSCANSerializeData {
  pub fit_data_variant_type: DenseMatrixTypeVariantName,
  pub distance_type: DistanceVariantType,
  pub dbscan: Vec<u8>,
}
