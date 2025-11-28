use smartcore::{
  linalg::basic::matrix::DenseMatrix as LibDenseMatrix,
  naive_bayes::bernoulli::BernoulliNB as LibBernoulliNB,
};

pub type BernoulliNBF64U64 = LibBernoulliNB<f64, u64, LibDenseMatrix<f64>, Vec<u64>>;
pub type BernoulliNBF64U32 = LibBernoulliNB<f64, u32, LibDenseMatrix<f64>, Vec<u32>>;

pub type BernoulliNBF32U64 = LibBernoulliNB<f32, u64, LibDenseMatrix<f32>, Vec<u64>>;
pub type BernoulliNBF32U32 = LibBernoulliNB<f32, u32, LibDenseMatrix<f32>, Vec<u32>>;

pub type BernoulliNBI64U64 = LibBernoulliNB<i64, u64, LibDenseMatrix<i64>, Vec<u64>>;
pub type BernoulliNBI64U32 = LibBernoulliNB<i64, u32, LibDenseMatrix<i64>, Vec<u32>>;

pub type BernoulliNBU64U64 = LibBernoulliNB<u64, u64, LibDenseMatrix<u64>, Vec<u64>>;
pub type BernoulliNBU64U32 = LibBernoulliNB<u64, u32, LibDenseMatrix<u64>, Vec<u32>>;

pub type BernoulliNBI32U64 = LibBernoulliNB<i32, u64, LibDenseMatrix<i32>, Vec<u64>>;
pub type BernoulliNBI32U32 = LibBernoulliNB<i32, u32, LibDenseMatrix<i32>, Vec<u32>>;

pub type BernoulliNBU32U64 = LibBernoulliNB<u32, u64, LibDenseMatrix<u32>, Vec<u64>>;
pub type BernoulliNBU32U32 = LibBernoulliNB<u32, u32, LibDenseMatrix<u32>, Vec<u32>>;

pub type BernoulliNBU16U64 = LibBernoulliNB<u16, u64, LibDenseMatrix<u16>, Vec<u64>>;
pub type BernoulliNBU16U32 = LibBernoulliNB<u16, u32, LibDenseMatrix<u16>, Vec<u32>>;

pub type BernoulliNBU8U64 = LibBernoulliNB<u8, u64, LibDenseMatrix<u8>, Vec<u64>>;
pub type BernoulliNBU8U32 = LibBernoulliNB<u8, u32, LibDenseMatrix<u8>, Vec<u32>>;
