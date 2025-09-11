use std::ops::Deref;

use napi_derive::napi;
use smartcore::linear::lasso::LassoParameters as LibLassoParameters;

#[napi]
#[derive(Debug, Clone, Default)]
pub struct LassoParameters {
  inner: LibLassoParameters,
}

#[napi]
impl LassoParameters {
  #[napi(constructor)]
  pub fn new() -> Self {
    Self {
      inner: LibLassoParameters::default(),
    }
  }

  #[napi]
  pub fn with_alpha(&mut self, alpha: f64) {
    self.inner = self.inner.to_owned().with_alpha(alpha);
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

impl Deref for LassoParameters {
  type Target = LibLassoParameters;

  fn deref(&self) -> &Self::Target {
    &self.inner
  }
}
