use std::ops::Deref;

use napi::bindgen_prelude::*;
use napi_derive::napi;

use super::{
  factory::{self, PCAFactory, PCAParameters},
  PCA,
};
use crate::dense_matrix::DenseMatrix;

#[napi(js_name = "PCABuilder")]
pub struct PCABuilder {
  fit_data: SharedReference<DenseMatrix, &'static mut DenseMatrix>,
  n_components: Option<usize>,
  use_correlation_matrix: Option<bool>,
}

#[napi]
impl PCABuilder {
  #[napi(constructor)]
  pub fn new(fit_data: Reference<DenseMatrix>, env: Env) -> Result<Self> {
    Ok(Self {
      fit_data: fit_data.share_with(env, Ok)?,
      n_components: None,
      use_correlation_matrix: None,
    })
  }

  #[napi]
  pub fn with_n_components(&mut self, n_components: BigInt) {
    let n_components = n_components.get_u64().1 as usize;
    self.n_components = Some(n_components);
  }

  #[napi]
  pub fn use_correlation_matrix(&mut self, use_correlation_matrix: bool) {
    self.use_correlation_matrix = Some(use_correlation_matrix)
  }

  #[napi]
  pub fn build(&mut self) -> Result<PCA> {
    let fit_data_type = self.fit_data.r#type();
    let params = factory::NewParameters {
      fit_data: self.fit_data.deref(),
      pca_parameters: PCAParameters {
        n_components: self.n_components,
        use_correlation_matrix: self.use_correlation_matrix,
      },
    };
    Ok(PCA {
      inner: PCAFactory::create(params)?,
      fit_data_type,
    })
  }
}
