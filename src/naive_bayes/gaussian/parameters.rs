use napi::bindgen_prelude::Float64Array;
use napi_derive::napi;
use smartcore::naive_bayes::gaussian::GaussianNBParameters as LibGaussianNBParameters;

#[napi(js_name = "GaussianNBParameters")]
#[derive(Debug, Default)]
pub struct GaussianNBParameters {
  inner: Option<LibGaussianNBParameters>,
}

#[napi]
impl GaussianNBParameters {
  #[napi(constructor)]
  pub fn new() -> Self {
    Self::default()
  }

  #[napi]
  pub fn with_priors(&mut self, priors: Float64Array) {
    if let Some(inner) = self.inner.take() {
      self.inner = Some(inner.with_priors(priors.to_vec()))
    }
  }

  pub fn owned_inner(&self) -> LibGaussianNBParameters {
    self.inner.as_ref().unwrap().to_owned()
  }
}
