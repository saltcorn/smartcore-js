mod knn_classifier;
mod knn_regressor;

use napi_derive::napi;
use smartcore::neighbors::KNNWeightFunction as LibKNNWeightFunction;

#[napi]
#[derive(Debug, Clone, Copy)]
pub enum KNNWeightFunction {
  Uniform,
  Distance,
}

impl From<KNNWeightFunction> for LibKNNWeightFunction {
  fn from(value: KNNWeightFunction) -> Self {
    match value {
      KNNWeightFunction::Uniform => LibKNNWeightFunction::Uniform,
      KNNWeightFunction::Distance => LibKNNWeightFunction::Distance,
    }
  }
}
