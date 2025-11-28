use smartcore::{
  linalg::basic::matrix::DenseMatrix as LibDenseMatrix,
  naive_bayes::categorical::CategoricalNB as LibCategoricalNB,
};

pub type CategoricalNBU64 = LibCategoricalNB<u64, LibDenseMatrix<u64>, Vec<u64>>;
pub type CategoricalNBU32 = LibCategoricalNB<u32, LibDenseMatrix<u32>, Vec<u32>>;
pub type CategoricalNBU16 = LibCategoricalNB<u16, LibDenseMatrix<u16>, Vec<u16>>;
pub type CategoricalNBU8 = LibCategoricalNB<u8, LibDenseMatrix<u8>, Vec<u8>>;
