use napi_derive::napi;

use super::DatasetF64F64;
use smartcore::dataset::boston::load_dataset as lib_load_dataset;

#[napi]
pub struct Boston {}

#[napi]
impl Boston {
  #[napi]
  pub fn load_dataset(&self) -> DatasetF64F64 {
    lib_load_dataset().into()
  }
}
