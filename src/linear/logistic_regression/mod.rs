mod parameters;

use std::ops::Deref;

use napi::bindgen_prelude::*;
use napi_derive::napi;
use paste::paste;
use smartcore::{
  api::SupervisedEstimator,
  linalg::basic::matrix::DenseMatrix,
  linear::logistic_regression::{
    LogisticRegression as LibLogisticRegression,
    LogisticRegressionParameters as LibLogisticRegressionParameters,
  },
};

use crate::linalg::basic::matrix::{DenseMatrixf32, DenseMatrixf64};
use parameters::{LogisticRegressionParametersf32, LogisticRegressionParametersf64};

macro_rules! logistic_regression_struct {
  ( $x:ty, $y:ty, $xs:ty, $ys:ty ) => {
    paste! {
        #[napi(js_name=""[<LogisticRegression $x:upper $y:upper>]"")]
        #[derive(Debug)]
        pub struct [<LogisticRegression $x $y>] {
            inner: LibLogisticRegression<$x, $y, DenseMatrix<$x>, Vec<$y>>,
        }

        impl Default for [<LogisticRegression $x $y>] {
            fn default() -> Self {
                Self {
                    inner: LibLogisticRegression::<$x, $y, DenseMatrix<$x>, Vec<$y>>::new(),
                }
            }
        }

        #[napi]
        impl [<LogisticRegression $x $y>] {
            #[napi(constructor)]
            pub fn new() -> Self {
                Self::default()
            }

            #[napi(factory)]
            pub fn fit(x: &$xs, y: $ys, parameters: &[<LogisticRegressionParameters $x>]) -> Result<Self> {
                let y = y.to_vec();
                let inner = LibLogisticRegression::fit(
                    x as &DenseMatrix<$x>,
                    &y,
                    (parameters as &LibLogisticRegressionParameters<$x>).to_owned(),
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

        impl Deref for [<LogisticRegression $x $y>] {
            type Target = LibLogisticRegression<$x, $y, DenseMatrix<$x>, Vec<$y>>;

            fn deref(&self) -> &Self::Target {
                &self.inner
            }
        }
    }
  };
}

logistic_regression_struct! {f32, u32, DenseMatrixf32, Uint32Array}
logistic_regression_struct! {f64, u64, DenseMatrixf64, BigUint64Array}
