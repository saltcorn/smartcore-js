use napi::bindgen_prelude::BigInt;
use paste::paste;
use smartcore::linalg::basic::arrays::Array;

use super::{
  array::ArrayJs,
  value::DenseMatrixValue,
  variants::{
    DenseMatrixF32, DenseMatrixF64, DenseMatrixI32, DenseMatrixI64, DenseMatrixU16, DenseMatrixU32,
    DenseMatrixU64, DenseMatrixU8,
  },
};

macro_rules! array_js_impl {
  ( $ty:ty ) => {
    paste! {
        impl ArrayJs for $ty {
            fn shape(&self) -> (BigInt, BigInt) {
                let (rows, cols) = Array::shape(self);
                ((rows as u128).into(), (cols as u128).into())
            }

            fn get(&self, pos: (BigInt, BigInt)) -> DenseMatrixValue {
                let row_idx = pos.0.get_u128().1 as usize;
                let col_idx = pos.1.get_u128().1 as usize;
                let pos = (row_idx, col_idx);
                (*Array::get(self, pos)).into()
            }

            fn is_empty(&self) -> bool {
                Array::is_empty(self)
            }
        }
    }
  };
}

array_js_impl! { DenseMatrixF64 }
array_js_impl! { DenseMatrixF32 }
array_js_impl! { DenseMatrixI32 }
array_js_impl! { DenseMatrixI64 }
array_js_impl! { DenseMatrixU16 }
array_js_impl! { DenseMatrixU32 }
array_js_impl! { DenseMatrixU64 }
array_js_impl! { DenseMatrixU8 }
