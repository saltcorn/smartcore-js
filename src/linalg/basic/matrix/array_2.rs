use napi::bindgen_prelude::*;
use napi_derive::napi;
use paste::paste;
use smartcore::linalg::basic::{
  arrays::{Array2, ArrayView1},
  matrix::DenseMatrix as LibDenseMatrix,
};

use crate::linalg::basic::matrix::DenseMatrixF64;

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

boxed_array_struct_impls! { f32, DenseMatrixF64 }
boxed_array_struct_impls! { f64, DenseMatrixF64 }

macro_rules! dense_matrix_svd_impl {
  ( $js_inner:ty, $rs_inner:ty, $inner_name:ty, $svd:ty, $ys:ty ) => {
    paste! {
        #[napi]
        impl $inner_name {
            #[napi]
            pub fn fill(nrows: i64, ncols: i64, value: $js_inner) -> Self {
                let inner = LibDenseMatrix::<$rs_inner>::fill(nrows as usize, ncols as usize, value as $rs_inner);
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
            pub fn get_row(&self, row: i64, reference: Reference<$inner_name>, env: Env) -> Result<[<JsBoxedArray $rs_inner:upper Ref>]> {
                let inner = reference.share_with(env, |dm| {
                    let row = dm.inner().get_row(row as usize);
                    Ok([<BoxedArray $rs_inner:upper Ref>] {
                        inner: row
                    })
                })?;
                Ok([<JsBoxedArray $rs_inner:upper Ref>]::from_inner(inner))
            }

            #[napi]
            pub fn get_col(&self, col: i64, reference: Reference<$inner_name>, env: Env) -> Result<[<JsBoxedArray $rs_inner:upper Ref>]> {
                let inner = reference.share_with(env, |dm| {
                    let col = dm.inner().get_col(col as usize);
                    Ok([<BoxedArray $rs_inner:upper Ref>] {
                        inner: col
                    })
                })?;
                Ok([<JsBoxedArray $rs_inner:upper Ref>]::from_inner(inner))
            }

            #[napi]
            pub fn zeros(nrows: i64, ncols: i64) -> Self {
                Self::from_inner(LibDenseMatrix::<$rs_inner>::zeros(nrows as usize, ncols as usize))
            }

            #[napi]
            pub fn ones(nrows: i64, ncols: i64) -> Self {
                Self::from_inner(LibDenseMatrix::<$rs_inner>::ones(nrows as usize, ncols as usize))
            }

            #[napi]
            pub fn eye(size: i64) -> Self {
                Self::from_inner(LibDenseMatrix::<$rs_inner>::eye(size as usize))
            }

            #[napi]
            pub fn rand(nrows: i64, ncols: i64) -> Self {
                Self::from_inner(LibDenseMatrix::<$rs_inner>::rand(nrows as usize, ncols as usize))
            }

            #[napi]
            pub fn from_slice(slice: &$inner_name) -> Self {
                Self::from_inner(LibDenseMatrix::<$rs_inner>::from_slice(slice.inner()))
            }

            #[napi]
            pub fn from_row(slice: $ys) -> Self {
                Self::from_inner(LibDenseMatrix::<$rs_inner>::from_row(&slice.as_ref()))
            }

            #[napi]
            pub fn from_column(slice: $ys) -> Self {
                Self::from_inner(LibDenseMatrix::<$rs_inner>::from_column(&slice.as_ref()))
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
            pub fn ax(&self, a_transpose: bool, b: $ys) -> Self {
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
            pub fn add_scalar(&self, x: $js_inner) -> Self {
                Self::from_inner(self.inner.add_scalar(x as $rs_inner))
            }

            #[napi]
            pub fn sub_scalar(&self, x: $js_inner) -> Self {
                Self::from_inner(self.inner.sub_scalar(x as $rs_inner))
            }

            #[napi]
            pub fn div_scalar(&self, x: $js_inner) -> Self {
                Self::from_inner(self.inner.div_scalar(x as $rs_inner))
            }

            #[napi]
            pub fn mul_scalar(&self, x: $js_inner) -> Self {
                Self::from_inner(self.inner.mul_scalar(x as $rs_inner))
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
            pub fn abs(&self) -> Self {
                Self::from_inner(self.inner.abs())
            }

            #[napi]
            pub fn neg(&self) -> Self {
                Self::from_inner(self.inner.neg())
            }

            #[napi]
            pub fn pow(&self, p: $js_inner) -> Self {
                Self::from_inner(self.inner.pow(p as $rs_inner))
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

            #[napi]
            pub fn approximate_eq(&self, other: &$inner_name, error: $js_inner) -> bool {
                self.inner.approximate_eq(other, error as $rs_inner)
            }
        }
    }
  };
}

dense_matrix_svd_impl! { f64, f64, DenseMatrixF64, SVDF64DenseMatrixF64, Float64Array }
