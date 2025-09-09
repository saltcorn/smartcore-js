use napi_derive::napi;
use smartcore::dataset::boston::load_dataset as lib_load_dataset;

use super::DatasetF32F32;

#[napi]
pub fn load_dataset() -> DatasetF32F32 {
  let dataset = lib_load_dataset();
  DatasetF32F32::new(dataset)
}
