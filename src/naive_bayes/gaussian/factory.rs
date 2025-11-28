use napi::{Error, Result, Status};

use super::lib_gaussian_nb_factory::{GaussianNBParametersDto, LibGaussianNBFactory};
use crate::{
  dense_matrix::{DenseMatrix, DenseMatrixType},
  naive_bayes::gaussian::predict_output_type::GaussianNBPredictOutputType,
  traits::PredictorEstimator,
  typed_array::TypedArrayVec,
};

pub struct GaussianNBParameters {
  pub priors: Option<Vec<f64>>,
}

pub struct NewParameters<'a> {
  pub fit_data_x: &'a DenseMatrix,
  pub fit_data_y: &'a TypedArrayVec,
  pub predict_output_type: GaussianNBPredictOutputType,
  pub gaussian_nb_parameters: GaussianNBParameters,
}

impl<'a> From<NewParameters<'a>> for GaussianNBParametersDto<'a> {
  fn from(value: NewParameters<'a>) -> Self {
    Self {
      fit_data_x: value.fit_data_x,
      fit_data_y: value.fit_data_y,
      gaussian_nb_parameters: value.gaussian_nb_parameters,
    }
  }
}

pub struct GaussianNBFactory {}

impl GaussianNBFactory {
  pub fn create<'a>(params: NewParameters<'a>) -> Result<Box<dyn PredictorEstimator>> {
    let fit_data_variant_type = params.fit_data_x.r#type();
    match (fit_data_variant_type, params.predict_output_type) {
      (DenseMatrixType::F64, GaussianNBPredictOutputType::U64) => {
        LibGaussianNBFactory::f64_u64(params.into())
      }
      (DenseMatrixType::F32, GaussianNBPredictOutputType::U64) => {
        LibGaussianNBFactory::f32_u64(params.into())
      }
      (DenseMatrixType::F64, GaussianNBPredictOutputType::U32) => {
        LibGaussianNBFactory::f64_u32(params.into())
      }
      (DenseMatrixType::F32, GaussianNBPredictOutputType::U32) => {
        LibGaussianNBFactory::f32_u32(params.into())
      }
      (DenseMatrixType::F64, GaussianNBPredictOutputType::U16) => {
        LibGaussianNBFactory::f64_u16(params.into())
      }
      (DenseMatrixType::F32, GaussianNBPredictOutputType::U16) => {
        LibGaussianNBFactory::f32_u16(params.into())
      }
      (DenseMatrixType::F64, GaussianNBPredictOutputType::U8) => {
        LibGaussianNBFactory::f64_u8(params.into())
      }
      (DenseMatrixType::F32, GaussianNBPredictOutputType::U8) => {
        LibGaussianNBFactory::f32_u8(params.into())
      }
      (DenseMatrixType::I64, _)
      | (DenseMatrixType::U64, _)
      | (DenseMatrixType::I32, _)
      | (DenseMatrixType::U32, _)
      | (DenseMatrixType::U16, _)
      | (DenseMatrixType::U8, _) => Err(Error::new(Status::InvalidArg, "TODO")),
    }
  }
}
