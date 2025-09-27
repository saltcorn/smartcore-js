use napi_derive::napi;
use smartcore::dataset::digits::load_dataset as lib_load_dataset;

use super::DatasetF64F64;

#[napi]
pub struct Digits {}

#[napi]
impl Digits {
  #[napi]
  pub fn load_dataset(&self) -> DatasetF64F64 {
    lib_load_dataset().into()
  }
}
