use napi::{Error, Result, Status};

use super::{builder::SVCParametersDto, lib_svc_factory::LibSVCFactory};
use crate::{
  dense_matrix::DenseMatrixType, svm::svc::predict_output_type::SVCPredictOutputType,
  traits::PredictorEstimator,
};

pub struct SVCFactory {}

impl SVCFactory {
  pub fn create<'a, 'b: 'a>(
    params: &'b SVCParametersDto<'a>,
  ) -> Result<Box<dyn PredictorEstimator + 'a>> {
    let fit_data_x_type = params.fit_data_x.r#type();
    let fit_data_y_type: SVCPredictOutputType = params.fit_data_y.r#type().try_into()?;
    match (fit_data_x_type, fit_data_y_type) {
      (DenseMatrixType::F64, SVCPredictOutputType::I64) => LibSVCFactory::f64_i64(params),
      (DenseMatrixType::F32, SVCPredictOutputType::I64) => LibSVCFactory::f32_i64(params),
      (DenseMatrixType::F64, SVCPredictOutputType::I32) => LibSVCFactory::f64_i32(params),
      (DenseMatrixType::F32, SVCPredictOutputType::I32) => LibSVCFactory::f32_i32(params),
      _ => Err(Error::new(Status::InvalidArg, "TODO")),
    }
  }
}
