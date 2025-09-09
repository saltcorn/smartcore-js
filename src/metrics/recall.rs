use napi::bindgen_prelude::*;
use napi_derive::napi;
use smartcore::metrics::{recall::Recall as LibRecall, Metrics};

#[napi]
pub struct RecallF32 {
  inner: LibRecall<f32>,
}

impl Default for RecallF32 {
  fn default() -> Self {
    Self {
      inner: LibRecall::<f32>::new(),
    }
  }
}

#[napi]
impl RecallF32 {
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
