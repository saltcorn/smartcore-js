use napi::bindgen_prelude::*;
use napi_derive::napi;
use smartcore::metrics::{mean_absolute_error::MeanAbsoluteError as LibMeanAbsoluteError, Metrics};

#[napi]
pub struct MeanAbsoluteErrorF32 {
  inner: LibMeanAbsoluteError<f32>,
}

impl Default for MeanAbsoluteErrorF32 {
  fn default() -> Self {
    Self {
      inner: LibMeanAbsoluteError::<f32>::new(),
    }
  }
}

#[napi]
impl MeanAbsoluteErrorF32 {
  #[napi(constructor)]
  pub fn new() -> Self {
    Self::default()
  }

  #[napi]
  pub fn get_score_f32(&self, y_true: Float32Array, y_pred: Float32Array) -> f64 {
    let y_true = y_true.to_vec();
    let y_pred = y_pred.to_vec();
    self.inner.get_score(&y_true, &y_pred)
  }
}
