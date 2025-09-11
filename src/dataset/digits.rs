use napi_derive::napi;
use smartcore::dataset::digits::load_dataset as lib_load_dataset;

use super::Datasetf32f32;

#[napi]
pub struct Digits {}

#[napi]
impl Digits {
  #[napi]
  pub fn load_dataset(&self) -> Datasetf32f32 {
    let dataset = lib_load_dataset();
    Datasetf32f32::new(dataset)
  }
}
