use napi::{Error, Result, Status};

use super::lib_pca_factory::{LibPCAFactory, PCAParametersDto};
use crate::{
  dense_matrix::{DenseMatrix, DenseMatrixType},
  traits::TransformerEstimator,
};

pub struct PCAParameters {
  pub n_components: Option<usize>,
  pub use_correlation_matrix: Option<bool>,
}

pub struct NewParameters<'a> {
  pub fit_data: &'a DenseMatrix,
  pub pca_parameters: PCAParameters,
}

impl<'a> From<NewParameters<'a>> for PCAParametersDto<'a> {
  fn from(value: NewParameters<'a>) -> Self {
    Self {
      fit_data: value.fit_data,
      pca_parameters: value.pca_parameters,
    }
  }
}

pub struct PCAFactory {}

impl PCAFactory {
  pub fn create<'a>(params: NewParameters<'a>) -> Result<Box<dyn TransformerEstimator>> {
    let fit_data_variant_type = params.fit_data.r#type();
    match fit_data_variant_type {
      DenseMatrixType::F64 => LibPCAFactory::f64(params.into()),
      DenseMatrixType::F32 => LibPCAFactory::f32(params.into()),
      DenseMatrixType::U64
      | DenseMatrixType::U32
      | DenseMatrixType::U16
      | DenseMatrixType::U8
      | DenseMatrixType::I64
      | DenseMatrixType::I32 => Err(Error::new(
        Status::InvalidArg,
        "Unsupported fit data type. Supported types are f64 and f32.",
      )),
    }
  }
}
