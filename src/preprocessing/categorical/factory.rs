use napi::{Error, Result, Status};

use super::lib_one_hot_encoder_factory::{LibOneHotEncoderFactory, OneHotEncoderParametersDto};
use crate::{
  dense_matrix::{DenseMatrix, DenseMatrixType},
  traits::TransformerEstimator,
};

pub struct NewParameters<'a> {
  pub fit_data: &'a DenseMatrix,
  pub cat_idx: &'a Vec<usize>,
}

impl<'a> From<NewParameters<'a>> for OneHotEncoderParametersDto<'a> {
  fn from(value: NewParameters<'a>) -> Self {
    Self {
      fit_data: value.fit_data,
      cat_idx: value.cat_idx,
    }
  }
}

pub struct OneHotEncoderFactory {}

impl OneHotEncoderFactory {
  pub fn create<'a>(params: NewParameters<'a>) -> Result<Box<dyn TransformerEstimator>> {
    let fit_data_variant_type = params.fit_data.r#type();
    match fit_data_variant_type {
      DenseMatrixType::F64 => LibOneHotEncoderFactory::f64(params.into()),
      DenseMatrixType::F32 => LibOneHotEncoderFactory::f32(params.into()),
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
