mod parameters;

use std::ops::Deref;

use napi::bindgen_prelude::*;
use napi_derive::napi;
use paste::paste;
use smartcore::{
  api::SupervisedEstimator,
  linalg::basic::matrix::DenseMatrix,
  linear::ridge_regression::{
    RidgeRegression as LibRidgeRegression,
    RidgeRegressionParameters as LibRidgeRegressionParameters,
  },
};

use crate::linalg::basic::matrix::{DenseMatrixF32, DenseMatrixF64};
use parameters::{RidgeRegressionParametersf32, RidgeRegressionParametersf64};

macro_rules! ridge_regression_struct {
  ( $x:ty, $y:ty, $xs:ty, $ys:ty ) => {
    paste! {
        #[napi(js_name=""[<RidgeRegression $x:upper $y:upper>]"")]
        #[derive(Debug)]
        pub struct [<RidgeRegression $x $y>] {
            inner: LibRidgeRegression<$x, $y, DenseMatrix<$x>, Vec<$y>>,
        }

        impl Default for [<RidgeRegression $x $y>] {
            fn default() -> Self {
                Self {
                    inner: LibRidgeRegression::<$x, $y, DenseMatrix<$x>, Vec<$y>>::new(),
                }
            }
        }

        #[napi]
        impl [<RidgeRegression $x $y>] {
            #[napi(constructor)]
            pub fn new() -> Self {
                Self::default()
            }

            #[napi(factory)]
            pub fn fit(x: &$xs, y: $ys, parameters: &[<RidgeRegressionParameters $x>]) -> Result<Self> {
                let y = y.to_vec();
                let inner = LibRidgeRegression::fit(
                    x as &DenseMatrix<$x>,
                    &y,
                    (parameters as &LibRidgeRegressionParameters<$x>).to_owned(),
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
                Ok($ys::new(prediction_result))
            }
        }

        impl Deref for [<RidgeRegression $x $y>] {
            type Target = LibRidgeRegression<$x, $y, DenseMatrix<$x>, Vec<$y>>;

            fn deref(&self) -> &Self::Target {
                &self.inner
            }
        }
    }
  };
}

ridge_regression_struct! {f32, f32, DenseMatrixF32, Float32Array}
ridge_regression_struct! {f64, f64, DenseMatrixF64, Float64Array}
ridge_regression_struct! {f32, u32, DenseMatrixF32, Uint32Array}
