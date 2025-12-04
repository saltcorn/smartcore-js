use napi::{Error, Result, Status};
use paste::paste;
use smartcore::{
  linalg::basic::matrix::DenseMatrix as LibDenseMatrix,
  svm::svc::{SVCParameters as LibSVCParameters, SVC as LibSVC},
};

use super::{builder::SVCParametersDto, variants::*};
use crate::traits::PredictorEstimator;

pub enum SVCParameters {
  F64I64(SVCParametersF64I64),
  F32I64(SVCParametersF32I64),
  F64I32(SVCParametersF64I32),
  F32I32(SVCParametersF32I32),
}

macro_rules! parameters_try_from_impl {
  ($x:ty, $y:ty) => {
    paste! {
        impl<'a> TryFrom<&'a SVCParameters> for &'a LibSVCParameters<$x, $y, LibDenseMatrix<$x>, Vec<$y>> {
            type Error = Error;

            fn try_from(value: &'a SVCParameters) -> std::result::Result<Self, Self::Error> {
                match value {
                SVCParameters::[<$x:upper $y:upper>](inner) => Ok(inner),
                _ => Err(Error::new(
                    Status::InvalidArg,
                    stringify!("Expected an" [<$x>] "variant of SVC parameters."),
                )),
                }
            }
        }
    }
  };
}

parameters_try_from_impl! {f64, i64}
parameters_try_from_impl! {f32, i64}

parameters_try_from_impl! {f64, i32}
parameters_try_from_impl! {f32, i32}

pub struct LibSVCFactory {}

macro_rules! factory_fns_impl {
  ($x:ty, $y:ty) => {
    paste! {
        impl LibSVCFactory {
            pub fn [<$x _ $y>]<'a, 'b: 'a>(
                params: &'b SVCParametersDto<'a>,
            ) -> Result<Box<dyn PredictorEstimator + 'a>> {
                let x: &LibDenseMatrix<$x> = (&*params.fit_data_x).try_into()?;
                let y: &Vec<$y> = (&params.fit_data_y).try_into()?;
                let parameters: &LibSVCParameters<$x, $y, LibDenseMatrix<$x>, Vec<$y>> = (&params.svc_parameters).try_into()?;
                let svc_instance = LibSVC::<$x, $y, LibDenseMatrix<$x>, Vec<$y>>::fit(x, y, parameters)
                .map_err(|e| Error::new(Status::GenericFailure, e.to_string()))?;
                Ok(Box::new(svc_instance))
            }
        }
    }
  };
}

factory_fns_impl! {f64, i64}
factory_fns_impl! {f32, i64}

factory_fns_impl! {f64, i32}
factory_fns_impl! {f32, i32}
