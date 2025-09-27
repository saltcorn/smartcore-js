use std::ops::Deref;

use napi_derive::napi;

use smartcore::decomposition::pca::PCAParameters as LibPCAParameters;

#[napi(js_name = "PCAParameters")]
#[derive(Debug, Default)]
pub struct PCAParameters {
  inner: LibPCAParameters,
}

#[napi]
impl PCAParameters {
  #[napi(constructor)]
  pub fn new() -> Self {
    Self::default()
  }

  #[napi]
  pub fn with_n_components(&mut self, n_components: u32) {
    self.inner.n_components = n_components as usize;
  }

  #[napi]
  pub fn use_correlation_matrix(&mut self, use_correlation_matrix: bool) {
    self.inner.use_correlation_matrix = use_correlation_matrix;
  }

  pub fn inner(&self) -> LibPCAParameters {
    self.inner.to_owned()
  }
}

impl Deref for PCAParameters {
  type Target = LibPCAParameters;

  fn deref(&self) -> &Self::Target {
    &self.inner
  }
}
