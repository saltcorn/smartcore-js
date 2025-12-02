use napi::Result;

use super::lib_bernoulli_nb_factory::{BernoulliNBParametersDto, LibBernoulliNBFactory};
use crate::{
  dense_matrix::{DenseMatrix, DenseMatrixType},
  js_number::WrappedNumber,
  naive_bayes::bernoulli::predict_output_type::BernoulliNBPredictOutputType,
  traits::PredictorEstimator,
  typed_array::TypedArrayVec,
};

pub struct BernoulliNBParameters<'a> {
  pub alpha: Option<f64>,
  pub priors: Option<Vec<f64>>,
  pub(super) binarize: Option<&'a WrappedNumber>,
}

pub struct NewParameters<'a> {
  pub fit_data_x: &'a DenseMatrix,
  pub fit_data_y: &'a TypedArrayVec,
  pub bernoulli_nb_parameters: BernoulliNBParameters<'a>,
}

impl<'a> From<NewParameters<'a>> for BernoulliNBParametersDto<'a> {
  fn from(value: NewParameters<'a>) -> Self {
    Self {
      fit_data_x: value.fit_data_x,
      fit_data_y: value.fit_data_y,
      bernoulli_nb_parameters: value.bernoulli_nb_parameters,
    }
  }
}

pub struct BernoulliNBFactory {}

impl BernoulliNBFactory {
  pub fn create<'a>(params: NewParameters<'a>) -> Result<Box<dyn PredictorEstimator>> {
    let fit_data_variant_type = params.fit_data_x.r#type();
    let predict_output_type = params.fit_data_y.r#type().try_into()?;
    match (fit_data_variant_type, predict_output_type) {
      (DenseMatrixType::F64, BernoulliNBPredictOutputType::U32) => {
        LibBernoulliNBFactory::f64_u32(params.into())
      }
      (DenseMatrixType::F64, BernoulliNBPredictOutputType::U64) => {
        LibBernoulliNBFactory::f64_u64(params.into())
      }
      (DenseMatrixType::F32, BernoulliNBPredictOutputType::U32) => {
        LibBernoulliNBFactory::f32_u32(params.into())
      }
      (DenseMatrixType::F32, BernoulliNBPredictOutputType::U64) => {
        LibBernoulliNBFactory::f32_u64(params.into())
      }
      (DenseMatrixType::I64, BernoulliNBPredictOutputType::U32) => {
        LibBernoulliNBFactory::i64_u32(params.into())
      }
      (DenseMatrixType::I64, BernoulliNBPredictOutputType::U64) => {
        LibBernoulliNBFactory::i64_u64(params.into())
      }
      (DenseMatrixType::U64, BernoulliNBPredictOutputType::U32) => {
        LibBernoulliNBFactory::u64_u32(params.into())
      }
      (DenseMatrixType::U64, BernoulliNBPredictOutputType::U64) => {
        LibBernoulliNBFactory::u64_u64(params.into())
      }
      (DenseMatrixType::I32, BernoulliNBPredictOutputType::U32) => {
        LibBernoulliNBFactory::i32_u32(params.into())
      }
      (DenseMatrixType::I32, BernoulliNBPredictOutputType::U64) => {
        LibBernoulliNBFactory::i32_u64(params.into())
      }
      (DenseMatrixType::U32, BernoulliNBPredictOutputType::U32) => {
        LibBernoulliNBFactory::u32_u32(params.into())
      }
      (DenseMatrixType::U32, BernoulliNBPredictOutputType::U64) => {
        LibBernoulliNBFactory::u32_u64(params.into())
      }
      (DenseMatrixType::U16, BernoulliNBPredictOutputType::U32) => {
        LibBernoulliNBFactory::u16_u32(params.into())
      }
      (DenseMatrixType::U16, BernoulliNBPredictOutputType::U64) => {
        LibBernoulliNBFactory::u16_u64(params.into())
      }
      (DenseMatrixType::U8, BernoulliNBPredictOutputType::U32) => {
        LibBernoulliNBFactory::u8_u32(params.into())
      }
      (DenseMatrixType::U8, BernoulliNBPredictOutputType::U64) => {
        LibBernoulliNBFactory::u8_u64(params.into())
      }
    }
  }
}
