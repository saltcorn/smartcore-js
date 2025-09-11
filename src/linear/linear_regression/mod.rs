mod parameters;

use std::ops::Deref;

use napi::bindgen_prelude::*;
use napi_derive::napi;
use paste::paste;
use smartcore::{
  api::SupervisedEstimator,
  linalg::basic::matrix::DenseMatrix,
  linear::linear_regression::{
    LinearRegression as LibLinearRegression,
    LinearRegressionParameters as LibLinearRegressionParameters,
  },
};

use crate::linalg::basic::matrix::{DenseMatrixF32, DenseMatrixF64};
use parameters::LinearRegressionParameters;

macro_rules! linear_regression_struct {
  ( $x:ty, $y:ty, $xs:ty, $ys:ty ) => {
    paste! {
        #[napi(js_name=""[<LinearRegression $x:upper $y:upper>]"")]
        #[derive(Debug)]
        pub struct [<LinearRegression $x $y>] {
            inner: LibLinearRegression<$x, $y, DenseMatrix<$x>, Vec<$y>>,
        }

        impl Default for [<LinearRegression $x $y>] {
            fn default() -> Self {
                Self {
                    inner: LibLinearRegression::<$x, $y, DenseMatrix<$x>, Vec<$y>>::new(),
                }
            }
        }

        #[napi]
        impl [<LinearRegression $x $y>] {
            #[napi(constructor)]
            pub fn new() -> Self {
                Self::default()
            }

            #[napi(factory)]
            pub fn fit(x: &$xs, y: $ys, parameters: &LinearRegressionParameters) -> Result<Self> {
                let y = y.to_vec();
                let inner = LibLinearRegression::fit(
                    x as &DenseMatrix<$x>,
                    &y,
                    (parameters as &LibLinearRegressionParameters).to_owned(),
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

        impl Deref for [<LinearRegression $x $y>] {
            type Target = LibLinearRegression<$x, $y, DenseMatrix<$x>, Vec<$y>>;

            fn deref(&self) -> &Self::Target {
                &self.inner
            }
        }
    }
  };
}

linear_regression_struct! {f32, f32, DenseMatrixF32, Float32Array}
linear_regression_struct! {f64, f64, DenseMatrixF64, Float64Array}
linear_regression_struct! {f32, u32, DenseMatrixF32, Uint32Array}
