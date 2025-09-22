use napi::bindgen_prelude::*;
use napi_derive::napi;
use smartcore::naive_bayes::multinomial::MultinomialNBParameters as LibMultinomialNBParameters;

#[napi(js_name = "MultinomialNBParameters")]
#[derive(Debug)]
pub struct MultinomialNBParameters {
  inner: Option<LibMultinomialNBParameters>,
}

impl Default for MultinomialNBParameters {
  fn default() -> Self {
    Self {
      inner: Some(LibMultinomialNBParameters::default()),
    }
  }
}

#[napi]
impl MultinomialNBParameters {
  #[napi(constructor)]
  pub fn new() -> Self {
    Self::default()
  }

  #[napi]
  pub fn with_alpha(&mut self, alpha: f64) {
    if let Some(inner) = self.inner.take() {
      self.inner = Some(inner.with_alpha(alpha))
    }
  }

  #[napi]
  pub fn with_priors(&mut self, priors: Float64Array) {
    if let Some(inner) = self.inner.take() {
      self.inner = Some(inner.with_priors(priors.to_vec()))
    }
  }

  pub fn owned_inner(&self) -> LibMultinomialNBParameters {
    self.inner.as_ref().unwrap().to_owned()
  }
}
