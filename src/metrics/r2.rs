use napi::bindgen_prelude::*;
use napi_derive::napi;
use smartcore::metrics::{r2::R2 as LibR2, Metrics};

#[napi]
pub struct R2U32 {
  inner: LibR2<u32>,
}

impl Default for R2U32 {
  fn default() -> Self {
    Self {
      inner: LibR2::<u32>::new(),
    }
  }
}

#[napi]
impl R2U32 {
  #[napi(constructor)]
  pub fn new() -> Self {
    Self::default()
  }

  #[napi]
  pub fn get_score_u32(&self, y_true: Uint32Array, y_pred: Uint32Array) -> f64 {
    let y_true = y_true.to_vec();
    let y_pred = y_pred.to_vec();
    self.inner.get_score(&y_true, &y_pred)
  }
}
