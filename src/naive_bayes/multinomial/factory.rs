use napi::{Error, Result, Status};

use super::lib_multinomial_nb_factory::{LibMultinomialNBFactory, MultinomialNBParametersDto};
use crate::{
  dense_matrix::{DenseMatrix, DenseMatrixType},
  naive_bayes::multinomial::predict_output_type::MultinomialNBPredictOutputType,
  traits::PredictorEstimator,
  typed_array::TypedArrayVec,
};

pub struct MultinomialNBParameters {
  pub priors: Option<Vec<f64>>,
  pub alpha: Option<f64>,
}

pub struct NewParameters<'a> {
  pub fit_data_x: &'a DenseMatrix,
  pub fit_data_y: &'a TypedArrayVec,
  pub multinomial_nb_parameters: MultinomialNBParameters,
}

impl<'a> From<NewParameters<'a>> for MultinomialNBParametersDto<'a> {
  fn from(value: NewParameters<'a>) -> Self {
    Self {
      fit_data_x: value.fit_data_x,
      fit_data_y: value.fit_data_y,
      multinomial_nb_parameters: value.multinomial_nb_parameters,
    }
  }
}

pub struct MultinomialNBFactory {}

impl MultinomialNBFactory {
  pub fn create<'a>(params: NewParameters<'a>) -> Result<Box<dyn PredictorEstimator>> {
    let fit_data_variant_type = params.fit_data_x.r#type();
    let predict_output_type = params.fit_data_y.r#type().try_into()?;
    match (fit_data_variant_type, predict_output_type) {
      (DenseMatrixType::U64, MultinomialNBPredictOutputType::U64) => {
        LibMultinomialNBFactory::u64_u64(params.into())
      }
      (DenseMatrixType::U64, MultinomialNBPredictOutputType::U32) => {
        LibMultinomialNBFactory::u64_u32(params.into())
      }
      (DenseMatrixType::U64, MultinomialNBPredictOutputType::U16) => {
        LibMultinomialNBFactory::u64_u16(params.into())
      }
      (DenseMatrixType::U64, MultinomialNBPredictOutputType::U8) => {
        LibMultinomialNBFactory::u64_u8(params.into())
      }

      (DenseMatrixType::U32, MultinomialNBPredictOutputType::U64) => {
        LibMultinomialNBFactory::u32_u64(params.into())
      }
      (DenseMatrixType::U32, MultinomialNBPredictOutputType::U32) => {
        LibMultinomialNBFactory::u32_u32(params.into())
      }
      (DenseMatrixType::U32, MultinomialNBPredictOutputType::U16) => {
        LibMultinomialNBFactory::u32_u16(params.into())
      }
      (DenseMatrixType::U32, MultinomialNBPredictOutputType::U8) => {
        LibMultinomialNBFactory::u32_u8(params.into())
      }

      (DenseMatrixType::U16, MultinomialNBPredictOutputType::U64) => {
        LibMultinomialNBFactory::u16_u64(params.into())
      }
      (DenseMatrixType::U16, MultinomialNBPredictOutputType::U32) => {
        LibMultinomialNBFactory::u16_u32(params.into())
      }
      (DenseMatrixType::U16, MultinomialNBPredictOutputType::U16) => {
        LibMultinomialNBFactory::u16_u16(params.into())
      }
      (DenseMatrixType::U16, MultinomialNBPredictOutputType::U8) => {
        LibMultinomialNBFactory::u16_u8(params.into())
      }

      (DenseMatrixType::U8, MultinomialNBPredictOutputType::U64) => {
        LibMultinomialNBFactory::u8_u64(params.into())
      }
      (DenseMatrixType::U8, MultinomialNBPredictOutputType::U32) => {
        LibMultinomialNBFactory::u8_u32(params.into())
      }
      (DenseMatrixType::U8, MultinomialNBPredictOutputType::U16) => {
        LibMultinomialNBFactory::u8_u16(params.into())
      }
      (DenseMatrixType::U8, MultinomialNBPredictOutputType::U8) => {
        LibMultinomialNBFactory::u8_u8(params.into())
      }

      (DenseMatrixType::F64, _)
      | (DenseMatrixType::F32, _)
      | (DenseMatrixType::I64, _)
      | (DenseMatrixType::I32, _) => Err(Error::new(Status::InvalidArg, "TODO")),
    }
  }
}
