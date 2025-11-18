use super::distance_type::DistanceVariantType;
use crate::dense_matrix::DenseMatrixType;

pub trait SupportedDistances {
  fn supported_distances(&self) -> Vec<String>;
}

impl SupportedDistances for DenseMatrixType {
  fn supported_distances(&self) -> Vec<String> {
    use DenseMatrixType::*;
    use DistanceVariantType::*;
    const DISTANCE_SUPPORT: &[(DenseMatrixType, &[DistanceVariantType])] = &[
      (F64, &[Euclidian, Mahalanobis, Manhattan, Minkowski]),
      (F32, &[Euclidian, Mahalanobis, Manhattan, Minkowski]),
      (U64, &[Euclidian, Manhattan]),
      (U32, &[Euclidian, Manhattan]),
      (U16, &[Euclidian, Hamming]),
      (U8, &[Euclidian, Hamming]),
      (I64, &[Euclidian, Manhattan, Minkowski]),
      (I32, &[Euclidian, Hamming, Manhattan, Minkowski]),
    ];
    DISTANCE_SUPPORT
      .iter()
      .find(|(t, _)| t == self)
      .map(|(_, dists)| dists.iter().map(|d| d.to_string()).collect())
      .unwrap_or_default()
  }
}
