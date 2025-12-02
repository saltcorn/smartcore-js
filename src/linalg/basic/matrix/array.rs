use napi_derive::napi;
use paste::paste;
use smartcore::linalg::basic::arrays::Array;

use crate::linalg::basic::matrix::{
  DenseMatrixF32, DenseMatrixF64, DenseMatrixI32, DenseMatrixI64, DenseMatrixU16, DenseMatrixU32,
  DenseMatrixU64, DenseMatrixU8,
};

macro_rules! dense_matrix_array_impl {
  ( $x:ty, $inner_name:ty ) => {
    paste! {
        #[napi]
        impl $inner_name {
            #[napi]
            pub fn get(&self, pos: (i64, i64)) -> $x {
                let pos = (pos.0 as usize, pos.1 as usize);
                *self.inner.get(pos)
            }

            #[napi]
            pub fn shape(&self) -> (i64, i64) {
                let shape = self.inner.shape();
                (shape.0 as i64, shape.1 as i64)
            }

            #[napi]
            pub fn is_empty(&self) -> bool {
                self.inner.is_empty()
            }
        }
    }
  };
}

dense_matrix_array_impl! {f64, DenseMatrixF64}
dense_matrix_array_impl! {f32, DenseMatrixF32}
dense_matrix_array_impl! {i32, DenseMatrixI32}
dense_matrix_array_impl! {u32, DenseMatrixU32}
dense_matrix_array_impl! {u8, DenseMatrixU8}
dense_matrix_array_impl! {u16, DenseMatrixU16}
dense_matrix_array_impl! {i64, DenseMatrixI64}
dense_matrix_array_impl! {u64, DenseMatrixU64}
