use napi_derive::napi;
use paste::paste;
use smartcore::linear::ridge_regression::{
  RidgeRegressionParameters as LibRidgeRegressionParameters,
  RidgeRegressionSolverName as LibRidgeRegressionSolverName,
};

#[napi]
pub enum RidgeRegressionSolverName {
  Cholesky,
  Svd,
}

macro_rules! ridge_regression_parameters_struct {
  ( $ty:ty ) => {
    paste! {
        #[napi(js_name=""[<RidgeRegression $ty:upper Parameters>]"")]
        #[derive(Debug, Clone, Default)]
        pub struct [<RidgeRegression $ty:upper Parameters>] {
            inner: LibRidgeRegressionParameters<$ty>,
        }

        #[napi]
        impl [<RidgeRegression $ty:upper Parameters>] {
            #[napi(constructor)]
            pub fn new() -> Self {
                Self {
                    inner: LibRidgeRegressionParameters::<$ty>::default(),
                }
            }

            #[napi]
            pub fn with_alpha(&mut self, alpha: f64) {
                self.inner = self.inner.clone().with_alpha(alpha as $ty)
            }

            #[napi]
            pub fn with_normalize(&mut self, normalize: bool) {
                self.inner = self.inner.clone().with_normalize(normalize)
            }

            #[napi]
            pub fn with_solver(&mut self, solver: RidgeRegressionSolverName) {
                self.inner = match solver {
                RidgeRegressionSolverName::Cholesky => self
                    .inner
                    .clone()
                    .with_solver(LibRidgeRegressionSolverName::Cholesky),
                RidgeRegressionSolverName::Svd => self
                    .inner
                    .clone()
                    .with_solver(LibRidgeRegressionSolverName::SVD),
                };
            }

            pub fn owned_inner(&self) -> LibRidgeRegressionParameters<$ty> {
                self.inner.to_owned()
            }
        }

        impl AsRef<LibRidgeRegressionParameters<$ty>> for [<RidgeRegression $ty:upper Parameters>] {
            fn as_ref(&self) -> &LibRidgeRegressionParameters<$ty> {
                &self.inner
            }
        }
    }
  };
}

ridge_regression_parameters_struct! {f64}
