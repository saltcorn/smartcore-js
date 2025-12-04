use smartcore::{
  linalg::basic::matrix::DenseMatrix as LibDenseMatrix,
  svm::svc::{SVCParameters as LibSVCParameters, SVC as LibSVC},
};

pub type SVCF32I64<'a> = LibSVC<'a, f32, i64, LibDenseMatrix<f32>, Vec<i64>>;
pub type SVCParametersF32I64 = LibSVCParameters<f32, i64, LibDenseMatrix<f32>, Vec<i64>>;
pub type SVCF64I64<'a> = LibSVC<'a, f64, i64, LibDenseMatrix<f64>, Vec<i64>>;
pub type SVCParametersF64I64 = LibSVCParameters<f64, i64, LibDenseMatrix<f64>, Vec<i64>>;

pub type SVCF32I32<'a> = LibSVC<'a, f32, i32, LibDenseMatrix<f32>, Vec<i32>>;
pub type SVCParametersF32I32 = LibSVCParameters<f32, i32, LibDenseMatrix<f32>, Vec<i32>>;
pub type SVCF64I32<'a> = LibSVC<'a, f64, i32, LibDenseMatrix<f64>, Vec<i32>>;
pub type SVCParametersF64I32 = LibSVCParameters<f64, i32, LibDenseMatrix<f64>, Vec<i32>>;
