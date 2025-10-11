use std::ops::Deref;

use bincode::{
  config::standard,
  serde::{decode_from_slice, encode_to_vec},
};
use napi::bindgen_prelude::*;
use napi_derive::napi;
use paste::paste;
use smartcore::linalg::basic::matrix::DenseMatrix as LibDenseMatrix;

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
                nrows: u32,
                ncols: u32,
                values: $values,
                column_major: Option<bool>,
            ) -> Result<Self> {
                let column_major = column_major.unwrap_or(true);
                let matrix = LibDenseMatrix::new(
                    nrows as usize,
                    ncols as usize,
                    values.to_vec(),
                    column_major,
                )
                .map_err(|e| Error::new(Status::InvalidArg, format!("{}", e)))?;
                Ok(Self { inner: matrix })
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

mod array;
mod array_2;
mod svd;
