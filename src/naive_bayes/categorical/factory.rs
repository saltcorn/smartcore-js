use napi::{Error, Result, Status};

use super::lib_categorical_nb_factory::{CategoricalNBParametersDto, LibCategoricalNBFactory};
use crate::{
  dense_matrix::{DenseMatrix, DenseMatrixType},
  traits::PredictorEstimator,
  typed_array::TypedArrayVec,
};

pub struct CategoricalNBParameters {
  pub alpha: Option<f64>,
}

pub struct NewParameters<'a> {
  pub fit_data_x: &'a DenseMatrix,
  pub fit_data_y: &'a TypedArrayVec,
  pub categorical_nb_parameters: CategoricalNBParameters,
}

impl<'a> From<NewParameters<'a>> for CategoricalNBParametersDto<'a> {
  fn from(value: NewParameters<'a>) -> Self {
    Self {
      fit_data_x: value.fit_data_x,
      fit_data_y: value.fit_data_y,
      categorical_nb_parameters: value.categorical_nb_parameters,
    }
  }
}

pub struct CategoricalNBFactory {}

impl CategoricalNBFactory {
  pub fn create<'a>(params: NewParameters<'a>) -> Result<Box<dyn PredictorEstimator>> {
    let fit_data_variant_type = params.fit_data_x.r#type();
    match fit_data_variant_type {
      DenseMatrixType::U64 => LibCategoricalNBFactory::u64(params.into()),
      DenseMatrixType::U32 => LibCategoricalNBFactory::u32(params.into()),
      DenseMatrixType::U16 => LibCategoricalNBFactory::u16(params.into()),
      DenseMatrixType::U8 => LibCategoricalNBFactory::u8(params.into()),
      _ => Err(Error::new(Status::InvalidArg, "TODO")),
    }
  }
}
