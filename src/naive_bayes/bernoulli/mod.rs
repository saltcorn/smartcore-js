mod parameters;

use std::ops::Deref;

use bincode::{
  config::standard,
  serde::{decode_from_slice, encode_to_vec},
};
use napi::bindgen_prelude::*;
use napi_derive::napi;
use paste::paste;
use smartcore::{
  linalg::basic::matrix::DenseMatrix, naive_bayes::bernoulli::BernoulliNB as LibBernoulliNB,
};

use crate::linalg::basic::matrix::{
  DenseMatrixF32, DenseMatrixF64, DenseMatrixI32, DenseMatrixI64, DenseMatrixU16, DenseMatrixU32,
  DenseMatrixU64, DenseMatrixU8,
};
use parameters::{
  BernoulliNBF32Parameters, BernoulliNBF64Parameters, BernoulliNBI32Parameters,
  BernoulliNBI64Parameters, BernoulliNBU16Parameters, BernoulliNBU32Parameters,
  BernoulliNBU64Parameters, BernoulliNBU8Parameters,
};

macro_rules! bernoulli_nb_struct {
  (
    feature_type: $feat:ty,
    predict_output_type: $id:ty,
    matrix_type: $matrix:ty,
    array_type: $array:ty
  ) => {
    paste! {
        #[napi(js_name=""[<BernoulliNB $feat:upper $id:upper>]"")]
        #[derive(Debug)]
        pub struct [<BernoulliNB $feat:upper $id:upper>] {
            inner: LibBernoulliNB<$feat, $id, DenseMatrix<$feat>, Vec<$id>>,
        }

        #[napi]
        impl [<BernoulliNB $feat:upper $id:upper>] {
            #[napi(factory)]
            pub fn fit(x: &$matrix, y: $array, parameters: &[<BernoulliNB $feat:upper Parameters>]) -> Result<Self> {
                let y = y.to_vec();
                let inner = LibBernoulliNB::fit(
                    x as &DenseMatrix<$feat>,
                    &y,
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
                let inner = decode_from_slice::<LibBernoulliNB<$feat, $id, DenseMatrix<$feat>, Vec<$id>>, _>(data.as_ref(), standard())
                    .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?.0;
                Ok(Self { inner })
            }
        }

        impl Deref for [<BernoulliNB $feat:upper $id:upper>] {
            type Target = LibBernoulliNB<$feat, $id, DenseMatrix<$feat>, Vec<$id>>;

            fn deref(&self) -> &Self::Target {
                &self.inner
            }
        }
    }
  };
}

// [f32, u64]
bernoulli_nb_struct! {
    feature_type: f32,
    predict_output_type: u64,
    matrix_type: DenseMatrixF32,
    array_type: BigUint64Array
}

// [f32, u32]
bernoulli_nb_struct! {
    feature_type: f32,
    predict_output_type: u32,
    matrix_type: DenseMatrixF32,
    array_type: Uint32Array
}

// [f64, u64]
bernoulli_nb_struct! {
    feature_type: f64,
    predict_output_type: u64,
    matrix_type: DenseMatrixF64,
    array_type: BigUint64Array
}

// [f64, u32]
bernoulli_nb_struct! {
    feature_type: f64,
    predict_output_type: u32,
    matrix_type: DenseMatrixF64,
    array_type: Uint32Array
}

// [i32, u64]
bernoulli_nb_struct! {
    feature_type: i32,
    predict_output_type: u64,
    matrix_type: DenseMatrixI32,
    array_type: BigUint64Array
}

// [i32, u32]
bernoulli_nb_struct! {
    feature_type: i32,
    predict_output_type: u32,
    matrix_type: DenseMatrixI32,
    array_type: Uint32Array
}

// [i64, u64]
bernoulli_nb_struct! {
    feature_type: i64,
    predict_output_type: u64,
    matrix_type: DenseMatrixI64,
    array_type: BigUint64Array
}

// [i64, u32]
bernoulli_nb_struct! {
    feature_type: i64,
    predict_output_type: u32,
    matrix_type: DenseMatrixI64,
    array_type: Uint32Array
}

// [u16, u64]
bernoulli_nb_struct! {
    feature_type: u16,
    predict_output_type: u64,
    matrix_type: DenseMatrixU16,
    array_type: BigUint64Array
}

// [u16, u32]
bernoulli_nb_struct! {
    feature_type: u16,
    predict_output_type: u32,
    matrix_type: DenseMatrixU16,
    array_type: Uint32Array
}

// [u32, u64]
bernoulli_nb_struct! {
    feature_type: u32,
    predict_output_type: u64,
    matrix_type: DenseMatrixU32,
    array_type: BigUint64Array
}

// [u32, u32]
bernoulli_nb_struct! {
    feature_type: u32,
    predict_output_type: u32,
    matrix_type: DenseMatrixU32,
    array_type: Uint32Array
}

// [u64, u64]
bernoulli_nb_struct! {
    feature_type: u64,
    predict_output_type: u64,
    matrix_type: DenseMatrixU64,
    array_type: BigUint64Array
}

// [u64, u32]
bernoulli_nb_struct! {
    feature_type: u64,
    predict_output_type: u32,
    matrix_type: DenseMatrixU64,
    array_type: Uint32Array
}

// [u8, u64]
bernoulli_nb_struct! {
    feature_type: u8,
    predict_output_type: u64,
    matrix_type: DenseMatrixU8,
    array_type: BigUint64Array
}

// [u8, u32]
bernoulli_nb_struct! {
    feature_type: u8,
    predict_output_type: u32,
    matrix_type: DenseMatrixU8,
    array_type: Uint32Array
}
