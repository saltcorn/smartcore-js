use napi_derive::napi;
use smartcore::naive_bayes::categorical::CategoricalNBParameters as LibCategoricalNBParameters;

#[napi(js_name = "CategoricalNBParameters")]
#[derive(Debug, Default)]
pub struct CategoricalNBParameters {
  inner: Option<LibCategoricalNBParameters>,
}

#[napi]
impl CategoricalNBParameters {
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

  pub fn owned_inner(&self) -> LibCategoricalNBParameters {
    self.inner.as_ref().unwrap().to_owned()
  }
}
