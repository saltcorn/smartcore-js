use napi_derive::napi;

use super::DatasetF32F32;
use smartcore::dataset::boston::load_dataset as lib_load_dataset;

#[napi]
pub struct Boston {}

#[napi]
impl Boston {
  #[napi]
  pub fn load_dataset(&self) -> DatasetF32F32 {
    lib_load_dataset().into()
  }
}
