use std::ops::Deref;

use napi::bindgen_prelude::*;
use paste::paste;
use smartcore::{
  cluster::dbscan::{DBSCANParameters, DBSCAN},
  linalg::basic::matrix::DenseMatrix as LibDenseMatrix,
  metrics::distance::{
    euclidian::Euclidian, hamming::Hamming, mahalanobis::Mahalanobis, manhattan::Manhattan,
    minkowski::Minkowski,
  },
};

use super::{
  set_parameters::{set_parameters, SetParametersParams},
  DenseMatrixType,
};
use crate::{dense_matrix::DenseMatrix, traits::PredictorEstimator};

pub struct DBSCANParametersDto<'a> {
  pub fit_data: &'a DenseMatrix,
  pub dbscan_parameters: SetParametersParams,
  pub data: Option<&'a &'static mut DenseMatrix>,
  pub p: Option<u16>,
}

#[derive(Debug, Clone, Default)]
pub struct LibDBSCANFactory {}

macro_rules! create_impl {
  (
    x_type: $x:ty,
    distance_type: $dist:ty
  ) => {
    paste! {
        impl LibDBSCANFactory {
            // e.g: f32_i32_euclidian
            pub fn [<$x _i32 _ $dist:lower>](params: DBSCANParametersDto) -> Result<Box<dyn PredictorEstimator>> {
                let x: &LibDenseMatrix<$x> = params.fit_data.try_into()?;
                let parameters = DBSCANParameters::default().with_distance($dist::new());
                let parameters = set_parameters(params.dbscan_parameters, parameters)?;
                let dbscan_instance = DBSCAN::fit(x, parameters)
                    .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?;
                Ok(Box::new(dbscan_instance))
            }
        }
    }
  };
}

macro_rules! create_impl_mahalanobis {
  (
    x_type: $x:ty
  ) => {
    paste! {
        impl LibDBSCANFactory {
            pub fn [<$x _i32_mahalanobis>](params: DBSCANParametersDto) -> Result<Box<dyn PredictorEstimator>> {
                let Some(ref p_data) = params.data else {
                    return Err(Error::new(
                        Status::GenericFailure,
                        "'data' must be specified for 'Mahalanobis' distance type",
                    ));
                };
                let x: &LibDenseMatrix<$x> = params.fit_data.try_into()?;
                let parameters = match p_data.deref().inner() {
                    DenseMatrixType::[<$x:upper>](p_data) => {
                        let p_data = p_data.deref().inner();
                        DBSCANParameters::default().with_distance(Mahalanobis::new(p_data))
                    }
                    _ => unimplemented!(),
                };
                let parameters = set_parameters(params.dbscan_parameters, parameters)?;
                let dbscan_instance = DBSCAN::fit(x, parameters)
                    .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?;
                Ok(Box::new(dbscan_instance))
            }
        }
    }
  };
}

macro_rules! create_impl_minkowski {
  (
    x_type: $x:ty
  ) => {
    paste! {
        impl LibDBSCANFactory {
            pub fn [<$x _i32_minkowski>](params: DBSCANParametersDto) -> Result<Box<dyn PredictorEstimator>> {
                let Some(p) = params.p else {
                    return Err(Error::new(
                        Status::GenericFailure,
                        "'p' must be specified for 'Minkowski' distance type",
                    ));
                };
                let x: &LibDenseMatrix<$x> = params.fit_data.try_into()?;
                let parameters = DBSCANParameters::default().with_distance(Minkowski::new(p));
                let parameters = set_parameters(params.dbscan_parameters, parameters)?;
                let dbscan_instance = DBSCAN::fit(x, parameters)
                    .map_err(|e| Error::new(Status::GenericFailure, format!("{e}")))?;
                Ok(Box::new(dbscan_instance))
            }
        }
    }
  };
}

create_impl! { x_type: f32, distance_type: Euclidian }
create_impl_mahalanobis! { x_type: f32 }
create_impl! { x_type: f32, distance_type: Manhattan }
create_impl_minkowski! { x_type: f32 }

create_impl! { x_type: f64, distance_type: Euclidian }
create_impl_mahalanobis! { x_type: f64 }
create_impl! { x_type: f64, distance_type: Manhattan }
create_impl_minkowski! { x_type: f64 }

create_impl! { x_type: i32, distance_type: Euclidian }
create_impl! { x_type: i32, distance_type: Hamming }
create_impl! { x_type: i32, distance_type: Manhattan }
create_impl_minkowski! { x_type: i32 }

create_impl! { x_type: i64, distance_type: Euclidian }
create_impl! { x_type: i64, distance_type: Manhattan }
create_impl_minkowski! { x_type: i64 }

create_impl! { x_type: u16, distance_type: Euclidian }
create_impl! { x_type: u16, distance_type: Hamming }

create_impl! { x_type: u32, distance_type: Euclidian }
create_impl! { x_type: u32, distance_type: Manhattan }

create_impl! { x_type: u64, distance_type: Euclidian }
create_impl! { x_type: u64, distance_type: Manhattan }

create_impl! { x_type: u8, distance_type: Euclidian }
create_impl! { x_type: u8, distance_type: Hamming }
