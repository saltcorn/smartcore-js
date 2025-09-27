mod parameters;

use bincode::{
  config::standard,
  serde::{decode_from_slice, encode_to_vec},
};
use napi::bindgen_prelude::*;
use napi_derive::napi;
use paste::paste;
use smartcore::{
  linalg::basic::matrix::DenseMatrix,
  metrics::distance::{
    euclidian::Euclidian, hamming::Hamming, mahalanobis::Mahalanobis, manhattan::Manhattan,
    minkowski::Minkowski,
  },
  neighbors::knn_classifier::KNNClassifier as LibKNNClassifier,
};

use crate::linalg::basic::matrix::DenseMatrixF64;
use parameters::{
  KNNClassifierF64EuclidianF64Parameters, KNNClassifierF64HammingF64Parameters,
  KNNClassifierF64MahalanobisF64Parameters, KNNClassifierF64ManhattanF64Parameters,
  KNNClassifierF64MinkowskiF64Parameters,
};

macro_rules! knn_classifier_struct {
  ( $x:ty, $y:ty, $y_mod:literal, $xs:ty, $ys:ty, $d:ty, $d_name:ty ) => {
    paste! {
        #[napi(js_name=""[<KNNClassifier $x:upper $y_mod $y:upper $d_name>]"")]
        #[derive(Debug)]
        pub struct [<KNNClassifier $x:upper $y_mod $y:upper $d_name>] {
            inner: LibKNNClassifier<$x, $y, DenseMatrix<$x>, Vec<$y>, $d>,
        }

        #[napi]
        impl [<KNNClassifier $x:upper $y_mod $y:upper $d_name>] {
            #[napi(factory)]
            pub fn fit(x: &$xs, y: $ys, parameters: &[<KNNClassifier $x:upper $d_name Parameters>]) -> Result<Self> {
                let inner = LibKNNClassifier::<$x, $y, DenseMatrix<$x>, Vec<$y>, $d>::fit(x, &y.to_vec(), parameters.as_ref().to_owned())
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
                let inner = decode_from_slice::<LibKNNClassifier<$x, $y, DenseMatrix<$x>, Vec<$y>, $d>, _>(data.as_ref(), standard())
                    .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?.0;
                Ok(Self { inner })
            }
        }
    }
  };
}

knn_classifier_struct! {f64, i64, "", DenseMatrixF64, Vec<i64>, Euclidian<f64>, EuclidianF64}
knn_classifier_struct! {f64, i64, "Big", DenseMatrixF64, BigInt64Array, Euclidian<f64>, EuclidianF64}
knn_classifier_struct! {f64, u64, "Big", DenseMatrixF64, BigUint64Array, Euclidian<f64>, EuclidianF64}

knn_classifier_struct! {f64, i64, "", DenseMatrixF64, Vec<i64>, Hamming<f64>, HammingF64}
knn_classifier_struct! {f64, i64, "Big", DenseMatrixF64, BigInt64Array, Hamming<f64>, HammingF64}
knn_classifier_struct! {f64, u64, "Big", DenseMatrixF64, BigUint64Array, Hamming<f64>, HammingF64}

knn_classifier_struct! {f64, i64, "", DenseMatrixF64, Vec<i64>, Manhattan<f64>, ManhattanF64}
knn_classifier_struct! {f64, i64, "Big", DenseMatrixF64, BigInt64Array, Manhattan<f64>, ManhattanF64}
knn_classifier_struct! {f64, u64, "Big", DenseMatrixF64, BigUint64Array, Manhattan<f64>, ManhattanF64}

knn_classifier_struct! {f64, i64, "", DenseMatrixF64, Vec<i64>, Minkowski<f64>, MinkowskiF64}
knn_classifier_struct! {f64, i64, "Big", DenseMatrixF64, BigInt64Array, Minkowski<f64>, MinkowskiF64}
knn_classifier_struct! {f64, u64, "Big", DenseMatrixF64, BigUint64Array, Minkowski<f64>, MinkowskiF64}

knn_classifier_struct! {f64, i64, "", DenseMatrixF64, Vec<i64>, Mahalanobis<f64, DenseMatrix<f64>>, MahalanobisF64}
knn_classifier_struct! {f64, i64, "Big", DenseMatrixF64, BigInt64Array, Mahalanobis<f64, DenseMatrix<f64>>, MahalanobisF64}
knn_classifier_struct! {f64, u64, "Big", DenseMatrixF64, BigUint64Array, Mahalanobis<f64, DenseMatrix<f64>>, MahalanobisF64}
