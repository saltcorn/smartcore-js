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
  linear::ridge_regression::RidgeRegression as LibRidgeRegression,
};

use crate::linalg::basic::matrix::DenseMatrixF64;
pub use parameters::RidgeRegressionF64Parameters;

macro_rules! ridge_regression_struct {
  ( $x:ty, $y:ty, $y_mod:literal, $xs:ty, $ys:ty ) => {
    paste! {
        #[napi(js_name=""[<RidgeRegression $x:upper $y_mod $y:upper>]"")]
        #[derive(Debug)]
        pub struct [<RidgeRegression $x:upper $y_mod $y:upper>] {
            inner: LibRidgeRegression<$x, $y, DenseMatrix<$x>, Vec<$y>>,
        }

        impl Default for [<RidgeRegression $x:upper $y_mod $y:upper>] {
            fn default() -> Self {
                Self {
                    inner: LibRidgeRegression::<$x, $y, DenseMatrix<$x>, Vec<$y>>::new(),
                }
            }
        }

        #[napi]
        impl [<RidgeRegression $x:upper $y_mod $y:upper>] {
            #[napi(constructor)]
            pub fn new() -> Self {
                Self::default()
            }

            pub fn new_inner() -> LibRidgeRegression<$x, $y, DenseMatrix<$x>, Vec<$y>> {
                LibRidgeRegression::<$x, $y, DenseMatrix<$x>, Vec<$y>>::new()
            }

            #[napi(factory)]
            pub fn fit(x: &$xs, y: $ys, parameters: &[<RidgeRegression $x:upper Parameters>]) -> Result<Self> {
                let inner = LibRidgeRegression::fit(
                    x as &DenseMatrix<$x>,
                    &y.to_vec(),
                    parameters.as_ref().to_owned(),
                )
                .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?;
                Ok(Self { inner })
            }

            #[napi]
            pub fn predict(&self, x: &$xs) -> Result<$ys> {
                let prediction_result = self
                .inner
                .predict(x as &DenseMatrix<$x>)
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
                let inner = decode_from_slice::<LibRidgeRegression<$x, $y, DenseMatrix<$x>, Vec<$y>>, _>(data.as_ref(), standard())
                    .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?.0;
                Ok(Self { inner })
            }
        }

        impl AsRef<LibRidgeRegression<$x, $y, DenseMatrix<$x>, Vec<$y>>> for [<RidgeRegression $x:upper $y_mod $y:upper>] {
            fn as_ref(&self) -> &LibRidgeRegression<$x, $y, DenseMatrix<$x>, Vec<$y>> {
                &self.inner
            }
        }
    }
  };
}

ridge_regression_struct! {f64, f64, "", DenseMatrixF64, Float64Array}
ridge_regression_struct! {f64, i64, "", DenseMatrixF64, Vec<i64>}
ridge_regression_struct! {f64, i64, "Big", DenseMatrixF64, BigInt64Array}
ridge_regression_struct! {f64, u64, "Big", DenseMatrixF64, BigUint64Array}
