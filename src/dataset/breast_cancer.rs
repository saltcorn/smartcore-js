use napi_derive::napi;
use smartcore::dataset::breast_cancer::load_dataset as lib_load_dataset;

use super::DatasetF64I32;

#[napi]
pub struct BreastCancer {}

#[napi]
impl BreastCancer {
  #[napi]
  pub fn load_dataset(&self) -> DatasetF64I32 {
    lib_load_dataset().into()
  }
}
