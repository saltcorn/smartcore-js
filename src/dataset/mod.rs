pub mod boston;
pub mod breast_cancer;
pub mod diabetes;
pub mod digits;
pub mod generator;
pub mod iris;

use std::ops::Deref;

use napi::bindgen_prelude::*;
use napi_derive::napi;
use smartcore::dataset::Dataset as LibDataset;

#[napi]
pub struct DatasetF32F32 {
  inner: LibDataset<f32, f32>,
}

#[napi]
impl DatasetF32F32 {
  fn new(inner: LibDataset<f32, f32>) -> Self {
    Self { inner }
  }

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

impl Deref for DatasetF32F32 {
  type Target = LibDataset<f32, f32>;

  fn deref(&self) -> &Self::Target {
    &self.inner
  }
}

#[napi]
pub struct DatasetF32U32 {
  inner: LibDataset<f32, u32>,
}

#[napi]
impl DatasetF32U32 {
  fn new(inner: LibDataset<f32, u32>) -> Self {
    Self { inner }
  }

  #[napi(getter)]
  pub fn data(&self) -> Float32Array {
    Float32Array::with_data_copied(&self.inner.data)
  }

  #[napi(getter)]
  pub fn target(&self) -> Uint32Array {
    Uint32Array::with_data_copied(&self.inner.target)
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

impl Deref for DatasetF32U32 {
  type Target = LibDataset<f32, u32>;

  fn deref(&self) -> &Self::Target {
    &self.inner
  }
}
