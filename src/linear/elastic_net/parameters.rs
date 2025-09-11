use std::ops::Deref;

use napi_derive::napi;
use smartcore::linear::elastic_net::ElasticNetParameters as LibElasticNetParameters;

#[napi]
#[derive(Debug, Clone, Default)]
pub struct ElasticNetParameters {
  inner: LibElasticNetParameters,
}

#[napi]
impl ElasticNetParameters {
  #[napi(constructor)]
  pub fn new() -> Self {
    Self {
      inner: LibElasticNetParameters::default(),
    }
  }

  #[napi]
  pub fn with_alpha(&mut self, alpha: f64) {
    self.inner = self.inner.to_owned().with_alpha(alpha);
  }

  #[napi]
  pub fn with_l1_ratio(&mut self, l1_ratio: f64) {
    self.inner = self.inner.to_owned().with_l1_ratio(l1_ratio);
  }

  #[napi]
  pub fn with_normalize(&mut self, normalize: bool) {
    self.inner = self.inner.to_owned().with_normalize(normalize);
  }

  #[napi]
  pub fn with_tol(&mut self, tol: f64) {
    self.inner = self.inner.to_owned().with_tol(tol);
  }

  #[napi]
  pub fn with_max_iter(&mut self, max_iter: u32) {
    self.inner = self.inner.to_owned().with_max_iter(max_iter as usize);
  }
}

impl Deref for ElasticNetParameters {
  type Target = LibElasticNetParameters;

  fn deref(&self) -> &Self::Target {
    &self.inner
  }
}
