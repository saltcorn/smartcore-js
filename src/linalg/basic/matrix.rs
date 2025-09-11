use std::ops::Deref;

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

            pub fn from_inner(inner: LibDenseMatrix<$ty>) -> Self {
                Self { inner }
            }
        }

        impl Deref for [<DenseMatrix $ty:upper>] {
            type Target = LibDenseMatrix<$ty>;

            fn deref(&self) -> &Self::Target {
                &self.inner
            }
        }
    }
  };
}

dense_matrix_struct! {f32, Float32Array}
dense_matrix_struct! {f64, Float64Array}
