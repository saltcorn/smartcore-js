pub mod boston;
pub mod breast_cancer;
pub mod diabetes;
pub mod digits;
pub mod generator;
pub mod iris;

use std::ops::Deref;

use napi::bindgen_prelude::*;
use napi_derive::napi;
use paste::paste;
use smartcore::dataset::Dataset as LibDataset;

use crate::linalg::basic::matrix::DenseMatrixf32;

macro_rules! dataset_struct {
  ( $x:ty, $y:ty, $xs:ty, $ys:ty ) => {
    paste! {
        #[napi]
        pub struct [<Dataset $x $y>] {
            inner: LibDataset<$x, $y>,
        }

        #[napi]
        impl [<Dataset $x $y>] {
            fn new(inner: LibDataset<$x, $y>) -> Self {
                Self { inner }
            }

            #[napi(getter)]
            pub fn data(&self) -> $xs {
                $xs::with_data_copied(&self.inner.data)
            }

            #[napi(getter)]
            pub fn target(&self) -> $ys {
                $ys::with_data_copied(&self.inner.target)
            }

            #[napi(getter)]
            pub fn num_samples(&self) -> u32 {
                self.inner.num_samples as u32
            }

            #[napi(getter)]
            pub fn num_features(&self) -> u32 {
                self.inner.num_features as u32
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
            pub fn dense_matrix(&self, column_major: Option<bool>) -> Result<[<DenseMatrix $x>]> {
                [<DenseMatrix $x>]::new(
                    self.num_samples(),
                    self.num_features(),
                    self.data(),
                    column_major,
                )
            }
        }

        impl Deref for [<Dataset $x $y>] {
            type Target = LibDataset<$x, $y>;

            fn deref(&self) -> &Self::Target {
                &self.inner
            }
        }
    }
  };
}

dataset_struct! {f32, f32, Float32Array, Float32Array}
dataset_struct! {f32, u32, Float32Array, Uint32Array}

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
