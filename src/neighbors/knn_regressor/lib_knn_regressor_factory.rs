use napi::bindgen_prelude::*;
use paste::paste;
use smartcore::{
  linalg::basic::matrix::DenseMatrix as LibDenseMatrix,
  metrics::distance::{
    euclidian::Euclidian, hamming::Hamming, mahalanobis::Mahalanobis, manhattan::Manhattan,
    minkowski::Minkowski,
  },
  neighbors::knn_regressor::{KNNRegressor, KNNRegressorParameters},
};

use super::{
  set_parameters::{set_parameters, SetParametersParams},
  DenseMatrixType,
};
use crate::{dense_matrix::DenseMatrix, traits::PredictorEstimator, typed_array::TypedArrayVec};

pub struct KNNRegressorParametersDto<'a> {
  pub fit_data_x: &'a DenseMatrix,
  pub fit_data_y: &'a TypedArrayVec,
  pub knn_regressor_parameters: SetParametersParams,
  pub data: Option<&'a &'static mut DenseMatrix>,
  pub p: Option<u16>,
}

#[derive(Debug, Clone, Default)]
pub struct LibKNNRegressorFactory {}

macro_rules! create_impl {
  (
    x_type: $x:ty,
    y_type: $y:ty,
    distance_type: $dist:ty
  ) => {
    paste! {
        impl LibKNNRegressorFactory {
            // e.g: f32_i32_euclidian
            pub fn [<$x _i32 _ $dist:lower>](params: KNNRegressorParametersDto) -> Result<Box<dyn PredictorEstimator>> {
                let x: &LibDenseMatrix<$x> = params.fit_data_x.try_into()?;
                let y: &Vec<$y> = params.fit_data_y.try_into()?;
                let parameters = KNNRegressorParameters::default().with_distance($dist::new());
                let parameters = set_parameters(params.knn_regressor_parameters, parameters)?;
                let knn_regressor_instance = KNNRegressor::fit(x, y, parameters)
                    .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?;
                Ok(Box::new(knn_regressor_instance))
            }
        }
    }
  };
}

macro_rules! create_impl_mahalanobis {
  (
    x_type: $x:ty,
    y_type: $y:ty
  ) => {
    paste! {
        impl LibKNNRegressorFactory {
            pub fn [<$x _i32_mahalanobis>](params: KNNRegressorParametersDto) -> Result<Box<dyn PredictorEstimator>> {
                let Some(p_data) = params.data else {
                    return Err(Error::new(
                        Status::GenericFailure,
                        "'data' must be specified for 'Mahalanobis' distance type",
                    ));
                };
                let x: &LibDenseMatrix<$x> = params.fit_data_x.try_into()?;
                let y: &Vec<$y> = params.fit_data_y.try_into()?;
                let parameters = match p_data.r#type() {
                    DenseMatrixType::[<$x:upper>] => {
                        let p_data: &LibDenseMatrix<$x> = (&**p_data).try_into()?;
                        KNNRegressorParameters::default().with_distance(Mahalanobis::new(p_data))
                    }
                    _ => unimplemented!(),
                };
                let parameters = set_parameters(params.knn_regressor_parameters, parameters)?;
                let knn_regressor_instance = KNNRegressor::fit(x, y, parameters)
                    .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?;
                Ok(Box::new(knn_regressor_instance))
            }
        }
    }
  };
}

macro_rules! create_impl_minkowski {
  (
    x_type: $x:ty,
    y_type: $y:ty
  ) => {
    paste! {
        impl LibKNNRegressorFactory {
            pub fn [<$x _i32_minkowski>](params: KNNRegressorParametersDto) -> Result<Box<dyn PredictorEstimator>> {
                let Some(p) = params.p else {
                    return Err(Error::new(
                        Status::GenericFailure,
                        "'p' must be specified for 'Minkowski' distance type",
                    ));
                };
                let x: &LibDenseMatrix<$x> = params.fit_data_x.try_into()?;
                let y: &Vec<$y> = params.fit_data_y.try_into()?;
                let parameters = KNNRegressorParameters::default().with_distance(Minkowski::new(p));
                let parameters = set_parameters(params.knn_regressor_parameters, parameters)?;
                let knn_regressor_instance = KNNRegressor::fit(x, y, parameters)
                    .map_err(|e| Error::new(Status::GenericFailure, format!("{e}")))?;
                Ok(Box::new(knn_regressor_instance))
            }
        }
    }
  };
}

create_impl! { x_type: f32, y_type: f32, distance_type: Euclidian }
create_impl_mahalanobis! { x_type: f32, y_type: f32 }
create_impl! { x_type: f32, y_type: f32, distance_type: Manhattan }
create_impl_minkowski! { x_type: f32, y_type: f32 }

create_impl! { x_type: f64, y_type: f32, distance_type: Euclidian }
create_impl_mahalanobis! { x_type: f64, y_type: f32 }
create_impl! { x_type: f64, y_type: f32, distance_type: Manhattan }
create_impl_minkowski! { x_type: f64, y_type: f32 }

create_impl! { x_type: i32, y_type: f32, distance_type: Euclidian }
create_impl! { x_type: i32, y_type: f32, distance_type: Hamming }
create_impl! { x_type: i32, y_type: f32, distance_type: Manhattan }
create_impl_minkowski! { x_type: i32, y_type: f32 }

create_impl! { x_type: i64, y_type: f32, distance_type: Euclidian }
create_impl! { x_type: i64, y_type: f32, distance_type: Manhattan }
create_impl_minkowski! { x_type: i64,  y_type: f32 }

create_impl! { x_type: u16, y_type: f32, distance_type: Euclidian }
create_impl! { x_type: u16, y_type: f32, distance_type: Hamming }

create_impl! { x_type: u32, y_type: f32, distance_type: Euclidian }
create_impl! { x_type: u32, y_type: f32, distance_type: Manhattan }

create_impl! { x_type: u64, y_type: f32, distance_type: Euclidian }
create_impl! { x_type: u64, y_type: f32, distance_type: Manhattan }

create_impl! { x_type: u8, y_type: f32, distance_type: Euclidian }
create_impl! { x_type: u8, y_type: f32, distance_type: Hamming }
