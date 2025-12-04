use napi::{Error, Result, Status};
use smartcore::{
  linalg::basic::matrix::DenseMatrix as LibDenseMatrix,
  svm::svr::{SVRParameters as LibSVRParameters, SVR as LibSVR},
};

use super::builder::SVRParametersDto;
use crate::traits::PredictorEstimator;

pub enum SVRParameters {
  F32(LibSVRParameters<f32>),
  F64(LibSVRParameters<f64>),
}

impl<'a> TryFrom<&'a SVRParameters> for &'a LibSVRParameters<f64> {
  type Error = Error;

  fn try_from(value: &'a SVRParameters) -> std::result::Result<Self, Self::Error> {
    match value {
      SVRParameters::F64(inner) => Ok(inner),
      _ => Err(Error::new(
        Status::InvalidArg,
        "Expected an f64 variant of SVR parameters.",
      )),
    }
  }
}

impl<'a> TryFrom<&'a SVRParameters> for &'a LibSVRParameters<f32> {
  type Error = Error;

  fn try_from(value: &'a SVRParameters) -> std::result::Result<Self, Self::Error> {
    match value {
      SVRParameters::F32(inner) => Ok(inner),
      _ => Err(Error::new(
        Status::InvalidArg,
        "Expected an f32 variant of SVR parameters.",
      )),
    }
  }
}

pub struct LibSVRFactory {}

impl LibSVRFactory {
  pub fn f64<'a, 'b: 'a>(
    params: &'b SVRParametersDto<'a>,
  ) -> Result<Box<dyn PredictorEstimator + 'a>> {
    let x: &LibDenseMatrix<f64> = (&*params.fit_data_x).try_into()?;
    let y: &Vec<f64> = (&params.fit_data_y).try_into()?;
    let parameters: &LibSVRParameters<f64> = (&params.svr_parameters).try_into()?;
    let svr_instance = LibSVR::<f64, LibDenseMatrix<f64>, Vec<f64>>::fit(x, y, parameters)
      .map_err(|e| Error::new(Status::GenericFailure, e.to_string()))?;
    Ok(Box::new(svr_instance))
  }
}

impl LibSVRFactory {
  pub fn f32<'a, 'b: 'a>(
    params: &'b SVRParametersDto<'a>,
  ) -> Result<Box<dyn PredictorEstimator + 'a>> {
    let x: &LibDenseMatrix<f32> = (&*params.fit_data_x).try_into()?;
    let y: &Vec<f32> = (&params.fit_data_y).try_into()?;
    let parameters: &LibSVRParameters<f32> = (&params.svr_parameters).try_into()?;
    let svr_instance = LibSVR::<f32, LibDenseMatrix<f32>, Vec<f32>>::fit(x, y, parameters)
      .map_err(|e| Error::new(Status::GenericFailure, e.to_string()))?;
    Ok(Box::new(svr_instance))
  }
}
