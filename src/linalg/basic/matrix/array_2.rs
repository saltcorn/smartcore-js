use napi::bindgen_prelude::*;
use napi_derive::napi;
use paste::paste;
use smartcore::linalg::basic::{
  arrays::{Array2, ArrayView1},
  matrix::DenseMatrix as LibDenseMatrix,
};

use crate::linalg::basic::matrix::{
  DenseMatrixF32, DenseMatrixF64, DenseMatrixI32, DenseMatrixI64, DenseMatrixU16, DenseMatrixU32,
  DenseMatrixU64, DenseMatrixU8,
};

macro_rules! boxed_array_struct_impls {
  ( $ty:ty, $ty_matrix:ty ) => {
    paste! {
        pub struct [<BoxedArray $ty:upper Ref>]<'a> {
            inner: Box<dyn ArrayView1<$ty> + 'a>,
        }

        impl<'a> [<BoxedArray $ty:upper Ref>]<'a> {
            pub fn inner(&self) -> &dyn ArrayView1<$ty> {
                self.inner.as_ref()
            }
        }

        #[napi]
        pub struct [<JsBoxedArray $ty:upper Ref>] {
            inner: SharedReference<$ty_matrix, [<BoxedArray $ty:upper Ref>]<'static>>,
        }

        impl [<JsBoxedArray $ty:upper Ref>] {
            pub fn from_inner(inner: SharedReference<$ty_matrix, [<BoxedArray $ty:upper Ref>]<'static>>) -> Self {
                Self { inner }
            }

            pub fn inner(&self) -> &dyn ArrayView1<$ty> {
                self.inner.inner()
            }
        }
    }
  };
}

boxed_array_struct_impls! { f32, DenseMatrixF32 }
boxed_array_struct_impls! { f64, DenseMatrixF64 }
boxed_array_struct_impls! { i32, DenseMatrixI32 }
boxed_array_struct_impls! { u32, DenseMatrixU32 }
boxed_array_struct_impls! { u8, DenseMatrixU8 }
boxed_array_struct_impls! { u16, DenseMatrixU16 }
boxed_array_struct_impls! { i64, DenseMatrixI64 }

macro_rules! dense_matrix_array_2_impl {
  ( $x_js:ty, $x_rs:ty, $inner_name:ty, $xs_js:ty ) => {
    paste! {
        #[napi]
        impl $inner_name {
            #[napi]
            pub fn fill(nrows: i64, ncols: i64, value: $x_js) -> Self {
                let inner = LibDenseMatrix::<$x_rs>::fill(nrows as usize, ncols as usize, value as $x_rs);
                Self::from_inner(inner)
            }

            #[napi]
            pub fn slice(&self) -> Self {
                unimplemented!()
            }

            #[napi]
            pub fn slice_mut(&self) -> Self {
                unimplemented!()
            }

            #[napi]
            pub fn from_iterator(&self) -> Self {
                unimplemented!()
            }

            #[napi]
            pub fn get_row(&self, row: i64, reference: Reference<$inner_name>, env: Env) -> Result<[<JsBoxedArray $x_rs:upper Ref>]> {
                let inner = reference.share_with(env, |dm| {
                    let row = dm.inner().get_row(row as usize);
                    Ok([<BoxedArray $x_rs:upper Ref>] {
                        inner: row
                    })
                })?;
                Ok([<JsBoxedArray $x_rs:upper Ref>]::from_inner(inner))
            }

            #[napi]
            pub fn get_col(&self, col: i64, reference: Reference<$inner_name>, env: Env) -> Result<[<JsBoxedArray $x_rs:upper Ref>]> {
                let inner = reference.share_with(env, |dm| {
                    let col = dm.inner().get_col(col as usize);
                    Ok([<BoxedArray $x_rs:upper Ref>] {
                        inner: col
                    })
                })?;
                Ok([<JsBoxedArray $x_rs:upper Ref>]::from_inner(inner))
            }

            #[napi]
            pub fn zeros(nrows: i64, ncols: i64) -> Self {
                Self::from_inner(LibDenseMatrix::<$x_rs>::zeros(nrows as usize, ncols as usize))
            }

            #[napi]
            pub fn ones(nrows: i64, ncols: i64) -> Self {
                Self::from_inner(LibDenseMatrix::<$x_rs>::ones(nrows as usize, ncols as usize))
            }

            #[napi]
            pub fn eye(size: i64) -> Self {
                Self::from_inner(LibDenseMatrix::<$x_rs>::eye(size as usize))
            }

            #[napi]
            pub fn from_slice(slice: &$inner_name) -> Self {
                Self::from_inner(LibDenseMatrix::<$x_rs>::from_slice(slice.inner()))
            }

            #[napi]
            pub fn from_row(slice: $xs_js) -> Self {
                Self::from_inner(LibDenseMatrix::<$x_rs>::from_row(&slice.as_ref()))
            }

            #[napi]
            pub fn from_column(slice: $xs_js) -> Self {
                Self::from_inner(LibDenseMatrix::<$x_rs>::from_column(&slice.as_ref()))
            }

            #[napi]
            pub fn transpose(&self) -> Self {
                Self::from_inner(self.inner.transpose())
            }

            #[napi]
            pub fn reshape(&self, nrows: i64, ncols: i64, axis: i8) -> Self {
                Self::from_inner(self.inner.reshape(nrows as usize, ncols as usize, axis as u8))
            }

            #[napi]
            pub fn matmul(&self, other: &$inner_name) -> Self {
                Self::from_inner(self.inner.matmul(other.inner()))
            }

            #[napi]
            pub fn ab(&self, a_transpose: bool, b: &$inner_name, b_transpose: bool) -> Self {
                Self::from_inner(self.inner.ab(a_transpose, b.inner(), b_transpose))
            }

            #[napi]
            pub fn ax(&self, a_transpose: bool, b: $xs_js) -> Self {
                Self::from_inner(self.inner.ax(a_transpose, &b.as_ref()))
            }

            #[napi]
            pub fn concatenate_1d() -> Self {
                todo!()
            }

            #[napi]
            pub fn concatenate_2d() -> Self {
                todo!()
            }

            #[napi]
            pub fn merge_1d(&self) -> Self {
                todo!()
            }

            #[napi]
            pub fn v_stack(&self, other: &$inner_name) -> Self {
                Self::from_inner(self.inner.v_stack(other.inner()))
            }

            #[napi]
            pub fn h_stack(&self, other: &$inner_name) -> Self {
                Self::from_inner(self.inner.h_stack(other.inner()))
            }

            #[napi]
            pub fn map(&self) -> Self {
                unimplemented!()
            }

            #[napi]
            pub fn row_iter(&self) -> Self {
                unimplemented!()
            }

            #[napi]
            pub fn col_iter(&self) -> Self {
                unimplemented!()
            }

            #[napi]
            pub fn take(&self, index: BigInt64Array, axis: i8) -> Self {
                let index = index.to_vec().into_iter().map(|i| i as usize).collect::<Vec<_>>();
                let inner = self.inner.take(&index, axis as u8);
                Self::from_inner(inner)
            }

            #[napi]
            pub fn take_column(&self, column_index: i64) -> Self {
                Self::from_inner(self.inner.take_column(column_index as usize))
            }

            #[napi]
            pub fn add_scalar(&self, x: $x_js) -> Self {
                Self::from_inner(self.inner.add_scalar(x as $x_rs))
            }

            #[napi]
            pub fn sub_scalar(&self, x: $x_js) -> Self {
                Self::from_inner(self.inner.sub_scalar(x as $x_rs))
            }

            #[napi]
            pub fn div_scalar(&self, x: $x_js) -> Self {
                Self::from_inner(self.inner.div_scalar(x as $x_rs))
            }

            #[napi]
            pub fn mul_scalar(&self, x: $x_js) -> Self {
                Self::from_inner(self.inner.mul_scalar(x as $x_rs))
            }

            #[napi]
            pub fn add(&self, other: &$inner_name) -> Self {
                Self::from_inner(self.inner.add(other.inner()))
            }

            #[napi]
            pub fn sub(&self, other: &$inner_name) -> Self {
                Self::from_inner(self.inner.sub(other.inner()))
            }

            #[napi]
            pub fn mul(&self, other: &$inner_name) -> Self {
                Self::from_inner(self.inner.mul(other.inner()))
            }

            #[napi]
            pub fn div(&self, other: &$inner_name) -> Self {
                Self::from_inner(self.inner.div(other.inner()))
            }

            #[napi]
            pub fn column_mean(&self) -> Float64Array {
                let mean = self.inner.column_mean();
                Float64Array::new(mean)
            }

            #[napi]
            pub fn copy_col_as_vec(&self) -> Self {
                unimplemented!()
            }
        }
    }
  };
}

dense_matrix_array_2_impl! { f64, f64, DenseMatrixF64, Float64Array }
dense_matrix_array_2_impl! { f64, f32, DenseMatrixF32, Float32Array}
dense_matrix_array_2_impl! { i32, i32, DenseMatrixI32, Int32Array}
dense_matrix_array_2_impl! { u32, u32, DenseMatrixU32, Uint32Array}
dense_matrix_array_2_impl! { u8, u8, DenseMatrixU8, Uint8Array}
dense_matrix_array_2_impl! { u16, u16, DenseMatrixU16, Uint16Array}
dense_matrix_array_2_impl! { i64, i64, DenseMatrixI64, BigInt64Array}
// dense_matrix_array_2_impl! { BigInt, u64, DenseMatrixU64, BigUint64Array}

macro_rules! dense_matrix_array_2_impl_real_numbers {
  ( $x_js:ty, $x_rs:ty, $inner_name:ty, $xs_js:ty ) => {
    paste! {
        #[napi]
        impl $inner_name {
            #[napi]
            pub fn rand(nrows: i64, ncols: i64) -> Self {
                Self::from_inner(LibDenseMatrix::<$x_rs>::rand(nrows as usize, ncols as usize))
            }

            #[napi]
            pub fn pow(&self, p: $x_js) -> Self {
                Self::from_inner(self.inner.pow(p as $x_rs))
            }

            #[napi]
            pub fn approximate_eq(&self, other: &$inner_name, error: $x_js) -> bool {
                self.inner.approximate_eq(other, error as $x_rs)
            }
        }
    }
  };
}

dense_matrix_array_2_impl_real_numbers! { f64, f64, DenseMatrixF64, Float64Array }
dense_matrix_array_2_impl_real_numbers! { f64, f32, DenseMatrixF32, Float32Array }

macro_rules! dense_matrix_array_2_impl_signed_numbers {
  ( $x_js:ty, $x_rs:ty, $inner_name:ty, $xs_js:ty ) => {
    paste! {
        #[napi]
        impl $inner_name {
            #[napi]
            pub fn abs(&self) -> Self {
                Self::from_inner(self.inner.abs())
            }

            #[napi]
            pub fn neg(&self) -> Self {
                Self::from_inner(self.inner.neg())
            }
        }
    }
  };
}

dense_matrix_array_2_impl_signed_numbers! { f64, f64, DenseMatrixF64, Float64Array }
dense_matrix_array_2_impl_signed_numbers! { f64, f32, DenseMatrixF32, Float32Array }
dense_matrix_array_2_impl_signed_numbers! { i32, i32, DenseMatrixI32, Int32Array}
dense_matrix_array_2_impl_signed_numbers! { i64, i64, DenseMatrixI64, BigInt64Array}
