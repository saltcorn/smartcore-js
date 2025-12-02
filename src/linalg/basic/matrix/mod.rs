use std::ops::Deref;

use bincode::{
  config::standard,
  serde::{decode_from_slice, encode_to_vec},
};
use napi::bindgen_prelude::*;
use napi_derive::napi;
use paste::paste;
use smartcore::linalg::basic::{
  arrays::{Array, ArrayView2},
  matrix::DenseMatrix as LibDenseMatrix,
};

macro_rules! dense_matrix_struct {
  ( $ty:ty, $values:ty ) => {
    paste! {
        #[napi(js_name=""[<DenseMatrix $ty:upper>]"")]
        #[derive(Debug, Clone)]
        pub struct [<DenseMatrix $ty:upper>] {
            inner: LibDenseMatrix<$ty>,
        }

        #[napi]
        impl [<DenseMatrix $ty:upper>] {
            #[napi(constructor)]
            pub fn new(
                nrows: BigInt,
                ncols: BigInt,
                values: $values,
                column_major: Option<bool>,
            ) -> Result<Self> {
                let nrows = nrows.get_u64().1 as usize;
                let ncols = ncols.get_u64().1 as usize;
                let column_major = column_major.unwrap_or(true);
                let matrix = LibDenseMatrix::new(
                    nrows,
                    ncols,
                    values.to_vec(),
                    column_major,
                )
                .map_err(|e| Error::new(Status::InvalidArg, format!("{}", e)))?;
                Ok(Self { inner: matrix })
            }

            #[napi(getter)]
            pub fn number_type(&self) -> String {
                stringify!($ty).to_owned()
            }

            #[napi]
            pub fn satisfies(&self, predicate: Function<$ty, bool>) -> Result<bool> {
                let mut satisfied = true;
                for v in self.inner.iter() {
                    satisfied = satisfied && predicate.call(*v)?;
                    if !satisfied { break; }
                }
                Ok(satisfied)
            }

            #[napi]
            pub fn values(&self) -> $values {
                let mut values = Vec::new();
                for v in self.inner.iter() {
                    values.push(*v)
                }
                values.into()
            }

            pub fn from_inner(inner: LibDenseMatrix<$ty>) -> Self {
                Self { inner }
            }

            pub fn owned_inner(&self) -> LibDenseMatrix<$ty> {
                self.inner.to_owned()
            }

            pub fn inner(&self) -> &LibDenseMatrix<$ty> {
                &self.inner
            }

            #[napi]
            pub fn serialize(&self) -> Result<Buffer> {
                let encoded = encode_to_vec(&self.inner, standard())
                    .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?;
                Ok(Buffer::from(encoded))
            }

            #[napi(factory)]
            pub fn deserialize(data: Buffer) -> Result<Self> {
                let inner = decode_from_slice::<LibDenseMatrix<$ty>, _>(data.as_ref(), standard())
                    .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?.0;
                Ok(Self { inner })
            }
        }

        impl From<LibDenseMatrix<$ty>> for [<DenseMatrix $ty:upper>] {
            fn from(value: LibDenseMatrix<$ty>) -> Self {
                Self { inner: value }
            }
        }

        impl Deref for [<DenseMatrix $ty:upper>] {
            type Target = LibDenseMatrix<$ty>;

            fn deref(&self) -> &Self::Target {
                &self.inner
            }
        }

        pub struct [<DenseMatrix $ty:upper Ref>]<'a> {
            inner: &'a LibDenseMatrix<$ty>,
        }

        impl<'a> [<DenseMatrix $ty:upper Ref>]<'a> {
            pub fn from_inner(inner: &'a LibDenseMatrix<$ty>) -> Self {
                Self { inner }
            }

            pub fn inner(&'a self) -> &'a LibDenseMatrix<$ty> {
                self.inner
            }
        }
    }
  };
}

dense_matrix_struct! {f64, Float64Array}
dense_matrix_struct! {f32, Float32Array}
dense_matrix_struct! {i32, Int32Array}
dense_matrix_struct! {u32, Uint32Array}
dense_matrix_struct! {u8, Uint8Array}
dense_matrix_struct! {u16, Uint16Array}
dense_matrix_struct! {i64, BigInt64Array}
dense_matrix_struct! {u64, BigUint64Array}

macro_rules! max_min_impl {
  ( $ty:ty ) => {
    paste! {
        #[napi]
        impl [<DenseMatrix $ty:upper>] {
            #[napi]
            pub fn max(&self) -> $ty {
                *self.inner.max(0).iter().max().unwrap_or(&0)
            }

            #[napi]
            pub fn min(&self) -> $ty {
                *self.inner.min(0).iter().min().unwrap_or(&0)
            }
        }
    }
  };
}

max_min_impl! {i32}
max_min_impl! {u32}
max_min_impl! {u8}
max_min_impl! {u16}
max_min_impl! {i64}
max_min_impl! {u64}

macro_rules! max_min_impl {
  ( $ty:ty ) => {
    paste! {
        #[napi]
        impl [<DenseMatrix $ty:upper>] {
            #[napi]
            pub fn max(&self) -> $ty {
                *self
                .inner
                .iterator(0)
                .reduce(|arg0: &$ty, other: &$ty| {
                    if $ty::max(*arg0, *other) == *arg0 {
                        arg0
                    } else {
                        other
                    }
                })
                .unwrap_or(&0.)
            }

            #[napi]
            pub fn min(&self) -> $ty {
                *self
                .inner
                .iterator(0)
                .reduce(|arg0: &$ty, other: &$ty| {
                    if $ty::min(*arg0, *other) == *arg0 {
                        arg0
                    } else {
                        other
                    }
                })
                .unwrap_or(&0.)
            }
        }
    }
  };
}

max_min_impl! {f32}
max_min_impl! {f64}

macro_rules! convert_impl {
  (
    implementor: $from:ty,
    to_type:$to:ty
  ) => {
    paste! {
        #[napi]
        impl $from {
            #[napi]
            pub fn [<as_ $to>](&self) -> Result<[<DenseMatrix $to:upper>]> {
                let values = self.iterator(1).map(|n| *n as $to).collect::<Vec<_>>();
                let (nrows, ncols) = self.shape();
                let nrows = nrows.get_u128().1 as usize;
                let ncols = ncols.get_u128().1 as usize;
                let inner = LibDenseMatrix::new(nrows, ncols, values, true)
                    .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?;
                Ok([<DenseMatrix $to:upper>]::from_inner(inner))
            }
        }
    }
  };
}

convert_impl! {implementor: DenseMatrixF32, to_type: f64}

convert_impl! {implementor: DenseMatrixF64, to_type: f32}

convert_impl! {implementor: DenseMatrixU8, to_type: u16}
convert_impl! {implementor: DenseMatrixU8, to_type: i32}
convert_impl! {implementor: DenseMatrixU8, to_type: u32}
convert_impl! {implementor: DenseMatrixU8, to_type: i64}
convert_impl! {implementor: DenseMatrixU8, to_type: u64}
convert_impl! {implementor: DenseMatrixU8, to_type: f32}
convert_impl! {implementor: DenseMatrixU8, to_type: f64}

convert_impl! {implementor: DenseMatrixU16, to_type: u8}
convert_impl! {implementor: DenseMatrixU16, to_type: i32}
convert_impl! {implementor: DenseMatrixU16, to_type: u32}
convert_impl! {implementor: DenseMatrixU16, to_type: i64}
convert_impl! {implementor: DenseMatrixU16, to_type: u64}
convert_impl! {implementor: DenseMatrixU16, to_type: f32}
convert_impl! {implementor: DenseMatrixU16, to_type: f64}

convert_impl! {implementor: DenseMatrixI32, to_type: u8}
convert_impl! {implementor: DenseMatrixI32, to_type: u16}
convert_impl! {implementor: DenseMatrixI32, to_type: u32}
convert_impl! {implementor: DenseMatrixI32, to_type: i64}
convert_impl! {implementor: DenseMatrixI32, to_type: u64}
convert_impl! {implementor: DenseMatrixI32, to_type: f32}
convert_impl! {implementor: DenseMatrixI32, to_type: f64}

convert_impl! {implementor: DenseMatrixU32, to_type: u8}
convert_impl! {implementor: DenseMatrixU32, to_type: u16}
convert_impl! {implementor: DenseMatrixU32, to_type: i32}
convert_impl! {implementor: DenseMatrixU32, to_type: i64}
convert_impl! {implementor: DenseMatrixU32, to_type: u64}
convert_impl! {implementor: DenseMatrixU32, to_type: f32}
convert_impl! {implementor: DenseMatrixU32, to_type: f64}

convert_impl! {implementor: DenseMatrixI64, to_type: u8}
convert_impl! {implementor: DenseMatrixI64, to_type: u16}
convert_impl! {implementor: DenseMatrixI64, to_type: u32}
convert_impl! {implementor: DenseMatrixI64, to_type: i32}
convert_impl! {implementor: DenseMatrixI64, to_type: u64}
convert_impl! {implementor: DenseMatrixI64, to_type: f32}
convert_impl! {implementor: DenseMatrixI64, to_type: f64}

convert_impl! {implementor: DenseMatrixU64, to_type: u8}
convert_impl! {implementor: DenseMatrixU64, to_type: u16}
convert_impl! {implementor: DenseMatrixU64, to_type: i32}
convert_impl! {implementor: DenseMatrixU64, to_type: i64}
convert_impl! {implementor: DenseMatrixU64, to_type: u32}
convert_impl! {implementor: DenseMatrixU64, to_type: f32}
convert_impl! {implementor: DenseMatrixU64, to_type: f64}

mod array;
mod array_2;
mod svd;
