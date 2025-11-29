use napi::{Error, Result, Status};
use smartcore::{
  linalg::basic::matrix::DenseMatrix as LibDenseMatrix,
  preprocessing::categorical::OneHotEncoder as LibOneHotEncoder,
};

use crate::{
  dense_matrix::{DenseMatrix, DenseMatrixType},
  traits::{Estimator, Transformer, TransformerEstimator},
};

impl Transformer for LibOneHotEncoder {
  fn transform(&self, x: &DenseMatrix) -> Result<DenseMatrix> {
    match x.r#type() {
      DenseMatrixType::F32 => self
        .transform::<f32, LibDenseMatrix<f32>>(x.try_into()?)
        .map(|r| r.into())
        .map_err(|e| Error::new(Status::GenericFailure, e.to_string())),
      DenseMatrixType::F64 => self
        .transform::<f64, LibDenseMatrix<f64>>(x.try_into()?)
        .map(|r| r.into())
        .map_err(|e| Error::new(Status::GenericFailure, e.to_string())),
      _ => Err(Error::new(
        Status::InvalidArg,
        "Supported input types for transform are f32 and f64",
      )),
    }
  }
}

impl Estimator for LibOneHotEncoder {
  fn serialize(&self) -> napi::Result<Vec<u8>> {
    Ok(vec![])
  }
}

impl TransformerEstimator for LibOneHotEncoder {}
