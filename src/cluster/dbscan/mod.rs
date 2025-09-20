pub mod parameters;

use napi::bindgen_prelude::*;
use napi_derive::napi;
use paste::paste;
use smartcore::{
  cluster::dbscan::DBSCAN as LibDBSCAN, linalg::basic::matrix::DenseMatrix,
  metrics::distance::euclidian::Euclidian,
};

use crate::{
  cluster::dbscan::parameters::EuclidianF64DBSCANF64Parameters,
  linalg::basic::matrix::DenseMatrixF64,
};

macro_rules! knn_classifier_struct {
  ( $x:ty, $y:ty, $xs:ty, $ys:ty, $d:ty, $p_name:ty ) => {
    paste! {
        #[napi(js_name=""[<DBSCAN $x:upper $y:upper>]"")]
        #[derive(Debug)]
        pub struct [<DBSCAN $x:upper $y:upper>] {
            inner: LibDBSCAN<$x, $y, DenseMatrix<$x>, Vec<$y>, $d>,
        }

        #[napi]
        impl [<DBSCAN $x:upper $y:upper>] {
            #[napi(factory)]
            pub fn fit(x: &$xs, parameters:&$p_name) -> Result<Self> {
                let inner = LibDBSCAN::<$x, $y, DenseMatrix<$x>, Vec<$y>, $d>::fit(x, parameters.owned_inner())
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

knn_classifier_struct! {f64, f64, DenseMatrixF64, Float64Array, Euclidian<f64>, EuclidianF64DBSCANF64Parameters}
