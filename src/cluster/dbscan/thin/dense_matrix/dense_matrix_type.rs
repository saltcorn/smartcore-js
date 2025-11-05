use napi::bindgen_prelude::*;

use crate::linalg::basic::matrix::{
  DenseMatrixF32, DenseMatrixF64, DenseMatrixI32, DenseMatrixI64, DenseMatrixU16, DenseMatrixU32,
  DenseMatrixU64, DenseMatrixU8,
};

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum DenseMatrixTypeVariantName {
  F64,
  F32,
  U64,
  U32,
  U16,
  U8,
  I64,
  I32,
}

pub enum DenseMatrixType {
  F64(SharedReference<DenseMatrixF64, &'static mut DenseMatrixF64>),
  F32(SharedReference<DenseMatrixF32, &'static mut DenseMatrixF32>),
  U64(SharedReference<DenseMatrixU64, &'static mut DenseMatrixU64>),
  U32(SharedReference<DenseMatrixU32, &'static mut DenseMatrixU32>),
  U16(SharedReference<DenseMatrixU16, &'static mut DenseMatrixU16>),
  U8(SharedReference<DenseMatrixU8, &'static mut DenseMatrixU8>),
  I64(SharedReference<DenseMatrixI64, &'static mut DenseMatrixI64>),
  I32(SharedReference<DenseMatrixI32, &'static mut DenseMatrixI32>),
}

impl DenseMatrixType {
  pub fn variant_is_same(&self, other: &DenseMatrixType) -> bool {
    match (self, other) {
      (&DenseMatrixType::F64(_), &DenseMatrixType::F64(_)) => true,
      (&DenseMatrixType::F32(_), &DenseMatrixType::F32(_)) => true,
      (&DenseMatrixType::U64(_), &DenseMatrixType::U64(_)) => true,
      (&DenseMatrixType::U32(_), &DenseMatrixType::U32(_)) => true,
      (&DenseMatrixType::U16(_), &DenseMatrixType::U16(_)) => true,
      (&DenseMatrixType::U8(_), &DenseMatrixType::U8(_)) => true,
      (&DenseMatrixType::I64(_), &DenseMatrixType::I64(_)) => true,
      (&DenseMatrixType::I32(_), &DenseMatrixType::I32(_)) => true,
      _ => false,
    }
  }

  pub fn variant_name(&self) -> DenseMatrixTypeVariantName {
    match self {
      &DenseMatrixType::F64(_) => DenseMatrixTypeVariantName::F64,
      &DenseMatrixType::F32(_) => DenseMatrixTypeVariantName::F32,
      &DenseMatrixType::U64(_) => DenseMatrixTypeVariantName::U64,
      &DenseMatrixType::U32(_) => DenseMatrixTypeVariantName::U32,
      &DenseMatrixType::U16(_) => DenseMatrixTypeVariantName::U16,
      &DenseMatrixType::U8(_) => DenseMatrixTypeVariantName::U8,
      &DenseMatrixType::I64(_) => DenseMatrixTypeVariantName::I64,
      &DenseMatrixType::I32(_) => DenseMatrixTypeVariantName::I32,
    }
  }
}
