use napi::bindgen_prelude::*;
use napi_derive::napi;
use paste::paste;
use smartcore::linalg::basic::{arrays::Array2, matrix::DenseMatrix as LibDenseMatrix};

use crate::linalg::basic::matrix::{DenseMatrixF32, DenseMatrixF64};

macro_rules! dense_matrix_svd_impl {
  ( $inner:ty, $inner_name:ty, $svd:ty ) => {
    paste! {
        #[napi]
        impl $inner_name {
            #[napi]
            pub fn fill(nrows: i64, ncols: i64, value: f64) -> Result<Self> {
                let inner = LibDenseMatrix::<$inner>::fill(nrows as usize, ncols as usize, value as $inner);
                Ok(Self::from_inner(inner))
            }

            #[napi]
            pub fn matmul(&self, other: &$inner_name) -> Self {
                Self::from_inner(self.inner.matmul(other.inner()))
            }

            #[napi]
            pub fn transpose(&self) -> Self {
                Self::from_inner(self.inner.transpose())
            }
        }
    }
  };
}

dense_matrix_svd_impl! { f32, DenseMatrixF32, SVDF32DenseMatrixF32 }
dense_matrix_svd_impl! { f64, DenseMatrixF64, SVDF64DenseMatrixF64 }
