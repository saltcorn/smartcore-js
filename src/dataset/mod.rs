pub mod boston;
pub mod breast_cancer;
pub mod diabetes;
pub mod digits;
pub mod generator;
pub mod iris;

use napi::bindgen_prelude::*;
use napi_derive::napi;
use paste::paste;
use smartcore::dataset::Dataset as LibDataset;

use crate::{
  dense_matrix::DenseMatrix,
  linalg::basic::matrix::{DenseMatrixF64, DenseMatrixI32},
};

macro_rules! dataset_struct {
  ( $x:ty, $y:ty, $xs:ty, $ys:ty ) => {
    paste! {
        #[napi(js_name=""[<Dataset $x:upper $y:upper>]"")]
        pub struct [<Dataset $x:upper $y:upper>] {
            inner: LibDataset<$x, $y>,
        }

        #[napi]
        impl [<Dataset $x:upper $y:upper>] {
            #[napi(getter)]
            pub fn data(&self) -> $xs {
                $xs::with_data_copied(&self.inner.data)
            }

            #[napi(getter)]
            pub fn target(&self) -> Result<$ys> {
                Ok($ys::with_data_copied(&self.inner.target))
            }

            #[napi(getter)]
            pub fn num_samples(&self) -> BigInt {
                (self.inner.num_samples as u128).into()
            }

            #[napi(getter)]
            pub fn num_features(&self) -> BigInt {
                (self.inner.num_features as u128).into()
            }

            #[napi(getter)]
            pub fn feature_names(&self) -> Vec<String> {
                self.inner.feature_names.to_owned()
            }

            #[napi(getter)]
            pub fn target_names(&self) -> Vec<String> {
                self.inner.target_names.to_owned()
            }

            #[napi(getter)]
            pub fn description(&self) -> String {
                self.inner.description.to_owned()
            }

            #[napi]
            pub fn dense_matrix(&self, column_major: Option<bool>) -> Result<[<DenseMatrix $x:upper>]> {
                [<DenseMatrix $x:upper>]::new(
                    self.num_samples(),
                    self.num_features(),
                    self.data(),
                    column_major,
                )
            }

            #[napi]
            pub fn dense_matrix_v2(&self, column_major: Option<bool>) -> Result<DenseMatrix> {
                self.dense_matrix(column_major).map(|m| m.into())
            }
        }

        impl AsRef<LibDataset<$x, $y>> for [<Dataset $x:upper $y:upper>] {
            fn as_ref(&self) -> &LibDataset<$x, $y> {
                &self.inner
            }
        }

        impl From<LibDataset<$x, $y>> for [<Dataset $x:upper $y:upper>] {
            fn from(inner: LibDataset<$x, $y>) -> Self {
                Self { inner }
            }
        }
    }
  };
}

dataset_struct! {f64, f64, Float64Array, Float64Array}
dataset_struct! {f64, i32, Float64Array, Int32Array}
dataset_struct! {i32, i32, Int32Array, Int32Array}

impl From<LibDataset<f32, f32>> for DatasetF64F64 {
  fn from(value: LibDataset<f32, f32>) -> Self {
    Self {
      inner: LibDataset {
        data: value.data.into_iter().map(|x| x as f64).collect(),
        target: value.target.into_iter().map(|y| y as f64).collect(),
        num_samples: value.num_samples,
        num_features: value.num_features,
        feature_names: value.feature_names,
        target_names: value.target_names,
        description: value.description,
      },
    }
  }
}

impl From<LibDataset<f32, u32>> for DatasetF64I32 {
  fn from(value: LibDataset<f32, u32>) -> Self {
    Self {
      inner: LibDataset {
        data: value.data.into_iter().map(|x| x as f64).collect(),
        target: value.target.into_iter().map(|y| y as i32).collect(),
        num_samples: value.num_samples,
        num_features: value.num_features,
        feature_names: value.feature_names,
        target_names: value.target_names,
        description: value.description,
      },
    }
  }
}

impl From<LibDataset<f32, f32>> for DatasetI32I32 {
  fn from(value: LibDataset<f32, f32>) -> Self {
    Self {
      inner: LibDataset {
        data: value.data.into_iter().map(|x| x as i32).collect(),
        target: value.target.into_iter().map(|y| y as i32).collect(),
        num_samples: value.num_samples,
        num_features: value.num_features,
        feature_names: value.feature_names,
        target_names: value.target_names,
        description: value.description,
      },
    }
  }
}

#[napi(js_name = "dataset")]
pub struct Dataset {}

#[napi]
impl Dataset {
  #[napi]
  pub fn boston() -> boston::Boston {
    boston::Boston {}
  }

  #[napi]
  pub fn breast_cancer() -> breast_cancer::BreastCancer {
    breast_cancer::BreastCancer {}
  }

  #[napi]
  pub fn diabetes() -> diabetes::Diabetes {
    diabetes::Diabetes {}
  }

  #[napi]
  pub fn digits() -> digits::Digits {
    digits::Digits {}
  }

  #[napi]
  pub fn generator() -> generator::Generator {
    generator::Generator {}
  }

  #[napi]
  pub fn iris() -> iris::Iris {
    iris::Iris {}
  }
}
