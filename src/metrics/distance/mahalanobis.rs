use napi::bindgen_prelude::*;
use napi_derive::napi;
use paste::paste;
use smartcore::{
  linalg::basic::matrix::DenseMatrix,
  metrics::distance::{mahalanobis::Mahalanobis as LibMahalanobis, Distance},
};

use crate::linalg::basic::matrix::{DenseMatrixF32, DenseMatrixF64};

macro_rules! mahalanobis_struct {
  (
    feature_type: $feat:ty,
    matrix_type: $matrix:ty,
    array_type: $array_napi:ty
  ) => {
    paste! {
        #[napi(js_name=""[<Mahalanobis $feat:upper>]"")]
        #[derive(Debug, Clone)]
        pub struct [<Mahalanobis $feat:upper>] {
            inner: LibMahalanobis<$feat, DenseMatrix<f64>>,
        }

        #[napi]
        impl [<Mahalanobis $feat:upper>] {
            #[napi(constructor)]
            pub fn new(data: &$matrix) -> Self {
                Self {
                    inner: LibMahalanobis::<$feat, DenseMatrix<f64>>::new(data as &DenseMatrix<$feat>)
                }
            }

            pub fn owned_inner(&self) -> LibMahalanobis<$feat, DenseMatrix<f64>> {
                self.inner.to_owned()
            }

            #[napi]
            pub fn distance(&self, x: $array_napi, y: $array_napi) -> f64 {
                let x = x.to_vec();
                let y = y.to_vec();
                self.inner.distance(&x, &y)
            }
        }
    }
  };
}

// Only works with floating point values
mahalanobis_struct! { feature_type: f32, matrix_type: DenseMatrixF32, array_type: Float32Array}
mahalanobis_struct! { feature_type: f64, matrix_type: DenseMatrixF64, array_type: Float64Array}
