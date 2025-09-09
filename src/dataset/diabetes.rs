use napi_derive::napi;
use smartcore::dataset::diabetes::load_dataset as lib_load_dataset;

use super::DatasetF32U32;

#[napi]
pub fn load_dataset() -> DatasetF32U32 {
  let dataset = lib_load_dataset();
  DatasetF32U32::new(dataset)
}
