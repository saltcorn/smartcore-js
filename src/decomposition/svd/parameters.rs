use std::ops::Deref;

use napi_derive::napi;

use smartcore::decomposition::svd::SVDParameters as LibSVDParameters;

#[napi(js_name = "SVDParameters")]
#[derive(Debug, Default)]
pub struct SVDParameters {
  inner: LibSVDParameters,
}

#[napi]
impl SVDParameters {
  #[napi(constructor)]
  pub fn new() -> Self {
    Self::default()
  }

  #[napi]
  pub fn with_n_components(&mut self, n_components: u32) {
    self.inner.n_components = n_components as usize;
  }

  pub fn owned_inner(&self) -> LibSVDParameters {
    self.inner.to_owned()
  }
}

impl Deref for SVDParameters {
  type Target = LibSVDParameters;

  fn deref(&self) -> &Self::Target {
    &self.inner
  }
}
