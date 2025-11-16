mod builder;
mod deserialize;
mod factory;
mod lib_kmeans_factory;
mod parameters;
mod predict_output_type;
mod predictor_estimator;
mod serialize_data;
mod v2;
mod variants;

use std::ops::Deref;

use bincode::{
  config::standard,
  serde::{decode_from_slice, encode_to_vec},
};
use napi::bindgen_prelude::*;
use napi_derive::napi;
use paste::paste;
use smartcore::{cluster::kmeans::KMeans as LibKMeans, linalg::basic::matrix::DenseMatrix};

use crate::linalg::basic::matrix::{
  DenseMatrixF32, DenseMatrixF64, DenseMatrixI32, DenseMatrixI64, DenseMatrixU32, DenseMatrixU64,
};
use parameters::KMeansParameters;

macro_rules! k_means_nb_struct {
  (
    feature_type: $feat:ty,
    predict_output_type: $id:ty,
    matrix_type: $matrix:ty,
    array_type: $array:ty
  ) => {
    paste! {
        #[napi(js_name=""[<KMeans $feat:upper $id:upper>]"")]
        #[derive(Debug)]
        pub struct [<KMeans $feat:upper $id:upper>] {
            inner: LibKMeans<$feat, $id, DenseMatrix<$feat>, Vec<$id>>,
        }

        #[napi]
        impl [<KMeans $feat:upper $id:upper>] {
            #[napi(factory)]
            pub fn fit(x: &$matrix, parameters: &KMeansParameters) -> Result<Self> {
                let inner = LibKMeans::fit(
                    x as &DenseMatrix<$feat>,
                    parameters.owned_inner(),
                )
                .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?;
                Ok(Self { inner })
            }

            #[napi]
            pub fn predict(&self, x: &$matrix) -> Result<$array> {
                let prediction_result = self
                .inner
                .predict(x as &DenseMatrix<$feat>)
                .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?;
                Ok(prediction_result.into())
            }

            #[napi]
            pub fn serialize(&self) -> Result<Buffer> {
                let encoded = encode_to_vec(&self.inner, standard())
                    .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?;
                Ok(Buffer::from(encoded))
            }

            #[napi(factory)]
            pub fn deserialize(data: Buffer) -> Result<Self> {
                let inner = decode_from_slice::<LibKMeans<$feat, $id, DenseMatrix<$feat>, Vec<$id>>, _>(data.as_ref(), standard())
                    .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?.0;
                Ok(Self { inner })
            }
        }

        impl Deref for [<KMeans $feat:upper $id:upper>] {
            type Target = LibKMeans<$feat, $id, DenseMatrix<$feat>, Vec<$id>>;

            fn deref(&self) -> &Self::Target {
                &self.inner
            }
        }
    }
  };
}

// Type selection justification (clustering algorithms - KMeans):
// feature_type:
// f32, f64, i64, i32, u64, u32 - Appear in most feature
// predict_output_type:
// - Cluster labels are positive: u32, u64 (not exhaustive)
// - Sensible default: i32 // for consistency
//   - Has sufficient range, recommended for cluster labels

// [f32, i32]
k_means_nb_struct! {
    feature_type: f32,
    predict_output_type: i32,
    matrix_type: DenseMatrixF32,
    array_type: Int32Array
}

// [f32, i64]
k_means_nb_struct! {
    feature_type: f32,
    predict_output_type: i64,
    matrix_type: DenseMatrixF32,
    array_type: BigInt64Array
}

// [f64, i32]
k_means_nb_struct! {
    feature_type: f64,
    predict_output_type: i32,
    matrix_type: DenseMatrixF64,
    array_type: Int32Array
}

// [f64, i64]
k_means_nb_struct! {
    feature_type: f64,
    predict_output_type: i64,
    matrix_type: DenseMatrixF64,
    array_type: BigInt64Array
}

// [i64, i32]
k_means_nb_struct! {
    feature_type: i64,
    predict_output_type: i32,
    matrix_type: DenseMatrixI64,
    array_type: Int32Array
}

// [i64, i64]
k_means_nb_struct! {
    feature_type: i64,
    predict_output_type: i64,
    matrix_type: DenseMatrixI64,
    array_type: BigInt64Array
}

// [i32, i32]
k_means_nb_struct! {
    feature_type: i32,
    predict_output_type: i32,
    matrix_type: DenseMatrixI32,
    array_type: Int32Array
}

// [i32, i64]
k_means_nb_struct! {
    feature_type: i32,
    predict_output_type: i64,
    matrix_type: DenseMatrixI32,
    array_type: BigInt64Array
}

// [u64, i32]
k_means_nb_struct! {
    feature_type: u64,
    predict_output_type: i32,
    matrix_type: DenseMatrixU64,
    array_type: Int32Array
}

// [u64, i64]
k_means_nb_struct! {
    feature_type: u64,
    predict_output_type: i64,
    matrix_type: DenseMatrixU64,
    array_type: BigInt64Array
}

// [u32, i32]
k_means_nb_struct! {
    feature_type: u32,
    predict_output_type: i32,
    matrix_type: DenseMatrixU32,
    array_type: Int32Array
}

// [u32, i64]
k_means_nb_struct! {
    feature_type: u32,
    predict_output_type: i64,
    matrix_type: DenseMatrixU32,
    array_type: BigInt64Array
}
