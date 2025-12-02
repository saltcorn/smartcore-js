use napi_derive::napi;
use smartcore::dataset::iris::load_dataset as lib_load_dataset;

use super::DatasetF64I32;

#[napi]
pub struct Iris {}

#[napi]
impl Iris {
  #[napi]
  pub fn load_dataset(&self) -> DatasetF64I32 {
    lib_load_dataset().into()
  }
}
