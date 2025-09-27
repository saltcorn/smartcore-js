pub mod parameters;

use bincode::{
  config::standard,
  serde::{decode_from_slice, encode_to_vec},
};
use napi::bindgen_prelude::*;
use napi_derive::napi;
use paste::paste;
use smartcore::{
  linalg::basic::matrix::DenseMatrix, metrics::distance::euclidian::Euclidian,
  neighbors::knn_regressor::KNNRegressor as LibKNNRegressor,
};

use crate::linalg::basic::matrix::DenseMatrixF64;

macro_rules! knn_classifier_struct {
  ( $x:ty, $y:ty, $y_mod:literal, $xs:ty, $ys:ty, $d:ty ) => {
    paste! {
        #[napi(js_name=""[<KNNRegressor $x:upper $y_mod $y:upper>]"")]
        #[derive(Debug)]
        pub struct [<KNNRegressor $x:upper $y_mod $y:upper>] {
            inner: LibKNNRegressor<$x, $y, DenseMatrix<$x>, Vec<$y>, $d>,
        }

        #[napi]
        impl [<KNNRegressor $x:upper $y_mod $y:upper>] {
            #[napi(factory)]
            pub fn fit(x: &$xs, y: $ys) -> Result<Self> {
                let inner = LibKNNRegressor::<$x, $y, DenseMatrix<$x>, Vec<$y>, $d>::fit(x, &y.to_vec(), Default::default())
                    .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?;
                Ok(Self { inner })
            }

            #[napi]
            pub fn predict(&self, x: &$xs) -> Result<$ys> {
                let predict_result = self.inner.predict(x).map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?;
                Ok(predict_result.into())
            }

            #[napi]
            pub fn serialize(&self) -> Result<Buffer> {
                let encoded = encode_to_vec(&self.inner, standard())
                    .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?;
                Ok(Buffer::from(encoded))
            }

            #[napi(factory)]
            pub fn deserialize(data: Buffer) -> Result<Self> {
                let inner = decode_from_slice::<LibKNNRegressor<$x, $y, DenseMatrix<$x>, Vec<$y>, $d>, _>(data.as_ref(), standard())
                    .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?.0;
                Ok(Self { inner })
            }
        }
    }
  };
}

knn_classifier_struct! {f64, f64, "", DenseMatrixF64, Float64Array, Euclidian<f64>}
knn_classifier_struct! {f64, i64, "", DenseMatrixF64, Vec<i64>, Euclidian<f64>}
knn_classifier_struct! {f64, i64, "Big", DenseMatrixF64, BigInt64Array, Euclidian<f64>}
knn_classifier_struct! {f64, u64, "Big", DenseMatrixF64, BigUint64Array, Euclidian<f64>}
