use napi::bindgen_prelude::*;
use napi_derive::napi;
use smartcore::metrics::{accuracy::Accuracy as LibAccuracy, Metrics};

#[napi]
pub struct AccuracyF32 {
  inner: LibAccuracy<f32>,
}

impl Default for AccuracyF32 {
  fn default() -> Self {
    Self {
      inner: LibAccuracy::<f32>::new(),
    }
  }
}

#[napi]
impl AccuracyF32 {
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
