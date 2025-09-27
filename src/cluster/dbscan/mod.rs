pub mod parameters;

use bincode::{
  config::standard,
  serde::{decode_from_slice, encode_to_vec},
};
use napi::bindgen_prelude::*;
use napi_derive::napi;
use paste::paste;
use smartcore::{
  cluster::dbscan::DBSCAN as LibDBSCAN,
  linalg::basic::matrix::DenseMatrix,
  metrics::distance::{
    euclidian::Euclidian, hamming::Hamming, mahalanobis::Mahalanobis, manhattan::Manhattan,
    minkowski::Minkowski,
  },
};

use crate::{
  cluster::dbscan::parameters::{
    DBSCANF64EuclidianF64Parameters, DBSCANF64HammingF64Parameters,
    DBSCANF64MahalanobisF64Parameters, DBSCANF64ManhattanF64Parameters,
    DBSCANF64MinkowskiF64Parameters,
  },
  linalg::basic::matrix::DenseMatrixF64,
};

macro_rules! knn_classifier_struct {
  ( $x:ty, $y:ty, $xs:ty, $ys:ty, $d:ty, $p_name:ty, $d_name:ty ) => {
    paste! {
        #[napi(js_name=""[<DBSCAN $x:upper $y:upper $d_name>]"")]
        #[derive(Debug)]
        pub struct [<DBSCAN $x:upper $y:upper $d_name>] {
            inner: LibDBSCAN<$x, $y, DenseMatrix<$x>, Vec<$y>, $d>,
        }

        #[napi]
        impl [<DBSCAN $x:upper $y:upper $d_name>] {
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

            #[napi]
            pub fn serialize(&self) -> Result<Buffer> {
                let encoded = encode_to_vec(&self.inner, standard())
                    .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?;
                Ok(Buffer::from(encoded))
            }

            #[napi(factory)]
            pub fn deserialize(data: Buffer) -> Result<Self> {
                let inner = decode_from_slice::<LibDBSCAN<$x, $y, DenseMatrix<$x>, Vec<$y>, $d>, _>(data.as_ref(), standard())
                    .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?.0;
                Ok(Self { inner })
            }
        }
    }
  };
}

knn_classifier_struct! {f64, f64, DenseMatrixF64, Float64Array, Euclidian<f64>, DBSCANF64EuclidianF64Parameters, EuclidianF64}
knn_classifier_struct! {f64, f64, DenseMatrixF64, Float64Array, Hamming<f64>, DBSCANF64HammingF64Parameters, HammingF64}
knn_classifier_struct! {f64, f64, DenseMatrixF64, Float64Array, Mahalanobis<f64, DenseMatrix<f64>>, DBSCANF64MahalanobisF64Parameters, MahalanobisF64}
knn_classifier_struct! {f64, f64, DenseMatrixF64, Float64Array, Manhattan<f64>, DBSCANF64ManhattanF64Parameters, ManhattanF64}
knn_classifier_struct! {f64, f64, DenseMatrixF64, Float64Array, Minkowski<f64>, DBSCANF64MinkowskiF64Parameters, MinkowskiF64}
