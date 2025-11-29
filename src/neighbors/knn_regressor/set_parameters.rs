use napi::Result;
use smartcore::{algorithm::neighbour::KNNAlgorithmName, neighbors::KNNWeightFunction};

use super::knn_regressor_parameters::KNNRegressorParameters;

pub struct SetParametersParams {
  pub k: Option<usize>,
  pub weight: Option<KNNWeightFunction>,
  pub algorithm: Option<KNNAlgorithmName>,
}

pub fn set_parameters<T: KNNRegressorParameters>(
  js_params: SetParametersParams,
  mut rs_params: T,
) -> Result<T> {
  if let Some(weight) = js_params.weight {
    rs_params = rs_params.with_weight(weight)
  }
  if let Some(k) = js_params.k {
    rs_params = rs_params.with_k(k);
  }
  if let Some(algorithm) = js_params.algorithm.to_owned() {
    rs_params = rs_params.with_algorithm(algorithm);
  }
  Ok(rs_params)
}
