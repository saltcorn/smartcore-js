use std::ops::Deref;

use napi::bindgen_prelude::*;
use napi_derive::napi;

use super::dense_matrix::{DenseMatrix, DenseMatrixType};
use super::distance_type::DistanceName;
use crate::algorithm::neighbor::KNNAlgorithmName;

#[napi]
pub struct DBSCANParams {
  pub(super) x_data: SharedReference<DenseMatrix, &'static mut DenseMatrix>,
  pub(super) distance_type: Option<DistanceName>,
  pub(super) min_samples: Option<usize>,
  pub(super) eps: Option<f64>,
  pub(super) algorithm: Option<KNNAlgorithmName>,
  pub(super) data: Option<SharedReference<DenseMatrix, &'static mut DenseMatrix>>,
  pub(super) p: Option<u16>,
}

#[napi]
impl DBSCANParams {
  #[napi(constructor)]
  pub fn new(x_data: Reference<DenseMatrix>, env: Env) -> Result<Self> {
    Ok(Self {
      x_data: x_data.share_with(env, Ok)?,
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
  pub fn distance_type(&mut self, distance_type: DistanceName) {
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
    match (self.x_data.deref().inner(), data.deref().inner()) {
      (DenseMatrixType::F32(_), DenseMatrixType::F32(_)) => (),
      (DenseMatrixType::F64(_), DenseMatrixType::F64(_)) => (),
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
}
