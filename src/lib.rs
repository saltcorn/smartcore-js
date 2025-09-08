use std::ops::Deref;

use napi::bindgen_prelude::*;
use napi_derive::napi;

use smartcore::{
  decomposition::pca::{PCAParameters as LibPCAParameters, PCA as LibPCA},
  linalg::basic::matrix::DenseMatrix,
};

#[napi]
pub struct F64DenseMatrix {
  inner: DenseMatrix<f64>,
}

#[napi]
impl F64DenseMatrix {
  #[napi(constructor)]
  pub fn new(
    nrows: u32,
    ncols: u32,
    values: Float64Array,
    column_major: Option<bool>,
  ) -> Result<Self> {
    let column_major = column_major.unwrap_or(true);
    let matrix = DenseMatrix::new(
      nrows as usize,
      ncols as usize,
      values.to_vec(),
      column_major,
    )
    .map_err(|e| Error::new(Status::InvalidArg, format!("{}", e)))?;
    Ok(F64DenseMatrix { inner: matrix })
  }

  pub fn from_inner(inner: DenseMatrix<f64>) -> Self {
    F64DenseMatrix { inner }
  }

  #[napi]
  pub fn noop(&self) {}
}

impl Deref for F64DenseMatrix {
  type Target = DenseMatrix<f64>;

  fn deref(&self) -> &Self::Target {
    &self.inner
  }
}

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
    let pca = LibPCA::fit(&data.inner, (parameters as &LibPCAParameters).to_owned()).unwrap();
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

// fn tmp() {
//   // Load dataset
//   let digits_data = digits::load_dataset();
//   let digits_xs = digits_data
//     .as_matrix()
//     .into_iter()
//     .map(|v| v.into_iter().map(|f| *f).collect::<Vec<_>>())
//     .collect::<Vec<_>>();
//   // Transform dataset into a NxM matrix
//   let x = DenseMatrix::from_2d_vec(&digits_xs).unwrap();
//   // These are our target class labels
//   let labels = digits_data.target;
//   // Fit PCA to digits dataset
//   let pca = PCA::fit(&x, PCAParameters::default().with_n_components(2)).unwrap();
//   // Reduce dimensionality of X to 2 principal components
//   let x_transformed = pca.transform(&x).unwrap();
// }
