use napi_derive::napi;
use paste::paste;
use smartcore::linear::logistic_regression::{
  LogisticRegressionParameters as LibLogisticRegressionParameters,
  LogisticRegressionSolverName as LibLogisticRegressionSolverName,
};

#[napi(string_enum)]
pub enum LogisticRegressionSolverName {
  #[allow(clippy::upper_case_acronyms)]
  LBFGS,
}

macro_rules! logistic_regression_parameters_struct {
  ( $ty:ty ) => {
    paste! {
        #[napi(js_name=""[<LogisticRegressionParameters $ty:upper>]"")]
        #[derive(Debug, Clone, Default)]
        pub struct [<LogisticRegressionParameters $ty:upper>] {
            inner: LibLogisticRegressionParameters<$ty>,
        }

        #[napi]
        impl [<LogisticRegressionParameters $ty:upper>] {
            #[napi(constructor)]
            pub fn new() -> Self {
                Self {
                    inner: LibLogisticRegressionParameters::<$ty>::default(),
                }
            }

            #[napi]
            pub fn with_alpha(&mut self, alpha: f64) {
                self.inner = self.inner.clone().with_alpha(alpha as $ty)
            }

            #[napi]
            pub fn with_solver(&mut self, solver: LogisticRegressionSolverName) {
                self.inner = match solver {
                LogisticRegressionSolverName::LBFGS => self
                    .inner
                    .clone()
                    .with_solver(LibLogisticRegressionSolverName::LBFGS)
                };
            }

            pub fn owned_inner(&self) -> LibLogisticRegressionParameters<$ty> {
                self.inner.to_owned()
            }
        }

        impl AsRef<LibLogisticRegressionParameters<$ty>> for [<LogisticRegressionParameters $ty:upper>] {
            fn as_ref(&self) -> &LibLogisticRegressionParameters<$ty> {
                &self.inner
            }
        }
    }
  };
}

logistic_regression_parameters_struct! {f64}
