mod parameters;

use bincode::{
  config::standard,
  serde::{decode_from_slice, encode_to_vec},
};
use napi::bindgen_prelude::*;
use napi_derive::napi;
use paste::paste;
use smartcore::{
  api::SupervisedEstimator, linalg::basic::matrix::DenseMatrix,
  linear::logistic_regression::LogisticRegression as LibLogisticRegression,
};

use crate::linalg::basic::matrix::{DenseMatrixF32, DenseMatrixF64};
pub use parameters::{LogisticRegressionParametersF32, LogisticRegressionParametersF64};

macro_rules! logistic_regression_struct {
  (
    feature_type: $feat:ty,
    predict_output_type: $id:ty,
    matrix_type: $matrix:ty,
    array_type: $array:ty
  ) => {
    paste! {
        #[napi(js_name=""[<LogisticRegression $feat:upper $id:upper>]"")]
        #[derive(Debug)]
        pub struct [<LogisticRegression $feat:upper $id:upper>] {
            inner: LibLogisticRegression<$feat, $id, DenseMatrix<$feat>, Vec<$id>>,
        }

        impl Default for [<LogisticRegression $feat:upper $id:upper>] {
            fn default() -> Self {
                Self {
                    inner: LibLogisticRegression::<$feat, $id, DenseMatrix<$feat>, Vec<$id>>::new(),
                }
            }
        }

        #[napi]
        impl [<LogisticRegression $feat:upper $id:upper>] {
            #[napi(constructor)]
            pub fn new() -> Self {
                Self::default()
            }

            pub fn new_inner() -> LibLogisticRegression<$feat, $id, DenseMatrix<$feat>, Vec<$id>> {
                LibLogisticRegression::<$feat, $id, DenseMatrix<$feat>, Vec<$id>>::new()
            }

            #[napi(factory)]
            pub fn fit(x: &$matrix, y: $array, parameters: &[<LogisticRegressionParameters $feat:upper>]) -> Result<Self> {
                let inner = LibLogisticRegression::fit(
                    x as &DenseMatrix<$feat>,
                    &y.to_vec(),
                    parameters.as_ref().to_owned(),
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
                let inner = decode_from_slice::<LibLogisticRegression<$feat, $id, DenseMatrix<$feat>, Vec<$id>>, _>(data.as_ref(), standard())
                    .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?.0;
                Ok(Self { inner })
            }
        }

        impl AsRef<LibLogisticRegression<$feat, $id, DenseMatrix<$feat>, Vec<$id>>> for [<LogisticRegression $feat:upper $id:upper>] {
            fn as_ref(&self) -> &LibLogisticRegression<$feat, $id, DenseMatrix<$feat>, Vec<$id>> {
                &self.inner
            }
        }
    }
  };
}

// [f32, i64]
logistic_regression_struct! {
    feature_type: f32,
    predict_output_type: i64,
    matrix_type: DenseMatrixF32,
    array_type: BigInt64Array
}

// [f32, u64]
logistic_regression_struct! {
    feature_type: f32,
    predict_output_type: u64,
    matrix_type: DenseMatrixF32,
    array_type: BigUint64Array
}

// [f32, i32]
logistic_regression_struct! {
    feature_type: f32,
    predict_output_type: i32,
    matrix_type: DenseMatrixF32,
    array_type: Int32Array
}

// [f64, i64]
logistic_regression_struct! {
    feature_type: f64,
    predict_output_type: i64,
    matrix_type: DenseMatrixF64,
    array_type: BigInt64Array
}

// [f64, u64]
logistic_regression_struct! {
    feature_type: f64,
    predict_output_type: u64,
    matrix_type: DenseMatrixF64,
    array_type: BigUint64Array
}

// [f64, i32]
logistic_regression_struct! {
    feature_type: f64,
    predict_output_type: i32,
    matrix_type: DenseMatrixF64,
    array_type: Int32Array
}
