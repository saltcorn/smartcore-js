use smartcore::{
  linalg::basic::matrix::DenseMatrix as LibDenseMatrix,
  naive_bayes::gaussian::GaussianNB as LibGaussianNB,
};

pub type GaussianNBF64U64 = LibGaussianNB<f64, u64, LibDenseMatrix<f64>, Vec<u64>>;
pub type GaussianNBF32U64 = LibGaussianNB<f32, u64, LibDenseMatrix<f32>, Vec<u64>>;

pub type GaussianNBF64U32 = LibGaussianNB<f64, u32, LibDenseMatrix<f64>, Vec<u32>>;
pub type GaussianNBF32U32 = LibGaussianNB<f32, u32, LibDenseMatrix<f32>, Vec<u32>>;

pub type GaussianNBF64U16 = LibGaussianNB<f64, u16, LibDenseMatrix<f64>, Vec<u16>>;
pub type GaussianNBF32U16 = LibGaussianNB<f32, u16, LibDenseMatrix<f32>, Vec<u16>>;

pub type GaussianNBF64U8 = LibGaussianNB<f64, u8, LibDenseMatrix<f64>, Vec<u8>>;
pub type GaussianNBF32U8 = LibGaussianNB<f32, u8, LibDenseMatrix<f32>, Vec<u8>>;
