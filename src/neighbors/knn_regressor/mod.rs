pub mod parameters;

use napi::bindgen_prelude::*;
use napi_derive::napi;
use paste::paste;
use smartcore::{
  linalg::basic::matrix::DenseMatrix, metrics::distance::euclidian::Euclidian,
  neighbors::knn_regressor::KNNRegressor as LibKNNRegressor,
};

use crate::linalg::basic::matrix::DenseMatrixF32;

macro_rules! knn_classifier_struct {
  ( $x:ty, $y:ty, $xs:ty, $ys:ty, $d:ty ) => {
    paste! {
        #[napi(js_name=""[<KNNRegressor $x:upper $y:upper>]"")]
        #[derive(Debug)]
        pub struct [<KNNRegressor $x:upper $y:upper>] {
            inner: LibKNNRegressor<$x, $y, DenseMatrix<$x>, Vec<$y>, $d>,
        }

        #[napi]
        impl [<KNNRegressor $x:upper $y:upper>] {
            #[napi(factory)]
            pub fn fit(x: &$xs, y: $ys) -> Result<Self> {
                let y = y.to_vec();
                let inner = LibKNNRegressor::<$x, $y, DenseMatrix<$x>, Vec<$y>, $d>::fit(x, &y, Default::default())
                    .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?;
                Ok(Self { inner })
            }

            #[napi]
            pub fn predict(&self, x: &$xs) -> Result<$ys> {
                let predict_result = self.inner.predict(x).map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?;
                Ok($ys::new(predict_result))
            }
        }
    }
  };
}

knn_classifier_struct! {f32, u32, DenseMatrixF32, Uint32Array, Euclidian<f32>}
