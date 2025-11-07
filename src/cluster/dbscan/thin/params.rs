use std::ops::Deref;

use napi::bindgen_prelude::*;
use napi_derive::napi;
use paste::paste;
use smartcore::cluster::dbscan::DBSCANParameters;
use smartcore::linalg::basic::matrix::DenseMatrix as LibDenseMatrix;
use smartcore::metrics::distance::{
  euclidian::Euclidian, hamming::Hamming, mahalanobis::Mahalanobis, manhattan::Manhattan,
  minkowski::Minkowski,
};

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

pub trait IDBSCANParameters: Sized {
  fn eps(self, eps: f64) -> Self;

  fn min_samples(self, min_samples: usize) -> Self;

  fn algorithm(self, algorithm: KNNAlgorithmName) -> Self;
}

macro_rules! dbscan_parameters_impl {
  (
    x_type: $x:ty,
    distance_type: $dist:ty,
  ) => {
    paste! {
        impl IDBSCANParameters for DBSCANParameters<$x, $dist> {
            fn eps(self, eps: f64) -> Self {
                self.with_eps(eps)
            }

            fn min_samples(self, min_samples: usize) -> Self {
                self.with_min_samples(min_samples)
            }

            fn algorithm(self, algorithm: KNNAlgorithmName) -> Self {
                self.with_algorithm(algorithm.into())
            }
        }
    }
  };
}

pub fn set_parameters<T: IDBSCANParameters>(
  js_params: &DBSCANParams,
  mut rs_params: T,
) -> Result<T> {
  if let Some(eps) = js_params.eps {
    rs_params = rs_params.eps(eps)
  }
  if let Some(min_samples) = js_params.min_samples {
    rs_params = rs_params.min_samples(min_samples);
  }
  if let Some(algorithm) = js_params.algorithm.to_owned() {
    rs_params = rs_params.algorithm(algorithm);
  }
  Ok(rs_params)
}

dbscan_parameters_impl! { x_type: f64, distance_type: Euclidian<f64>, }
dbscan_parameters_impl! { x_type: f64, distance_type: Mahalanobis<f64, LibDenseMatrix<f64>>, }
dbscan_parameters_impl! { x_type: f64, distance_type: Manhattan<f64>, }
dbscan_parameters_impl! { x_type: f64, distance_type: Minkowski<f64>, }
dbscan_parameters_impl! { x_type: f32, distance_type: Euclidian<f32>, }
dbscan_parameters_impl! { x_type: f32, distance_type: Mahalanobis<f32, LibDenseMatrix<f64>>, }
dbscan_parameters_impl! { x_type: f32, distance_type: Manhattan<f32>, }
dbscan_parameters_impl! { x_type: f32, distance_type: Minkowski<f32>, }
dbscan_parameters_impl! { x_type: i32, distance_type: Euclidian<i32>, }
dbscan_parameters_impl! { x_type: i32, distance_type: Hamming<i32>, }
dbscan_parameters_impl! { x_type: i32, distance_type: Manhattan<i32>, }
dbscan_parameters_impl! { x_type: i32, distance_type: Minkowski<i32>, }
dbscan_parameters_impl! { x_type: i64, distance_type: Euclidian<i64>, }
dbscan_parameters_impl! { x_type: i64, distance_type: Manhattan<i64>, }
dbscan_parameters_impl! { x_type: i64, distance_type: Minkowski<i64>, }
dbscan_parameters_impl! { x_type: u16, distance_type: Euclidian<u16>, }
dbscan_parameters_impl! { x_type: u16, distance_type: Hamming<u16>, }
dbscan_parameters_impl! { x_type: u32, distance_type: Euclidian<u32>, }
dbscan_parameters_impl! { x_type: u32, distance_type: Manhattan<u32>, }
dbscan_parameters_impl! { x_type: u64, distance_type: Euclidian<u64>, }
dbscan_parameters_impl! { x_type: u64, distance_type: Manhattan<u64>, }
dbscan_parameters_impl! { x_type: u8, distance_type: Euclidian<u8>, }
dbscan_parameters_impl! { x_type: u8, distance_type: Hamming<u8>, }
