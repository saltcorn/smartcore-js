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

use crate::linalg::basic::matrix::DenseMatrixF64;
pub use parameters::LogisticRegressionParametersF64;

macro_rules! logistic_regression_struct {
  ( $x:ty, $y:ty, $y_mod:literal, $xs:ty, $ys:ty ) => {
    paste! {
        #[napi(js_name=""[<LogisticRegression $x:upper $y_mod $y:upper>]"")]
        #[derive(Debug)]
        pub struct [<LogisticRegression $x:upper $y_mod $y:upper>] {
            inner: LibLogisticRegression<$x, $y, DenseMatrix<$x>, Vec<$y>>,
        }

        impl Default for [<LogisticRegression $x:upper $y_mod $y:upper>] {
            fn default() -> Self {
                Self {
                    inner: LibLogisticRegression::<$x, $y, DenseMatrix<$x>, Vec<$y>>::new(),
                }
            }
        }

        #[napi]
        impl [<LogisticRegression $x:upper $y_mod $y:upper>] {
            #[napi(constructor)]
            pub fn new() -> Self {
                Self::default()
            }

            pub fn new_inner() -> LibLogisticRegression<$x, $y, DenseMatrix<$x>, Vec<$y>> {
                LibLogisticRegression::<$x, $y, DenseMatrix<$x>, Vec<$y>>::new()
            }

            #[napi(factory)]
            pub fn fit(x: &$xs, y: $ys, parameters: &[<LogisticRegressionParameters $x:upper>]) -> Result<Self> {
                let inner = LibLogisticRegression::fit(
                    x as &DenseMatrix<$x>,
                    &y.to_vec(),
                    parameters.as_ref().to_owned(),
                )
                .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?;
                Ok(Self { inner })
            }

            #[napi]
            pub fn predict(&self, x: &$xs) -> Result<$ys> {
                let prediction = self.inner.predict(
                    x as &DenseMatrix<$x>
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
                let inner = decode_from_slice::<LibLogisticRegression<$x, $y, DenseMatrix<$x>, Vec<$y>>, _>(data.as_ref(), standard())
                    .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?.0;
                Ok(Self { inner })
            }
        }

        impl AsRef<LibLogisticRegression<$x, $y, DenseMatrix<$x>, Vec<$y>>> for [<LogisticRegression $x:upper $y_mod $y:upper>] {
            fn as_ref(&self) -> &LibLogisticRegression<$x, $y, DenseMatrix<$x>, Vec<$y>> {
                &self.inner
            }
        }
    }
  };
}

logistic_regression_struct! {f64, i64, "", DenseMatrixF64, Vec<i64>}
logistic_regression_struct! {f64, i64, "Big", DenseMatrixF64, BigInt64Array}
logistic_regression_struct! {f64, u64, "Big", DenseMatrixF64, BigUint64Array}
