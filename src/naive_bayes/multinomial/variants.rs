use smartcore::{
  linalg::basic::matrix::DenseMatrix as LibDenseMatrix,
  naive_bayes::multinomial::MultinomialNB as LibMultinomialNB,
};

pub type MultinomialNBU64U64 = LibMultinomialNB<u64, u64, LibDenseMatrix<u64>, Vec<u64>>;
pub type MultinomialNBU64U32 = LibMultinomialNB<u64, u32, LibDenseMatrix<u64>, Vec<u32>>;
pub type MultinomialNBU64U16 = LibMultinomialNB<u64, u16, LibDenseMatrix<u64>, Vec<u16>>;
pub type MultinomialNBU64U8 = LibMultinomialNB<u64, u8, LibDenseMatrix<u64>, Vec<u8>>;

pub type MultinomialNBU32U64 = LibMultinomialNB<u32, u64, LibDenseMatrix<u32>, Vec<u64>>;
pub type MultinomialNBU32U32 = LibMultinomialNB<u32, u32, LibDenseMatrix<u32>, Vec<u32>>;
pub type MultinomialNBU32U16 = LibMultinomialNB<u32, u16, LibDenseMatrix<u32>, Vec<u16>>;
pub type MultinomialNBU32U8 = LibMultinomialNB<u32, u8, LibDenseMatrix<u32>, Vec<u8>>;

pub type MultinomialNBU16U64 = LibMultinomialNB<u16, u64, LibDenseMatrix<u16>, Vec<u64>>;
pub type MultinomialNBU16U32 = LibMultinomialNB<u16, u32, LibDenseMatrix<u16>, Vec<u32>>;
pub type MultinomialNBU16U16 = LibMultinomialNB<u16, u16, LibDenseMatrix<u16>, Vec<u16>>;
pub type MultinomialNBU16U8 = LibMultinomialNB<u16, u8, LibDenseMatrix<u16>, Vec<u8>>;

pub type MultinomialNBU8U64 = LibMultinomialNB<u8, u64, LibDenseMatrix<u8>, Vec<u64>>;
pub type MultinomialNBU8U32 = LibMultinomialNB<u8, u32, LibDenseMatrix<u8>, Vec<u32>>;
pub type MultinomialNBU8U16 = LibMultinomialNB<u8, u16, LibDenseMatrix<u8>, Vec<u16>>;
pub type MultinomialNBU8U8 = LibMultinomialNB<u8, u8, LibDenseMatrix<u8>, Vec<u8>>;
