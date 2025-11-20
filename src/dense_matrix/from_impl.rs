use paste::paste;
use smartcore::linalg::basic::matrix::DenseMatrix as LibDenseMatrix;

use super::variants::{
  DenseMatrixF32, DenseMatrixF64, DenseMatrixI32, DenseMatrixI64, DenseMatrixU16, DenseMatrixU32,
  DenseMatrixU64, DenseMatrixU8,
};
use super::{DenseMatrix, DenseMatrixInner};

macro_rules! dense_matrix_from_impls {
  (x_type: $x:ty) => {
    paste! {
        impl From<[<DenseMatrix $x:upper>]> for DenseMatrix {
            fn from(value: [<DenseMatrix $x:upper>]) -> Self {
                DenseMatrixInner::from(value).into()
            }
        }

        impl From<LibDenseMatrix<$x>> for DenseMatrixInner {
            fn from(value: LibDenseMatrix<$x>) -> Self {
                DenseMatrixInner::[<$x:upper>](value).into()
            }
        }
    }
  };
}

dense_matrix_from_impls! { x_type: f64 }
dense_matrix_from_impls! { x_type: f32 }
dense_matrix_from_impls! { x_type: u64 }
dense_matrix_from_impls! { x_type: u32 }
dense_matrix_from_impls! { x_type: u16 }
dense_matrix_from_impls! { x_type: u8 }
dense_matrix_from_impls! { x_type: i64 }
dense_matrix_from_impls! { x_type: i32 }
