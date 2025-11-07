use bincode::{config::standard, serde::encode_to_vec};
use napi::bindgen_prelude::*;
use paste::paste;
use smartcore::{
  cluster::dbscan::DBSCAN,
  linalg::basic::matrix::DenseMatrix as LibDenseMatrix,
  metrics::distance::{
    euclidian::Euclidian, hamming::Hamming, mahalanobis::Mahalanobis, manhattan::Manhattan,
    minkowski::Minkowski,
  },
};

use super::dense_matrix::DenseMatrix;
use crate::cluster::dbscan::thin::{
  dense_matrix::DenseMatrixTypeVariantName, distance_type::DistanceName,
};

type MahalanobisF32 = Mahalanobis<f32, LibDenseMatrix<f64>>;
type MahalanobisF64 = Mahalanobis<f64, LibDenseMatrix<f64>>;
pub type DBSCANF32Euclidian = DBSCAN<f32, i32, LibDenseMatrix<f32>, Vec<i32>, Euclidian<f32>>;
pub type DBSCANF32Mahalanobis = DBSCAN<f32, i32, LibDenseMatrix<f32>, Vec<i32>, MahalanobisF32>;
pub type DBSCANF32Manhattan = DBSCAN<f32, i32, LibDenseMatrix<f32>, Vec<i32>, Manhattan<f32>>;
pub type DBSCANF32Minkowski = DBSCAN<f32, i32, LibDenseMatrix<f32>, Vec<i32>, Minkowski<f32>>;
pub type DBSCANF64Euclidian = DBSCAN<f64, i32, LibDenseMatrix<f64>, Vec<i32>, Euclidian<f64>>;
pub type DBSCANF64Mahalanobis = DBSCAN<f64, i32, LibDenseMatrix<f64>, Vec<i32>, MahalanobisF64>;
pub type DBSCANF64Manhattan = DBSCAN<f64, i32, LibDenseMatrix<f64>, Vec<i32>, Manhattan<f64>>;
pub type DBSCANF64Minkowski = DBSCAN<f64, i32, LibDenseMatrix<f64>, Vec<i32>, Minkowski<f64>>;
pub type DBSCANI32Euclidian = DBSCAN<i32, i32, LibDenseMatrix<i32>, Vec<i32>, Euclidian<i32>>;
pub type DBSCANI32Hamming = DBSCAN<i32, i32, LibDenseMatrix<i32>, Vec<i32>, Hamming<i32>>;
pub type DBSCANI32Manhattan = DBSCAN<i32, i32, LibDenseMatrix<i32>, Vec<i32>, Manhattan<i32>>;
pub type DBSCANI32Minkowski = DBSCAN<i32, i32, LibDenseMatrix<i32>, Vec<i32>, Minkowski<i32>>;
pub type DBSCANI64Euclidian = DBSCAN<i64, i32, LibDenseMatrix<i64>, Vec<i32>, Euclidian<i64>>;
pub type DBSCANI64Manhattan = DBSCAN<i64, i32, LibDenseMatrix<i64>, Vec<i32>, Manhattan<i64>>;
pub type DBSCANI64Minkowski = DBSCAN<i64, i32, LibDenseMatrix<i64>, Vec<i32>, Minkowski<i64>>;
pub type DBSCANU16Euclidian = DBSCAN<u16, i32, LibDenseMatrix<u16>, Vec<i32>, Euclidian<u16>>;
pub type DBSCANU16Hamming = DBSCAN<u16, i32, LibDenseMatrix<u16>, Vec<i32>, Hamming<u16>>;
pub type DBSCANU32Euclidian = DBSCAN<u32, i32, LibDenseMatrix<u32>, Vec<i32>, Euclidian<u32>>;
pub type DBSCANU32Manhattan = DBSCAN<u32, i32, LibDenseMatrix<u32>, Vec<i32>, Manhattan<u32>>;
pub type DBSCANU64Euclidian = DBSCAN<u64, i32, LibDenseMatrix<u64>, Vec<i32>, Euclidian<u64>>;
pub type DBSCANU64Manhattan = DBSCAN<u64, i32, LibDenseMatrix<u64>, Vec<i32>, Manhattan<u64>>;
pub type DBSCANU8Euclidian = DBSCAN<u8, i32, LibDenseMatrix<u8>, Vec<i32>, Euclidian<u8>>;
pub type DBSCANU8Hamming = DBSCAN<u8, i32, LibDenseMatrix<u8>, Vec<i32>, Hamming<u8>>;

#[derive(Debug)]
pub enum DBSCANVariants {
  F32I32Euclidian(DBSCANF32Euclidian),
  F32I32Mahalanobis(DBSCANF32Mahalanobis),
  F32I32Manhattan(DBSCANF32Manhattan),
  F32I32Minkowski(DBSCANF32Minkowski),
  F64I32Euclidian(DBSCANF64Euclidian),
  F64I32Mahalanobis(DBSCANF64Mahalanobis),
  F64I32Manhattan(DBSCANF64Manhattan),
  F64I32Minkowski(DBSCANF64Minkowski),
  I32I32Euclidian(DBSCANI32Euclidian),
  I32I32Hamming(DBSCANI32Hamming),
  I32I32Manhattan(DBSCANI32Manhattan),
  I32I32Minkowski(DBSCANI32Minkowski),
  I64I32Euclidian(DBSCANI64Euclidian),
  I64I32Manhattan(DBSCANI64Manhattan),
  I64I32Minkowski(DBSCANI64Minkowski),
  U16I32Euclidian(DBSCANU16Euclidian),
  U16I32Hamming(DBSCANU16Hamming),
  U32I32Euclidian(DBSCANU32Euclidian),
  U32I32Manhattan(DBSCANU32Manhattan),
  U64I32Euclidian(DBSCANU64Euclidian),
  U64I32Manhattan(DBSCANU64Manhattan),
  U8I32Euclidian(DBSCANU8Euclidian),
  U8I32Hamming(DBSCANU8Hamming),
}

macro_rules! predict_impl {
  ($dbscan:ident, $x:ident) => {
    paste! {
        {
            let predict_result = $dbscan
                .predict($x.try_into()?)
                .map_err(|e| Error::new(Status::GenericFailure, format!("{e}")))?;
            Ok(Int32Array::new(predict_result))
        }
    }
  };
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

  pub fn supported_distances_for(x_variant_name: DenseMatrixTypeVariantName) -> Vec<String> {
    match x_variant_name {
      DenseMatrixTypeVariantName::F64 => vec![
        DistanceName::Euclidian.to_string(),
        DistanceName::Mahalanobis.to_string(),
        DistanceName::Manhattan.to_string(),
        DistanceName::Minkowski.to_string(),
      ],
      DenseMatrixTypeVariantName::F32 => vec![
        DistanceName::Euclidian.to_string(),
        DistanceName::Mahalanobis.to_string(),
        DistanceName::Manhattan.to_string(),
        DistanceName::Minkowski.to_string(),
      ],
      DenseMatrixTypeVariantName::U64 => vec![
        DistanceName::Euclidian.to_string(),
        DistanceName::Manhattan.to_string(),
      ],
      DenseMatrixTypeVariantName::U32 => vec![
        DistanceName::Euclidian.to_string(),
        DistanceName::Manhattan.to_string(),
      ],
      DenseMatrixTypeVariantName::U16 => vec![
        DistanceName::Euclidian.to_string(),
        DistanceName::Hamming.to_string(),
      ],
      DenseMatrixTypeVariantName::U8 => vec![
        DistanceName::Euclidian.to_string(),
        DistanceName::Hamming.to_string(),
      ],
      DenseMatrixTypeVariantName::I64 => vec![
        DistanceName::Euclidian.to_string(),
        DistanceName::Manhattan.to_string(),
        DistanceName::Minkowski.to_string(),
      ],
      DenseMatrixTypeVariantName::I32 => vec![
        DistanceName::Euclidian.to_string(),
        DistanceName::Hamming.to_string(),
        DistanceName::Manhattan.to_string(),
        DistanceName::Minkowski.to_string(),
      ],
    }
  }

  pub fn supported_matrix_data_types_for(distance_type: DistanceName) -> Vec<String> {
    use DenseMatrixTypeVariantName::*;
    use DistanceName::*;
    match distance_type {
      Euclidian => vec![
        F32.to_string(),
        F64.to_string(),
        I32.to_string(),
        I64.to_string(),
        U16.to_string(),
        U32.to_string(),
        U64.to_string(),
        U8.to_string(),
      ],
      Hamming => vec![I32.to_string(), U16.to_string(), U8.to_string()],
      Mahalanobis => vec![F32.to_string(), F64.to_string()],
      Manhattan => vec![
        F32.to_string(),
        F64.to_string(),
        I32.to_string(),
        I64.to_string(),
        U64.to_string(),
        U32.to_string(),
      ],
      Minkowski => vec![
        F32.to_string(),
        F64.to_string(),
        I32.to_string(),
        I64.to_string(),
      ],
    }
  }

  pub fn distance_type(&self) -> DistanceName {
    match &self {
      Self::F32I32Euclidian(_)
      | Self::F64I32Euclidian(_)
      | Self::I32I32Euclidian(_)
      | Self::I64I32Euclidian(_)
      | Self::U16I32Euclidian(_)
      | Self::U32I32Euclidian(_)
      | Self::U64I32Euclidian(_)
      | Self::U8I32Euclidian(_) => DistanceName::Euclidian,
      Self::F32I32Mahalanobis(_) | Self::F64I32Mahalanobis(_) => DistanceName::Mahalanobis,
      Self::F32I32Manhattan(_)
      | Self::F64I32Manhattan(_)
      | Self::I32I32Manhattan(_)
      | Self::I64I32Manhattan(_)
      | Self::U64I32Manhattan(_)
      | Self::U32I32Manhattan(_) => DistanceName::Manhattan,
      Self::F32I32Minkowski(_)
      | Self::F64I32Minkowski(_)
      | Self::I32I32Minkowski(_)
      | Self::I64I32Minkowski(_) => DistanceName::Minkowski,
      Self::I32I32Hamming(_) | Self::U16I32Hamming(_) | Self::U8I32Hamming(_) => {
        DistanceName::Hamming
      }
    }
  }

  pub fn serialize(&self) -> Result<Vec<u8>> {
    match self {
      Self::F32I32Euclidian(dbscan) => encode_to_vec(dbscan, standard()),
      Self::F32I32Mahalanobis(dbscan) => encode_to_vec(dbscan, standard()),
      Self::F32I32Manhattan(dbscan) => encode_to_vec(dbscan, standard()),
      Self::F32I32Minkowski(dbscan) => encode_to_vec(dbscan, standard()),
      Self::F64I32Euclidian(dbscan) => encode_to_vec(dbscan, standard()),
      Self::F64I32Mahalanobis(dbscan) => encode_to_vec(dbscan, standard()),
      Self::F64I32Manhattan(dbscan) => encode_to_vec(dbscan, standard()),
      Self::F64I32Minkowski(dbscan) => encode_to_vec(dbscan, standard()),
      Self::I32I32Euclidian(dbscan) => encode_to_vec(dbscan, standard()),
      Self::I32I32Hamming(dbscan) => encode_to_vec(dbscan, standard()),
      Self::I32I32Manhattan(dbscan) => encode_to_vec(dbscan, standard()),
      Self::I32I32Minkowski(dbscan) => encode_to_vec(dbscan, standard()),
      Self::I64I32Euclidian(dbscan) => encode_to_vec(dbscan, standard()),
      Self::I64I32Manhattan(dbscan) => encode_to_vec(dbscan, standard()),
      Self::I64I32Minkowski(dbscan) => encode_to_vec(dbscan, standard()),
      Self::U16I32Euclidian(dbscan) => encode_to_vec(dbscan, standard()),
      Self::U16I32Hamming(dbscan) => encode_to_vec(dbscan, standard()),
      Self::U32I32Euclidian(dbscan) => encode_to_vec(dbscan, standard()),
      Self::U32I32Manhattan(dbscan) => encode_to_vec(dbscan, standard()),
      Self::U64I32Euclidian(dbscan) => encode_to_vec(dbscan, standard()),
      Self::U64I32Manhattan(dbscan) => encode_to_vec(dbscan, standard()),
      Self::U8I32Euclidian(dbscan) => encode_to_vec(dbscan, standard()),
      Self::U8I32Hamming(dbscan) => encode_to_vec(dbscan, standard()),
    }
    .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))
  }

  pub fn predict(&self, x: &DenseMatrix) -> Result<Int32Array> {
    match &self {
      DBSCANVariants::F32I32Euclidian(dbscan) => predict_impl! { dbscan, x },
      DBSCANVariants::F32I32Mahalanobis(dbscan) => predict_impl! { dbscan, x },
      DBSCANVariants::F32I32Manhattan(dbscan) => predict_impl! { dbscan, x },
      DBSCANVariants::F32I32Minkowski(dbscan) => predict_impl! { dbscan, x },
      DBSCANVariants::F64I32Euclidian(dbscan) => predict_impl! { dbscan, x },
      DBSCANVariants::F64I32Mahalanobis(dbscan) => predict_impl! { dbscan, x },
      DBSCANVariants::F64I32Manhattan(dbscan) => predict_impl! { dbscan, x },
      DBSCANVariants::F64I32Minkowski(dbscan) => predict_impl! { dbscan, x },
      DBSCANVariants::I32I32Euclidian(dbscan) => predict_impl! { dbscan, x },
      DBSCANVariants::I32I32Hamming(dbscan) => predict_impl! { dbscan, x },
      DBSCANVariants::I32I32Manhattan(dbscan) => predict_impl! { dbscan, x },
      DBSCANVariants::I32I32Minkowski(dbscan) => predict_impl! { dbscan, x },
      DBSCANVariants::I64I32Euclidian(dbscan) => predict_impl! { dbscan, x },
      DBSCANVariants::I64I32Manhattan(dbscan) => predict_impl! { dbscan, x },
      DBSCANVariants::I64I32Minkowski(dbscan) => predict_impl! { dbscan, x },
      DBSCANVariants::U16I32Euclidian(dbscan) => predict_impl! { dbscan, x },
      DBSCANVariants::U16I32Hamming(dbscan) => predict_impl! { dbscan, x },
      DBSCANVariants::U32I32Euclidian(dbscan) => predict_impl! { dbscan, x },
      DBSCANVariants::U32I32Manhattan(dbscan) => predict_impl! { dbscan, x },
      DBSCANVariants::U64I32Euclidian(dbscan) => predict_impl! { dbscan, x },
      DBSCANVariants::U64I32Manhattan(dbscan) => predict_impl! { dbscan, x },
      DBSCANVariants::U8I32Euclidian(dbscan) => predict_impl! { dbscan, x },
      DBSCANVariants::U8I32Hamming(dbscan) => predict_impl! { dbscan, x },
    }
  }
}
