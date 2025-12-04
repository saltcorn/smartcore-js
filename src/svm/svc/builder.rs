use napi::bindgen_prelude::*;
use napi_derive::napi;
use smartcore::svm::svc::SVCParameters as LibSVCParameters;

use super::{factory::SVCFactory, lib_svc_factory::SVCParameters, SVC};
use crate::{
  dense_matrix::DenseMatrix,
  js_number::WrappedNumber,
  svm::{svc::predict_output_type::SVCPredictOutputType, Kernels},
  typed_array::{TypedArrayVec, TypedArrayWrapper},
};

#[napi(js_name = "SVCBuilder")]
pub struct SVCBuilder {
  pub(super) epoch: Option<usize>,
  pub(super) seed: Option<u64>,
  pub(super) c: Option<WrappedNumber>,
  pub(super) tol: Option<WrappedNumber>,
  pub(super) kernel: Option<SharedReference<Kernels, &'static mut Kernels>>,
  pub(super) svc_parameters: Option<SharedReference<DenseMatrix, SVCParametersDto<'static>>>,
}

pub struct SVCParametersDto<'a> {
  pub(super) fit_data_x: &'a mut DenseMatrix,
  pub(super) fit_data_y: TypedArrayVec,
  pub svc_parameters: SVCParameters,
}

#[napi]
impl SVCBuilder {
  #[napi(constructor)]
  pub fn new() -> Result<Self> {
    Ok(Self {
      epoch: None,
      seed: None,
      c: None,
      tol: None,
      kernel: None,
      svc_parameters: None,
    })
  }

  #[napi]
  pub fn with_eps(&mut self, epoch: BigInt) {
    let epoch = epoch.get_u128().1 as usize;
    self.epoch = Some(epoch);
  }

  #[napi]
  pub fn with_seed(&mut self, seed: Option<BigInt>) {
    let seed = seed.map(|seed| seed.get_u64().1);
    self.seed = seed
  }

  #[napi]
  pub fn with_c(&mut self, c: &WrappedNumber) {
    self.c = Some(c.to_owned());
  }

  #[napi]
  pub fn with_tol(&mut self, tol: &WrappedNumber) {
    self.tol = Some(tol.to_owned());
  }

  #[napi]
  pub fn with_kernel(&mut self, kernel: Reference<Kernels>, env: Env) -> Result<()> {
    self.kernel = Some(kernel.share_with(env, Ok)?);
    Ok(())
  }

  #[napi]
  pub fn build<'a>(
    &'a mut self,
    fit_data_x: Reference<DenseMatrix>,
    fit_data_y: TypedArrayWrapper,
    env: Env,
  ) -> Result<SVC<'a>> {
    let fit_data_x_type = fit_data_x.r#type();
    let fit_data_y_type: SVCPredictOutputType = fit_data_y.r#type().try_into()?;
    let mut parameters = LibSVCParameters::default();
    parameters = parameters.with_seed(self.seed.to_owned());
    if let Some(kernel) = &self.kernel {
      parameters = parameters.with_kernel(kernel.owned_inner());
    }
    if let Some(tol) = &self.tol {
      parameters = parameters.with_tol(tol.try_into()?)
    }
    if let Some(c) = &self.c {
      parameters = parameters.with_c(c.try_into()?)
    }
    if let Some(epoch) = &self.epoch {
      parameters = parameters.with_epoch(*epoch)
    }
    let parameters = SVCParameters::F64I64(parameters);
    let params = fit_data_x.share_with(env, |d| {
      Ok(SVCParametersDto {
        fit_data_x: d,
        fit_data_y: fit_data_y.into(),
        svc_parameters: parameters,
      })
    })?;
    self.svc_parameters = Some(params);
    let params = self.svc_parameters.as_ref().unwrap();
    Ok(SVC {
      inner: SVCFactory::create(params)?,
      fit_data_x_type,
      fit_data_y_type,
    })
  }
}
