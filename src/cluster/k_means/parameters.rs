use napi_derive::napi;
use smartcore::cluster::kmeans::KMeansParameters as LibKMeansParameters;

#[napi(js_name = "KMeansParameters")]
#[derive(Debug)]
pub struct KMeansParameters {
  inner: Option<LibKMeansParameters>,
}

impl Default for KMeansParameters {
  fn default() -> Self {
    Self {
      inner: Some(LibKMeansParameters::default()),
    }
  }
}

#[napi]
impl KMeansParameters {
  #[napi(constructor)]
  pub fn new() -> Self {
    Self {
      inner: Some(LibKMeansParameters::default()),
    }
  }

  #[napi]
  pub fn with_max_iter(&mut self, max_iter: i64) {
    if let Some(inner) = self.inner.take() {
      self.inner = Some(inner.with_max_iter(max_iter as usize))
    }
  }

  #[napi]
  pub fn with_k(&mut self, k: i64) {
    if let Some(inner) = self.inner.take() {
      self.inner = Some(inner.with_k(k as usize))
    }
  }

  pub fn owned_inner(&self) -> LibKMeansParameters {
    self.inner.as_ref().unwrap().to_owned()
  }
}
