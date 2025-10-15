use napi::bindgen_prelude::*;
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
  pub fn with_max_iter(&mut self, max_iter: BigInt) {
    let max_iter = max_iter.get_u64().1 as usize;
    if let Some(inner) = self.inner.take() {
      self.inner = Some(inner.with_max_iter(max_iter))
    }
  }

  #[napi]
  pub fn with_k(&mut self, k: BigInt) {
    let k = k.get_u64().1 as usize;
    if let Some(inner) = self.inner.take() {
      self.inner = Some(inner.with_k(k))
    }
  }

  pub fn owned_inner(&self) -> LibKMeansParameters {
    self.inner.as_ref().unwrap().to_owned()
  }
}
