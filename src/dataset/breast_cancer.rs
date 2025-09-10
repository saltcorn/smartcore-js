use napi_derive::napi;
use smartcore::dataset::breast_cancer::load_dataset as lib_load_dataset;

use super::Datasetf32u32;

#[napi]
pub struct BreastCancer {}

#[napi]
impl BreastCancer {
  #[napi]
  pub fn load_dataset(&self) -> Datasetf32u32 {
    let dataset = lib_load_dataset();
    Datasetf32u32::new(dataset)
  }
}
