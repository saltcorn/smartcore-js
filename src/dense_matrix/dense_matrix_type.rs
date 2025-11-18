use std::fmt::Display;

use bincode::{Decode, Encode};
use napi_derive::napi;

#[derive(Debug, Clone, PartialEq, Eq, Encode, Decode, Copy)]
#[napi]
pub enum DenseMatrixType {
  F64,
  F32,
  U64,
  U32,
  U16,
  U8,
  I64,
  I32,
}

impl Display for DenseMatrixType {
  fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
    match &self {
      Self::F64 => f.write_str("f64"),
      Self::F32 => f.write_str("f32"),
      Self::U64 => f.write_str("u64"),
      Self::U32 => f.write_str("u32"),
      Self::U16 => f.write_str("u16"),
      Self::U8 => f.write_str("u8"),
      Self::I64 => f.write_str("i64"),
      Self::I32 => f.write_str("i32"),
    }
  }
}
