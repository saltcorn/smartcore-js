use napi::bindgen_prelude::*;
use napi_derive::napi;
use paste::paste;
use smartcore::linalg::basic::matrix::DenseMatrix as LibDenseMatrix;

pub use super::dense_matrix_type::DenseMatrixType;
use crate::linalg::basic::matrix::{
  DenseMatrixF32, DenseMatrixF64, DenseMatrixI32, DenseMatrixI64, DenseMatrixU16, DenseMatrixU32,
  DenseMatrixU64, DenseMatrixU8,
};

#[napi(js_name = "DenseMatrixReference")]
pub struct DenseMatrixReference {
  inner: DenseMatrixType,
}

#[napi]
impl DenseMatrixReference {
  #[napi(factory)]
  pub fn f64(x: Reference<DenseMatrixF64>, env: Env) -> Result<Self> {
    Ok(Self {
      inner: DenseMatrixType::F64(x.share_with(env, Ok)?),
    })
  }

  #[napi(factory)]
  pub fn f32(x: Reference<DenseMatrixF32>, env: Env) -> Result<Self> {
    Ok(Self {
      inner: DenseMatrixType::F32(x.share_with(env, Ok)?),
    })
  }

  #[napi(factory)]
  pub fn u64(x: Reference<DenseMatrixU64>, env: Env) -> Result<Self> {
    Ok(Self {
      inner: DenseMatrixType::U64(x.share_with(env, Ok)?),
    })
  }

  #[napi(factory)]
  pub fn u32(x: Reference<DenseMatrixU32>, env: Env) -> Result<Self> {
    Ok(Self {
      inner: DenseMatrixType::U32(x.share_with(env, Ok)?),
    })
  }

  #[napi(factory)]
  pub fn u16(x: Reference<DenseMatrixU16>, env: Env) -> Result<Self> {
    Ok(Self {
      inner: DenseMatrixType::U16(x.share_with(env, Ok)?),
    })
  }

  #[napi(factory)]
  pub fn u8(x: Reference<DenseMatrixU8>, env: Env) -> Result<Self> {
    Ok(Self {
      inner: DenseMatrixType::U8(x.share_with(env, Ok)?),
    })
  }

  #[napi(factory)]
  pub fn i64(x: Reference<DenseMatrixI64>, env: Env) -> Result<Self> {
    Ok(Self {
      inner: DenseMatrixType::I64(x.share_with(env, Ok)?),
    })
  }

  #[napi(factory)]
  pub fn i32(x: Reference<DenseMatrixI32>, env: Env) -> Result<Self> {
    Ok(Self {
      inner: DenseMatrixType::I32(x.share_with(env, Ok)?),
    })
  }

  pub fn inner(&self) -> &DenseMatrixType {
    &self.inner
  }

  pub fn inner_variant_same(&self, other: &DenseMatrixReference) -> bool {
    self.inner().variant_is_same(other.inner())
  }
}

macro_rules! dense_matrix_try_from_impl {
  (x_type: $x:ty) => {
    paste! {
        impl<'a> TryFrom<&'a DenseMatrixReference> for &'a LibDenseMatrix<$x> {
            type Error = Error;

            fn try_from(value: &'a DenseMatrixReference) -> std::result::Result<Self, Self::Error> {
                value.inner().try_into()
            }
        }
    }
  };
}

dense_matrix_try_from_impl! {x_type: f32}
dense_matrix_try_from_impl! {x_type: f64}
dense_matrix_try_from_impl! {x_type: u64}
dense_matrix_try_from_impl! {x_type: u32}
dense_matrix_try_from_impl! {x_type: u16}
dense_matrix_try_from_impl! {x_type: u8}
dense_matrix_try_from_impl! {x_type: i64}
dense_matrix_try_from_impl! {x_type: i32}
