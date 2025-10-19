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
  ensemble::extra_trees_regressor::ExtraTreesRegressor as LibExtraTreesRegressor,
  linalg::basic::matrix::DenseMatrix,
};

use crate::linalg::basic::matrix::{DenseMatrixF32, DenseMatrixF64};
use parameters::ExtraTreesRegressorParameters;

macro_rules! extra_trees_regressor_nb_struct {
  (
    feature_type: $feat:ty,
    predict_output_type: $id:ty,
    matrix_type: $matrix:ty,
    array_type: $array:ty
  ) => {
    paste! {
        #[napi(js_name=""[<ExtraTreesRegressor $feat:upper $id:upper>]"")]
        #[derive(Debug)]
        pub struct [<ExtraTreesRegressor $feat:upper $id:upper>] {
            inner: LibExtraTreesRegressor<$feat, $id, DenseMatrix<$feat>, Vec<$id>>,
        }

        #[napi]
        impl [<ExtraTreesRegressor $feat:upper $id:upper>] {
            #[napi(factory)]
            pub fn fit(x: &$matrix, y: $array, parameters: &ExtraTreesRegressorParameters) -> Result<Self> {
                let inner = LibExtraTreesRegressor::fit(
                    x as &DenseMatrix<$feat>,
                    &y.to_vec(),
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
                let inner = decode_from_slice::<LibExtraTreesRegressor<$feat, $id, DenseMatrix<$feat>, Vec<$id>>, _>(data.as_ref(), standard())
                    .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?.0;
                Ok(Self { inner })
            }
        }

        impl Deref for [<ExtraTreesRegressor $feat:upper $id:upper>] {
            type Target = LibExtraTreesRegressor<$feat, $id, DenseMatrix<$feat>, Vec<$id>>;

            fn deref(&self) -> &Self::Target {
                &self.inner
            }
        }
    }
  };
}

// [f32, f64]
extra_trees_regressor_nb_struct! {
    feature_type: f32,
    predict_output_type: f64,
    matrix_type: DenseMatrixF32,
    array_type: Float64Array
}

// [f32, f32]
extra_trees_regressor_nb_struct! {
    feature_type: f32,
    predict_output_type: f32,
    matrix_type: DenseMatrixF32,
    array_type: Float32Array
}

// [f32, i64]
extra_trees_regressor_nb_struct! {
    feature_type: f32,
    predict_output_type: i64,
    matrix_type: DenseMatrixF32,
    array_type: BigInt64Array
}

// [f32, u64]
extra_trees_regressor_nb_struct! {
    feature_type: f32,
    predict_output_type: u64,
    matrix_type: DenseMatrixF32,
    array_type: BigUint64Array
}

// [f32, i32]
extra_trees_regressor_nb_struct! {
    feature_type: f32,
    predict_output_type: i32,
    matrix_type: DenseMatrixF32,
    array_type: Int32Array
}

// [f64, f64]
extra_trees_regressor_nb_struct! {
    feature_type: f64,
    predict_output_type: f64,
    matrix_type: DenseMatrixF64,
    array_type: Float64Array
}

// [f64, f32]
extra_trees_regressor_nb_struct! {
    feature_type: f64,
    predict_output_type: f32,
    matrix_type: DenseMatrixF64,
    array_type: Float32Array
}

// [f64, i64]
extra_trees_regressor_nb_struct! {
    feature_type: f64,
    predict_output_type: i64,
    matrix_type: DenseMatrixF64,
    array_type: BigInt64Array
}

// [f64, u64]
extra_trees_regressor_nb_struct! {
    feature_type: f64,
    predict_output_type: u64,
    matrix_type: DenseMatrixF64,
    array_type: BigUint64Array
}

// [f64, i32]
extra_trees_regressor_nb_struct! {
    feature_type: f64,
    predict_output_type: i32,
    matrix_type: DenseMatrixF64,
    array_type: Int32Array
}
