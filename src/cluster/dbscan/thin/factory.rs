use std::ops::Deref;

use napi::bindgen_prelude::*;
use paste::paste;
use smartcore::{
  cluster::dbscan::{DBSCANParameters, DBSCAN},
  linalg::basic::matrix::DenseMatrix,
  metrics::distance::{
    euclidian::Euclidian, hamming::Hamming, mahalanobis::Mahalanobis, manhattan::Manhattan,
    minkowski::Minkowski,
  },
};

use super::{set_parameters, DBSCANParams, DBSCANVariants, DenseMatrixType};

#[derive(Debug, Clone, Default)]
pub struct DBSCANFactory {}

macro_rules! create_impl {
  (
    x_type: $x:ty,
    distance_type: $dist:ty
  ) => {
    paste! {
        impl DBSCANFactory {
            // e.g: f32_i32_euclidian
            pub fn [<$x _i32 _ $dist:lower>](x: &DenseMatrix<$x>, params: &DBSCANParams) -> Result<DBSCANVariants> {
                let parameters = DBSCANParameters::default().with_distance($dist::new());
                let parameters = set_parameters(params, parameters)?;
                let dbscan_instance = DBSCAN::fit(x, parameters)
                    .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?;
                Ok(DBSCANVariants::[<$x:upper I32 $dist>](dbscan_instance))
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
        impl DBSCANFactory {
            pub fn [<$x _i32_mahalanobis>](x: &DenseMatrix<$x>, params: &DBSCANParams) -> Result<DBSCANVariants> {
                let Some(ref p_data) = params.data else {
                    return Err(Error::new(
                        Status::GenericFailure,
                        "'data' must be specified for 'Mahalanobis' distance type",
                    ));
                };
                let parameters = match p_data.deref().inner() {
                    DenseMatrixType::[<$x:upper>](p_data) => {
                        let p_data = p_data.deref().inner();
                        DBSCANParameters::default().with_distance(Mahalanobis::new(p_data))
                    }
                    _ => unimplemented!(),
                };
                let parameters = set_parameters(params, parameters)?;
                let dbscan_instance = DBSCAN::fit(x, parameters)
                    .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?;
                Ok(DBSCANVariants::[<$x:upper I32Mahalanobis>](dbscan_instance))
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
        impl DBSCANFactory {
            pub fn [<$x _i32_minkowski>](x: &DenseMatrix<$x>, params: &DBSCANParams) -> Result<DBSCANVariants> {
                let Some(p) = params.p else {
                    return Err(Error::new(
                        Status::GenericFailure,
                        "'p' must be specified for 'Minkowski' distance type",
                    ));
                };
                let parameters = DBSCANParameters::default().with_distance(Minkowski::new(p));
                let parameters = set_parameters(params, parameters)?;
                let dbscan_instance = DBSCAN::fit(x, parameters)
                    .map_err(|e| Error::new(Status::GenericFailure, format!("{e}")))?;
                Ok(DBSCANVariants::[<$x:upper I32Minkowski>](dbscan_instance))
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
