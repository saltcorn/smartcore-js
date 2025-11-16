use std::fmt::Display;

use bincode::{Decode, Encode};
use napi_derive::napi;

use crate::dense_matrix::DenseMatrixTypeVariantName;

#[derive(Debug, Decode, Encode, Clone, Copy, PartialEq, Eq, Default)]
#[napi]
pub enum DistanceVariantType {
  #[default]
  Euclidian,
  Hamming,
  Mahalanobis,
  Manhattan,
  Minkowski,
}

impl Display for DistanceVariantType {
  fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
    match &self {
      Self::Euclidian => f.write_str("Euclidian"),
      Self::Hamming => f.write_str("Hamming"),
      Self::Mahalanobis => f.write_str("Mahalanobis"),
      Self::Manhattan => f.write_str("Manhattan"),
      Self::Minkowski => f.write_str("Minkowski"),
    }
  }
}

impl DistanceVariantType {
  pub fn supported_data_types(&self) -> Vec<String> {
    use DenseMatrixTypeVariantName::*;
    use DistanceVariantType::*;
    const MATRIX_TYPE_SUPPORT: &[(DistanceVariantType, &[DenseMatrixTypeVariantName])] = &[
      (Euclidian, &[F32, F64, I32, I64, U16, U32, U64, U8]),
      (Hamming, &[I32, U16, U8]),
      (Mahalanobis, &[F32, F64]),
      (Manhattan, &[F32, F64, I32, I64, U64, U32]),
      (Minkowski, &[F32, F64, I32, I64]),
    ];
    MATRIX_TYPE_SUPPORT
      .iter()
      .find(|(t, _)| t == self)
      .map(|(_, x_types)| x_types.iter().map(|t| t.to_string()).collect())
      .unwrap_or_default()
  }
}
