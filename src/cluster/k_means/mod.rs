mod parameters;

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
    target_type: $target:ty,
    matrix_type: $matrix:ty,
    array_type: $array:ty
  ) => {
    paste! {
        #[napi(js_name=""[<KMeans $feat:upper $target:upper>]"")]
        #[derive(Debug)]
        pub struct [<KMeans $feat:upper $target:upper>] {
            inner: LibKMeans<$feat, $target, DenseMatrix<$feat>, Vec<$target>>,
        }

        #[napi]
        impl [<KMeans $feat:upper $target:upper>] {
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
                let inner = decode_from_slice::<LibKMeans<$feat, $target, DenseMatrix<$feat>, Vec<$target>>, _>(data.as_ref(), standard())
                    .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?.0;
                Ok(Self { inner })
            }
        }

        impl Deref for [<KMeans $feat:upper $target:upper>] {
            type Target = LibKMeans<$feat, $target, DenseMatrix<$feat>, Vec<$target>>;

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
// u8, u16 - Appears in the Hamming distance metrics
// target_type:
// - Cluster labels are positive: u32, u64 (not exhaustive)
// - Sensible default: u32 // for consistency
//   - Has sufficient range, recommended for cluster labels

// [f32, u32]
k_means_nb_struct! {
    feature_type: f32,
    target_type: u32,
    matrix_type: DenseMatrixF32,
    array_type: Uint32Array
}

// [f32, u64]
k_means_nb_struct! {
    feature_type: f32,
    target_type: u64,
    matrix_type: DenseMatrixF32,
    array_type: BigUint64Array
}

// [f64, u32]
k_means_nb_struct! {
    feature_type: f64,
    target_type: u32,
    matrix_type: DenseMatrixF64,
    array_type: Uint32Array
}

// [f64, u64]
k_means_nb_struct! {
    feature_type: f64,
    target_type: u64,
    matrix_type: DenseMatrixF64,
    array_type: BigUint64Array
}

// [i64, u32]
k_means_nb_struct! {
    feature_type: i64,
    target_type: u32,
    matrix_type: DenseMatrixI64,
    array_type: Uint32Array
}

// [i64, u64]
k_means_nb_struct! {
    feature_type: i64,
    target_type: u64,
    matrix_type: DenseMatrixI64,
    array_type: BigUint64Array
}

// [i32, u32]
k_means_nb_struct! {
    feature_type: i32,
    target_type: u32,
    matrix_type: DenseMatrixI32,
    array_type: Uint32Array
}

// [i32, u64]
k_means_nb_struct! {
    feature_type: i32,
    target_type: u64,
    matrix_type: DenseMatrixI32,
    array_type: BigUint64Array
}

// [u64, u32]
k_means_nb_struct! {
    feature_type: u64,
    target_type: u32,
    matrix_type: DenseMatrixU64,
    array_type: Uint32Array
}

// [u64, u64]
k_means_nb_struct! {
    feature_type: u64,
    target_type: u64,
    matrix_type: DenseMatrixU64,
    array_type: BigUint64Array
}

// [u32, u32]
k_means_nb_struct! {
    feature_type: u32,
    target_type: u32,
    matrix_type: DenseMatrixU32,
    array_type: Uint32Array
}

// [u32, u64]
k_means_nb_struct! {
    feature_type: u32,
    target_type: u64,
    matrix_type: DenseMatrixU32,
    array_type: BigUint64Array
}
