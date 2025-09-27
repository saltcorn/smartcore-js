use napi::bindgen_prelude::*;
use napi_derive::napi;
use paste::paste;
use smartcore::linalg::traits::svd::SVDDecomposable;

use crate::linalg::{basic::matrix::DenseMatrixF64, traits::svd::SVDF64DenseMatrixF64};

macro_rules! dense_matrix_svd_impl {
  ( $struct_t:ty, $svd:ty ) => {
    paste! {
        #[napi]
        impl $struct_t {
            #[napi]
            pub fn svd_solve(&self, b: &$struct_t) -> Result<Self> {
                let inner = self.inner().svd_solve(b.owned_inner())
                    .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?;
                Ok(Self::from_inner(inner))
            }

            #[napi]
            pub fn svd(&self) -> Result<$svd> {
                let svd = self.inner().svd()
                    .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?;
                Ok($svd::from_inner(svd))
            }
        }
    }
  };
}

dense_matrix_svd_impl! { DenseMatrixF64, SVDF64DenseMatrixF64 }
