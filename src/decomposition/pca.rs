use std::ops::Deref;

use napi::bindgen_prelude::*;
use napi_derive::napi;

use smartcore::{
  decomposition::pca::{PCAParameters as LibPCAParameters, PCA as LibPCA},
  linalg::basic::matrix::DenseMatrix,
};

use crate::linalg::basic::matrix::F32DenseMatrix;

#[napi]
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

  #[napi(setter)]
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

#[napi]
pub struct F32PCA {
  inner: LibPCA<f32, DenseMatrix<f32>>,
}

#[napi]
impl F32PCA {
  #[napi(constructor)]
  pub fn fit(data: &F32DenseMatrix, parameters: &PCAParameters) -> Result<Self> {
    let pca = LibPCA::fit(
      data as &DenseMatrix<f32>,
      (parameters as &LibPCAParameters).to_owned(),
    )
    .unwrap();
    Ok(F32PCA { inner: pca })
  }

  #[napi]
  pub fn transform(&self, x: &F32DenseMatrix) -> Result<F32DenseMatrix> {
    let matrix = self
      .inner
      .transform(x)
      .map_err(|e| Error::new(Status::InvalidArg, format!("{}", e)))?;
    Ok(F32DenseMatrix::from_inner(matrix))
  }
}
