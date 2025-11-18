use std::ops::Deref;

use napi::bindgen_prelude::*;
use napi_derive::napi;

use super::{
  distance_type::DistanceVariantType,
  factory::{self, DBSCANFactory},
  set_parameters::SetParametersParams,
  DBSCAN,
};
use crate::{
  algorithm::neighbor::KNNAlgorithmName,
  dense_matrix::{DenseMatrix, DenseMatrixType},
};

/// DBSCANBuilder allows you to set the parameters to be used to initialize a new DBSCAN instance when you call
/// .build() on it.
#[napi(js_name = "DBSCANBuilder")]
pub struct DBSCANBuilder {
  pub(super) fit_data: SharedReference<DenseMatrix, &'static mut DenseMatrix>,
  pub(super) distance_type: Option<DistanceVariantType>,
  pub(super) min_samples: Option<usize>,
  pub(super) eps: Option<f64>,
  pub(super) algorithm: Option<KNNAlgorithmName>,
  pub(super) data: Option<SharedReference<DenseMatrix, &'static mut DenseMatrix>>,
  pub(super) p: Option<u16>,
}

#[napi]
impl DBSCANBuilder {
  #[napi(constructor)]
  pub fn new(fit_data: Reference<DenseMatrix>, env: Env) -> Result<Self> {
    Ok(Self {
      fit_data: fit_data.share_with(env, Ok)?,
      distance_type: None,
      min_samples: None,
      eps: None,
      algorithm: None,
      data: None,
      p: None,
    })
  }

  #[napi(setter)]
  pub fn eps(&mut self, eps: f64) {
    self.eps = Some(eps)
  }

  #[napi(setter)]
  pub fn distance_type(&mut self, distance_type: DistanceVariantType) {
    self.distance_type = Some(distance_type)
  }

  #[napi(setter)]
  pub fn min_samples(&mut self, min_samples: BigInt) -> Result<()> {
    let (sign_bit, min_samples, ..) = min_samples.get_u64();
    if sign_bit {
      return Err(Error::new(
        Status::InvalidArg,
        "Expected a value greater than or equal to 0",
      ));
    }
    self.min_samples = Some(min_samples as usize);
    Ok(())
  }

  #[napi(setter)]
  pub fn algorithm(&mut self, algorithm: KNNAlgorithmName) {
    self.algorithm = Some(algorithm)
  }

  #[napi(setter)]
  pub fn data(&mut self, data: Reference<DenseMatrix>, env: Env) -> Result<()> {
    let data = data.share_with(env, Ok)?;
    match (self.fit_data.r#type(), data.r#type()) {
      (DenseMatrixType::F32, DenseMatrixType::F32) => (),
      (DenseMatrixType::F64, DenseMatrixType::F64) => (),
      _ => unimplemented!(),
    }
    self.data = Some(data);
    Ok(())
  }

  #[napi(setter)]
  pub fn p(&mut self, p: i32) -> Result<()> {
    if p < 0 || p > (u16::MAX as i32) {
      return Err(Error::new(
        Status::InvalidArg,
        format!("Expected a value within the range 0 - {}", u16::MAX),
      ));
    }
    self.p = Some(p as u16);
    Ok(())
  }

  #[napi]
  pub fn build(&mut self) -> Result<DBSCAN> {
    let fit_data_variant_type = self.fit_data.r#type();
    let params = factory::NewParameters {
      distance_variant_type: self.distance_type,
      fit_data: self.fit_data.deref(),
      dbscan_parameters: SetParametersParams {
        min_samples: self.min_samples,
        eps: self.eps,
        algorithm: self.algorithm.map(|a| a.into()),
      },
      data: self.data.as_deref(),
      p: self.p,
    };
    Ok(DBSCAN {
      inner: DBSCANFactory::create(params)?,
      fit_data_variant_type,
      distance_type: self.distance_type.unwrap_or_default(),
    })
  }
}
