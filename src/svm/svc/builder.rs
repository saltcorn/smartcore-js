use napi::bindgen_prelude::*;
use napi_derive::napi;
use smartcore::svm::svr::SVRParameters as LibSVRParameters;

use super::{factory::SVRFactory, lib_svr_factory::SVRParameters, v2::SVR};
use crate::{
  dense_matrix::DenseMatrix,
  js_number::WrappedNumber,
  svm::Kernels,
  typed_array::{TypedArrayVec, TypedArrayWrapper},
};

#[napi(js_name = "SVMBuilder")]
pub struct SVRBuilder {
  pub(super) eps: Option<WrappedNumber>,
  pub(super) c: Option<WrappedNumber>,
  pub(super) tol: Option<WrappedNumber>,
  pub(super) kernel: Option<SharedReference<Kernels, &'static mut Kernels>>,
  pub(super) svr_parameters: Option<SharedReference<DenseMatrix, SVRParametersDto<'static>>>,
}

pub struct SVRParametersDto<'a> {
  pub(super) fit_data_x: &'a mut DenseMatrix,
  pub(super) fit_data_y: TypedArrayVec,
  pub svr_parameters: SVRParameters,
}

#[napi]
impl SVRBuilder {
  #[napi(constructor)]
  pub fn new() -> Result<Self> {
    Ok(Self {
      eps: None,
      c: None,
      tol: None,
      kernel: None,
      svr_parameters: None,
    })
  }

  #[napi]
  pub fn with_eps(&mut self, eps: &WrappedNumber) {
    self.eps = Some(eps.to_owned());
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
  ) -> Result<SVR<'a>> {
    let fit_data_variant_type = fit_data_x.r#type();
    let parameters = SVRParameters::F64(LibSVRParameters::default());
    let params = fit_data_x.share_with(env, |d| {
      Ok(SVRParametersDto {
        fit_data_x: d,
        fit_data_y: fit_data_y.into(),
        svr_parameters: parameters,
      })
    })?;
    self.svr_parameters = Some(params);
    let params = self.svr_parameters.as_ref().unwrap();
    Ok(SVR {
      inner: SVRFactory::create(&params)?,
      fit_data_variant_type,
    })
  }
}
