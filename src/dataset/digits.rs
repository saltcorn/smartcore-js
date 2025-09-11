use napi_derive::napi;
use smartcore::dataset::digits::load_dataset as lib_load_dataset;

use super::DatasetF32F32;

#[napi]
pub struct Digits {}

#[napi]
impl Digits {
  #[napi]
  pub fn load_dataset(&self) -> DatasetF32F32 {
    let dataset = lib_load_dataset();
    DatasetF32F32::new(dataset)
  }
}
