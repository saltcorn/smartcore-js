use napi::Result;
use smartcore::algorithm::neighbour::KNNAlgorithmName;

use super::dbscan_parameters::DBSCANParameters;

pub struct SetParametersParams {
  pub min_samples: Option<usize>,
  pub eps: Option<f64>,
  pub algorithm: Option<KNNAlgorithmName>,
}

pub fn set_parameters<T: DBSCANParameters>(
  js_params: SetParametersParams,
  mut rs_params: T,
) -> Result<T> {
  if let Some(eps) = js_params.eps {
    rs_params = rs_params.eps(eps)
  }
  if let Some(min_samples) = js_params.min_samples {
    rs_params = rs_params.min_samples(min_samples);
  }
  if let Some(algorithm) = js_params.algorithm.to_owned() {
    rs_params = rs_params.algorithm(algorithm);
  }
  Ok(rs_params)
}
