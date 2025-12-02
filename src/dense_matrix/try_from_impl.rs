use smartcore::linalg::basic::matrix::DenseMatrix as LibDenseMatrix;

use super::{DenseMatrix, DenseMatrixInner};

impl<'a> TryFrom<&'a DenseMatrix> for &'a LibDenseMatrix<f64> {
  type Error = napi::Error;

  fn try_from(value: &'a DenseMatrix) -> std::result::Result<Self, Self::Error> {
    match &value.inner {
      DenseMatrixInner::F64(v) => Ok(v),
      _ => unimplemented!(),
    }
  }
}

impl<'a> TryFrom<&'a DenseMatrix> for &'a LibDenseMatrix<f32> {
  type Error = napi::Error;

  fn try_from(value: &'a DenseMatrix) -> std::result::Result<Self, Self::Error> {
    match &value.inner {
      DenseMatrixInner::F32(v) => Ok(v),
      _ => unimplemented!(),
    }
  }
}

impl<'a> TryFrom<&'a DenseMatrix> for &'a LibDenseMatrix<u64> {
  type Error = napi::Error;

  fn try_from(value: &'a DenseMatrix) -> std::result::Result<Self, Self::Error> {
    match &value.inner {
      DenseMatrixInner::U64(v) => Ok(v),
      _ => unimplemented!(),
    }
  }
}

impl<'a> TryFrom<&'a DenseMatrix> for &'a LibDenseMatrix<u32> {
  type Error = napi::Error;

  fn try_from(value: &'a DenseMatrix) -> std::result::Result<Self, Self::Error> {
    match &value.inner {
      DenseMatrixInner::U32(v) => Ok(v),
      _ => unimplemented!(),
    }
  }
}

impl<'a> TryFrom<&'a DenseMatrix> for &'a LibDenseMatrix<u16> {
  type Error = napi::Error;

  fn try_from(value: &'a DenseMatrix) -> std::result::Result<Self, Self::Error> {
    match &value.inner {
      DenseMatrixInner::U16(v) => Ok(v),
      _ => unimplemented!(),
    }
  }
}

impl<'a> TryFrom<&'a DenseMatrix> for &'a LibDenseMatrix<u8> {
  type Error = napi::Error;

  fn try_from(value: &'a DenseMatrix) -> std::result::Result<Self, Self::Error> {
    match &value.inner {
      DenseMatrixInner::U8(v) => Ok(v),
      _ => unimplemented!(),
    }
  }
}

impl<'a> TryFrom<&'a DenseMatrix> for &'a LibDenseMatrix<i64> {
  type Error = napi::Error;

  fn try_from(value: &'a DenseMatrix) -> std::result::Result<Self, Self::Error> {
    match &value.inner {
      DenseMatrixInner::I64(v) => Ok(v),
      _ => unimplemented!(),
    }
  }
}

impl<'a> TryFrom<&'a DenseMatrix> for &'a LibDenseMatrix<i32> {
  type Error = napi::Error;

  fn try_from(value: &'a DenseMatrix) -> std::result::Result<Self, Self::Error> {
    match &value.inner {
      DenseMatrixInner::I32(v) => Ok(v),
      _ => unimplemented!(),
    }
  }
}
