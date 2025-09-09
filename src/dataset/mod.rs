use std::ops::Deref;

use napi::bindgen_prelude::*;
use napi_derive::napi;
use smartcore::dataset::Dataset as LibDataset;

#[napi]
pub struct Dataset {
  inner: LibDataset<f32, f32>,
}

#[napi]
impl Dataset {
  #[napi(getter)]
  pub fn data(&self) -> Float32Array {
    Float32Array::with_data_copied(&self.inner.data)
  }

  #[napi(getter)]
  pub fn target(&self) -> Float32Array {
    Float32Array::with_data_copied(&self.inner.target)
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
}

impl Deref for Dataset {
  type Target = LibDataset<f32, f32>;

  fn deref(&self) -> &Self::Target {
    &self.inner
  }
}
