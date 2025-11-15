use bincode::{config::standard, serde::encode_to_vec};
use napi::bindgen_prelude::*;
use paste::paste;
use smartcore::{
  cluster::dbscan::DBSCAN,
  linalg::basic::matrix::DenseMatrix as LibDenseMatrix,
  metrics::distance::{
    euclidian::Euclidian, hamming::Hamming, mahalanobis::Mahalanobis as LibMahalanobis,
    manhattan::Manhattan, minkowski::Minkowski,
  },
};

use super::dense_matrix::DenseMatrix;
use crate::cluster::dbscan::thin::{
  dense_matrix::DenseMatrixTypeVariantName, distance_type::DistanceName,
};

type Mahalanobis<T> = LibMahalanobis<T, LibDenseMatrix<f64>>;

macro_rules! define_variant_type {
    ($x: ty, $dist: ident) => {
        paste! {
            pub type [<DBSCAN $x:upper $dist>] = DBSCAN<$x, i32, LibDenseMatrix<$x>, Vec<i32>, $dist<$x>>;

            impl DBSCANSerializable for [<DBSCAN $x:upper $dist>] {
                pub fn predict(&self, x: &DenseMatrix) -> Result<Int32Array> {
                    self.inner.predict_inner(x)
                }

                pub fn serialize(&self) -> Result<Buffer> {
                    let serialize_data = DBSCANSerializeData {
                    x_type_name: self.inner.x_variant_name(),
                    distance_type: self.inner.distance_type(),
                    dbscan: self.inner.serialize()?,
                    };
                    let encoded = encode_to_vec(serialize_data, standard())
                    .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?;
                    Ok(Buffer::from(encoded))
                }
            }
        }
    }
}

define_variant_type!(f32, Euclidian);
define_variant_type!(f32, Mahalanobis);
define_variant_type!(f32, Manhattan);
define_variant_type!(f32, Minkowski);
define_variant_type!(f64, Euclidian);
define_variant_type!(f64, Mahalanobis);
define_variant_type!(f64, Manhattan);
define_variant_type!(f64, Minkowski);
define_variant_type!(i32, Euclidian);
define_variant_type!(i32, Hamming);
define_variant_type!(i32, Manhattan);
define_variant_type!(i32, Minkowski);
define_variant_type!(i64, Euclidian);
define_variant_type!(i64, Manhattan);
define_variant_type!(i64, Minkowski);
define_variant_type!(u16, Euclidian);
define_variant_type!(u16, Hamming);
define_variant_type!(u32, Euclidian);
define_variant_type!(u32, Manhattan);
define_variant_type!(u64, Euclidian);
define_variant_type!(u64, Manhattan);
define_variant_type!(u8, Euclidian);
define_variant_type!(u8, Hamming);

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
    use DenseMatrixTypeVariantName::*;
    use DistanceName::*;
    const DISTANCE_SUPPORT: &[(DenseMatrixTypeVariantName, &[DistanceName])] = &[
      (F64, &[Euclidian, Mahalanobis, Manhattan, Minkowski]),
      (F32, &[Euclidian, Mahalanobis, Manhattan, Minkowski]),
      (U64, &[Euclidian, Manhattan]),
      (U32, &[Euclidian, Manhattan]),
      (U16, &[Euclidian, Hamming]),
      (U8, &[Euclidian, Hamming]),
      (I64, &[Euclidian, Manhattan, Minkowski]),
      (I32, &[Euclidian, Hamming, Manhattan, Minkowski]),
    ];
    DISTANCE_SUPPORT
      .iter()
      .find(|(t, _)| *t == x_variant_name)
      .map(|(_, dists)| dists.iter().map(|d| d.to_string()).collect())
      .unwrap_or_default()
  }

  pub fn supported_matrix_data_types_for(distance_type: DistanceName) -> Vec<String> {
    use DenseMatrixTypeVariantName::*;
    use DistanceName::*;
    const MATRIX_TYPE_SUPPORT: &[(DistanceName, &[DenseMatrixTypeVariantName])] = &[
      (Euclidian, &[F32, F64, I32, I64, U16, U32, U64, U8]),
      (Hamming, &[I32, U16, U8]),
      (Mahalanobis, &[F32, F64]),
      (Manhattan, &[F32, F64, I32, I64, U64, U32]),
      (Minkowski, &[F32, F64, I32, I64]),
    ];
    MATRIX_TYPE_SUPPORT
      .iter()
      .find(|(t, _)| *t == distance_type)
      .map(|(_, x_types)| x_types.iter().map(|t| t.to_string()).collect())
      .unwrap_or_default()
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
