use std::ops::Deref;

use napi::bindgen_prelude::*;
use napi_derive::napi;

use smartcore::{
  decomposition::pca::{PCAParameters as LibPCAParameters, PCA as LibPCA},
  linalg::basic::matrix::DenseMatrix,
};

use crate::linalg::basic::matrix::F64DenseMatrix;

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
pub struct F64PCA {
  inner: LibPCA<f64, DenseMatrix<f64>>,
}

#[napi]
impl F64PCA {
  #[napi(constructor)]
  pub fn fit(data: &F64DenseMatrix, parameters: &PCAParameters) -> Result<Self> {
    let pca = LibPCA::fit(
      data as &DenseMatrix<f64>,
      (parameters as &LibPCAParameters).to_owned(),
    )
    .unwrap();
    Ok(F64PCA { inner: pca })
  }

  #[napi]
  pub fn transform(&self, x: &F64DenseMatrix) -> Result<F64DenseMatrix> {
    let matrix = self
      .inner
      .transform(x)
      .map_err(|e| Error::new(Status::InvalidArg, format!("{}", e)))?;
    Ok(F64DenseMatrix::from_inner(matrix))
  }
}
