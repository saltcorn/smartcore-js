use napi::{Error, Result, Status};

use super::{builder::SVRParametersDto, lib_svr_factory::LibSVRFactory};
use crate::{dense_matrix::DenseMatrixType, traits::PredictorEstimator};

pub struct SVRFactory {}

impl SVRFactory {
  pub fn create<'a, 'b: 'a>(
    params: &'b SVRParametersDto<'a>,
  ) -> Result<Box<dyn PredictorEstimator + 'a>> {
    let fit_data_x_type = params.fit_data_x.r#type();
    match fit_data_x_type {
      DenseMatrixType::F64 => LibSVRFactory::f64(params),
      DenseMatrixType::F32 => LibSVRFactory::f32(params),
      _ => Err(Error::new(Status::InvalidArg, "TODO")),
    }
  }
}
