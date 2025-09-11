use napi::bindgen_prelude::*;
use napi_derive::napi;
use paste::paste;
use smartcore::{
  linalg::basic::matrix::DenseMatrix,
  metrics::distance::{mahalanobis::Mahalanobis as LibMahalanobis, Distance},
};

use crate::linalg::basic::matrix::DenseMatrixF64;

macro_rules! mahalanobis_struct {
  ( $ty:ty ) => {
    paste! {
        #[napi(js_name=""[<Mahalanobis $ty:upper>]"")]
        #[derive(Debug, Clone)]
        pub struct [<Mahalanobis $ty:upper>] {
            inner: LibMahalanobis<$ty, DenseMatrix<f64>>,
        }

        #[napi]
        impl [<Mahalanobis $ty:upper>] {
            #[napi(constructor)]
            pub fn new(data: &DenseMatrixF64) -> Self {
                Self {
                    inner: LibMahalanobis::<$ty, DenseMatrix<f64>>::new(data as &DenseMatrix<f64>)
                }
            }

            pub fn owned_inner(&self) -> LibMahalanobis<$ty, DenseMatrix<f64>> {
                self.inner.to_owned()
            }
        }
    }
  };
}

macro_rules! mahalanobis_distance_impl {
  ( $ty:ty, $x:ty, $y:ty ) => {
    paste! {
        #[napi]
        impl [<Mahalanobis $ty:upper>] {
            #[napi]
            pub fn distance(&self, x: $x, y: $y) -> f64 {
                let x = x.to_vec();
                let y = y.to_vec();
                self.inner.distance(&x, &y)
            }
        }
    }
  };
}

mahalanobis_struct! {f64}
mahalanobis_distance_impl! {f64, Float64Array, Float64Array}
