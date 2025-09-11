use napi_derive::napi;

use smartcore::algorithm::neighbour::KNNAlgorithmName as LibKNNAlgorithmName;

#[napi]
pub enum KNNAlgorithmName {
  LinearSearch,
  CoverTree,
}

impl From<KNNAlgorithmName> for LibKNNAlgorithmName {
  fn from(value: KNNAlgorithmName) -> Self {
    match value {
      KNNAlgorithmName::CoverTree => LibKNNAlgorithmName::CoverTree,
      KNNAlgorithmName::LinearSearch => LibKNNAlgorithmName::LinearSearch,
    }
  }
}
