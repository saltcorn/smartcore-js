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
  linalg::basic::matrix::DenseMatrix, naive_bayes::gaussian::GaussianNB as LibGaussianNB,
};

use crate::linalg::basic::matrix::{DenseMatrixF32, DenseMatrixF64};
use parameters::GaussianNBParameters;

macro_rules! gaussian_nb_struct {
  (
    feature_type: $feat:ty,
    predict_output_type: $id:ty,
    matrix_type: $matrix:ty,
    array_type: $array:ty
  ) => {
    paste! {
        #[napi(js_name=""[<GaussianNB $feat:upper $id:upper>]"")]
        #[derive(Debug)]
        pub struct [<GaussianNB $feat:upper $id:upper>] {
            inner: LibGaussianNB<$feat, $id, DenseMatrix<$feat>, Vec<$id>>,
        }

        #[napi]
        impl [<GaussianNB $feat:upper $id:upper>] {
            #[napi(factory)]
            pub fn fit(x: &$matrix, y: $array, parameters: &GaussianNBParameters) -> Result<Self> {
                let y = y.to_vec();
                let inner = LibGaussianNB::fit(
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
                let inner = decode_from_slice::<LibGaussianNB<$feat, $id, DenseMatrix<$feat>, Vec<$id>>, _>(data.as_ref(), standard())
                    .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?.0;
                Ok(Self { inner })
            }
        }

        impl Deref for [<GaussianNB $feat:upper $id:upper>] {
            type Target = LibGaussianNB<$feat, $id, DenseMatrix<$feat>, Vec<$id>>;

            fn deref(&self) -> &Self::Target {
                &self.inner
            }
        }
    }
  };
}

// [u64]
gaussian_nb_struct! {
    feature_type: f64,
    predict_output_type: u64,
    matrix_type: DenseMatrixF64,
    array_type: BigUint64Array
}

gaussian_nb_struct! {
    feature_type: f32,
    predict_output_type: u64,
    matrix_type: DenseMatrixF32,
    array_type: BigUint64Array
}

// [u32]
gaussian_nb_struct! {
    feature_type: f64,
    predict_output_type: u32,
    matrix_type: DenseMatrixF64,
    array_type: Uint32Array
}

gaussian_nb_struct! {
    feature_type: f32,
    predict_output_type: u32,
    matrix_type: DenseMatrixF32,
    array_type: Uint32Array
}

// [u16]
gaussian_nb_struct! {
    feature_type: f64,
    predict_output_type: u16,
    matrix_type: DenseMatrixF64,
    array_type: Uint16Array
}

gaussian_nb_struct! {
    feature_type: f32,
    predict_output_type: u16,
    matrix_type: DenseMatrixF32,
    array_type: Uint16Array
}

// [u8]
gaussian_nb_struct! {
    feature_type: f64,
    predict_output_type: u8,
    matrix_type: DenseMatrixF64,
    array_type: Uint8Array
}

gaussian_nb_struct! {
    feature_type: f32,
    predict_output_type: u8,
    matrix_type: DenseMatrixF32,
    array_type: Uint8Array
}
