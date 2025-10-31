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
  ensemble::random_forest_classifier::RandomForestClassifier as LibRandomForestClassifier,
  linalg::basic::matrix::DenseMatrix,
};

use crate::linalg::basic::matrix::{DenseMatrixF32, DenseMatrixF64};
use parameters::RandomForestClassifierParameters;

macro_rules! random_forest_classifier_nb_struct {
  (
    feature_type: $feat:ty,
    predict_output_type: $id:ty,
    matrix_type: $matrix:ty,
    array_type: $array:ty
  ) => {
    paste! {
        #[napi(js_name=""[<RandomForestClassifier $feat:upper $id:upper>]"")]
        #[derive(Debug)]
        pub struct [<RandomForestClassifier $feat:upper $id:upper>] {
            inner: LibRandomForestClassifier<$feat, $id, DenseMatrix<$feat>, Vec<$id>>,
        }

        #[napi]
        impl [<RandomForestClassifier $feat:upper $id:upper>] {
            #[napi(factory)]
            pub fn fit(x: &$matrix, y: $array, parameters: &RandomForestClassifierParameters) -> Result<Self> {
                let inner = LibRandomForestClassifier::fit(
                    x as &DenseMatrix<$feat>,
                    &y.to_vec(),
                    parameters.owned_inner(),
                )
                .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?;
                Ok(Self { inner })
            }

            #[napi]
            pub fn predict(&self, x: &$matrix) -> Result<$array> {
                let prediction = self.inner.predict(
                    x as &DenseMatrix<$feat>
                )
                .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?;
                Ok(prediction.into())
            }

            #[napi]
            pub fn serialize(&self) -> Result<Buffer> {
                let encoded = encode_to_vec(&self.inner, standard())
                    .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?;
                Ok(Buffer::from(encoded))
            }

            #[napi(factory)]
            pub fn deserialize(data: Buffer) -> Result<Self> {
                let inner = decode_from_slice::<LibRandomForestClassifier<$feat, $id, DenseMatrix<$feat>, Vec<$id>>, _>(data.as_ref(), standard())
                    .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?.0;
                Ok(Self { inner })
            }
        }

        impl Deref for [<RandomForestClassifier $feat:upper $id:upper>] {
            type Target = LibRandomForestClassifier<$feat, $id, DenseMatrix<$feat>, Vec<$id>>;

            fn deref(&self) -> &Self::Target {
                &self.inner
            }
        }
    }
  };
}

// [f32, i64]
random_forest_classifier_nb_struct! {
    feature_type: f32,
    predict_output_type: i64,
    matrix_type: DenseMatrixF32,
    array_type: BigInt64Array
}

// [f32, u64]
random_forest_classifier_nb_struct! {
    feature_type: f32,
    predict_output_type: u64,
    matrix_type: DenseMatrixF32,
    array_type: BigUint64Array
}

// [f32, i32]
random_forest_classifier_nb_struct! {
    feature_type: f32,
    predict_output_type: i32,
    matrix_type: DenseMatrixF32,
    array_type: Int32Array
}

// [f64, i64]
random_forest_classifier_nb_struct! {
    feature_type: f64,
    predict_output_type: i64,
    matrix_type: DenseMatrixF64,
    array_type: BigInt64Array
}

// [f64, u64]
random_forest_classifier_nb_struct! {
    feature_type: f64,
    predict_output_type: u64,
    matrix_type: DenseMatrixF64,
    array_type: BigUint64Array
}

// [f64, i32]
random_forest_classifier_nb_struct! {
    feature_type: f64,
    predict_output_type: i32,
    matrix_type: DenseMatrixF64,
    array_type: Int32Array
}
