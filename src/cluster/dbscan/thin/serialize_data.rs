use bincode::{Decode, Encode};

use super::{dense_matrix::DenseMatrixTypeVariantName, distance_type::DistanceName};

#[derive(Encode, Decode)]
pub struct DBSCANSerializeData {
  pub fit_data_variant_type: DenseMatrixTypeVariantName,
  pub distance_type: DistanceName,
  pub dbscan: Vec<u8>,
}
