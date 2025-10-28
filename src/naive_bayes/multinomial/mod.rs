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
  linalg::basic::matrix::DenseMatrix, naive_bayes::multinomial::MultinomialNB as LibMultinomialNB,
};

use crate::linalg::basic::matrix::{DenseMatrixU16, DenseMatrixU32, DenseMatrixU64, DenseMatrixU8};
use parameters::MultinomialNBParameters;

macro_rules! multinomial_nb_struct {
  (
    feature_type: $feat:ty,
    predict_output_type: $id:ty,
    matrix_type: $matrix:ty,
    array_type: $array:ty
  ) => {
    paste! {
        #[napi(js_name=""[<MultinomialNB $feat:upper $id:upper>]"")]
        #[derive(Debug)]
        pub struct [<MultinomialNB $feat:upper $id:upper>] {
            inner: LibMultinomialNB<$feat, $id, DenseMatrix<$feat>, Vec<$id>>,
        }

        #[napi]
        impl [<MultinomialNB $feat:upper $id:upper>] {
            #[napi(factory)]
            pub fn fit(x: &$matrix, y: $array, parameters: &MultinomialNBParameters) -> Result<Self> {
                let y = y.to_vec();
                let inner = LibMultinomialNB::fit(
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
                Ok($array::new(prediction_result))
            }

            #[napi]
            pub fn serialize(&self) -> Result<Buffer> {
                let encoded = encode_to_vec(&self.inner, standard())
                    .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?;
                Ok(Buffer::from(encoded))
            }

            #[napi(factory)]
            pub fn deserialize(data: Buffer) -> Result<Self> {
                let inner = decode_from_slice::<LibMultinomialNB<$feat, $id, DenseMatrix<$feat>, Vec<$id>>, _>(data.as_ref(), standard())
                    .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?.0;
                Ok(Self { inner })
            }
        }

        impl Deref for [<MultinomialNB $feat:upper $id:upper>] {
            type Target = LibMultinomialNB<$feat, $id, DenseMatrix<$feat>, Vec<$id>>;

            fn deref(&self) -> &Self::Target {
                &self.inner
            }
        }
    }
  };
}

multinomial_nb_struct! {
    feature_type: u64,
    predict_output_type: u64,
    matrix_type: DenseMatrixU64,
    array_type: BigUint64Array
}

multinomial_nb_struct! {
    feature_type: u64,
    predict_output_type: u32,
    matrix_type: DenseMatrixU64,
    array_type: Uint32Array
}

multinomial_nb_struct! {
    feature_type: u64,
    predict_output_type: u16,
    matrix_type: DenseMatrixU64,
    array_type: Uint16Array
}

multinomial_nb_struct! {
    feature_type: u64,
    predict_output_type: u8,
    matrix_type: DenseMatrixU64,
    array_type: Uint8Array
}

multinomial_nb_struct! {
    feature_type: u32,
    predict_output_type: u32,
    matrix_type: DenseMatrixU32,
    array_type: Uint32Array
}

multinomial_nb_struct! {
    feature_type: u32,
    predict_output_type: u16,
    matrix_type: DenseMatrixU32,
    array_type: Uint16Array
}

multinomial_nb_struct! {
    feature_type: u32,
    predict_output_type: u8,
    matrix_type: DenseMatrixU32,
    array_type: Uint8Array
}

multinomial_nb_struct! {
    feature_type: u16,
    predict_output_type: u16,
    matrix_type: DenseMatrixU16,
    array_type: Uint16Array
}

multinomial_nb_struct! {
    feature_type: u16,
    predict_output_type: u8,
    matrix_type: DenseMatrixU16,
    array_type: Uint8Array
}

multinomial_nb_struct! {
    feature_type: u8,
    predict_output_type: u8,
    matrix_type: DenseMatrixU8,
    array_type: Uint8Array
}
