use smartcore::{
  cluster::dbscan::DBSCAN,
  linalg::basic::matrix::DenseMatrix,
  metrics::distance::{
    euclidian::Euclidian, hamming::Hamming, mahalanobis::Mahalanobis, manhattan::Manhattan,
    minkowski::Minkowski,
  },
};

use crate::cluster::dbscan::thin::dense_matrix::DenseMatrixTypeVariantName;

type MahalanobisF32 = Mahalanobis<f32, DenseMatrix<f64>>;
type MahalanobisF64 = Mahalanobis<f64, DenseMatrix<f64>>;

#[derive(Debug)]
pub enum DBSCANVariants {
  F32I32Euclidian(DBSCAN<f32, i32, DenseMatrix<f32>, Vec<i32>, Euclidian<f32>>),
  F32I32Mahalanobis(DBSCAN<f32, i32, DenseMatrix<f32>, Vec<i32>, MahalanobisF32>),
  F32I32Manhattan(DBSCAN<f32, i32, DenseMatrix<f32>, Vec<i32>, Manhattan<f32>>),
  F32I32Minkowski(DBSCAN<f32, i32, DenseMatrix<f32>, Vec<i32>, Minkowski<f32>>),
  F64I32Euclidian(DBSCAN<f64, i32, DenseMatrix<f64>, Vec<i32>, Euclidian<f64>>),
  F64I32Mahalanobis(DBSCAN<f64, i32, DenseMatrix<f64>, Vec<i32>, MahalanobisF64>),
  F64I32Manhattan(DBSCAN<f64, i32, DenseMatrix<f64>, Vec<i32>, Manhattan<f64>>),
  F64I32Minkowski(DBSCAN<f64, i32, DenseMatrix<f64>, Vec<i32>, Minkowski<f64>>),
  I32I32Euclidian(DBSCAN<i32, i32, DenseMatrix<i32>, Vec<i32>, Euclidian<i32>>),
  I32I32Hamming(DBSCAN<i32, i32, DenseMatrix<i32>, Vec<i32>, Hamming<i32>>),
  I32I32Manhattan(DBSCAN<i32, i32, DenseMatrix<i32>, Vec<i32>, Manhattan<i32>>),
  I32I32Minkowski(DBSCAN<i32, i32, DenseMatrix<i32>, Vec<i32>, Minkowski<i32>>),
  I64I32Euclidian(DBSCAN<i64, i32, DenseMatrix<i64>, Vec<i32>, Euclidian<i64>>),
  I64I32Manhattan(DBSCAN<i64, i32, DenseMatrix<i64>, Vec<i32>, Manhattan<i64>>),
  I64I32Minkowski(DBSCAN<i64, i32, DenseMatrix<i64>, Vec<i32>, Minkowski<i64>>),
  U16I32Euclidian(DBSCAN<u16, i32, DenseMatrix<u16>, Vec<i32>, Euclidian<u16>>),
  U16I32Hamming(DBSCAN<u16, i32, DenseMatrix<u16>, Vec<i32>, Hamming<u16>>),
  U32I32Euclidian(DBSCAN<u32, i32, DenseMatrix<u32>, Vec<i32>, Euclidian<u32>>),
  U32I32Manhattan(DBSCAN<u32, i32, DenseMatrix<u32>, Vec<i32>, Manhattan<u32>>),
  U64I32Euclidian(DBSCAN<u64, i32, DenseMatrix<u64>, Vec<i32>, Euclidian<u64>>),
  U64I32Manhattan(DBSCAN<u64, i32, DenseMatrix<u64>, Vec<i32>, Manhattan<u64>>),
  U8I32Euclidian(DBSCAN<u8, i32, DenseMatrix<u8>, Vec<i32>, Euclidian<u8>>),
  U8I32Hamming(DBSCAN<u8, i32, DenseMatrix<u8>, Vec<i32>, Hamming<u8>>),
}

impl DBSCANVariants {
  pub fn x_variant_name(&self) -> DenseMatrixTypeVariantName {
    match &self {
      Self::F32I32Euclidian(_)
      | Self::F32I32Mahalanobis(_)
      | Self::F32I32Manhattan(_)
      | Self::F32I32Minkowski(_) => DenseMatrixTypeVariantName::F32,
      Self::F64I32Euclidian(_)
      | Self::F64I32Mahalanobis(_)
      | Self::F64I32Manhattan(_)
      | Self::F64I32Minkowski(_) => DenseMatrixTypeVariantName::F64,
      Self::I32I32Euclidian(_)
      | Self::I32I32Hamming(_)
      | Self::I32I32Manhattan(_)
      | Self::I32I32Minkowski(_) => DenseMatrixTypeVariantName::I32,
      Self::I64I32Euclidian(_) | Self::I64I32Manhattan(_) | Self::I64I32Minkowski(_) => {
        DenseMatrixTypeVariantName::I64
      }
      Self::U16I32Euclidian(_) | Self::U16I32Hamming(_) => DenseMatrixTypeVariantName::U16,
      Self::U32I32Euclidian(_) | Self::U32I32Manhattan(_) => DenseMatrixTypeVariantName::U32,
      Self::U64I32Euclidian(_) | Self::U64I32Manhattan(_) => DenseMatrixTypeVariantName::U64,
      Self::U8I32Euclidian(_) | Self::U8I32Hamming(_) => DenseMatrixTypeVariantName::U8,
    }
  }
}
