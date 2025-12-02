use napi::{Error, Result, Status};

use super::lib_svd_factory::{LibSVDFactory, SVDParametersDto};
use crate::{
  dense_matrix::{DenseMatrix, DenseMatrixType},
  traits::TransformerEstimator,
};

pub struct SVDParameters {
  pub n_components: Option<usize>,
}

pub struct NewParameters<'a> {
  pub fit_data: &'a DenseMatrix,
  pub svd_parameters: SVDParameters,
}

impl<'a> From<NewParameters<'a>> for SVDParametersDto<'a> {
  fn from(value: NewParameters<'a>) -> Self {
    Self {
      fit_data: value.fit_data,
      svd_parameters: value.svd_parameters,
    }
  }
}

pub struct SVDFactory {}

impl SVDFactory {
  pub fn create<'a>(params: NewParameters<'a>) -> Result<Box<dyn TransformerEstimator>> {
    let fit_data_variant_type = params.fit_data.r#type();
    match fit_data_variant_type {
      DenseMatrixType::F64 => LibSVDFactory::f64(params.into()),
      DenseMatrixType::F32 => LibSVDFactory::f32(params.into()),
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
