use napi_derive::napi;

use super::Datasetf32f32;
use smartcore::dataset::boston::load_dataset as lib_load_dataset;

#[napi(js_name = "boston")]
pub struct Boston {}

#[napi]
impl Boston {
  #[napi]
  pub fn load_dataset(&self) -> Datasetf32f32 {
    let dataset = lib_load_dataset();
    Datasetf32f32::new(dataset)
  }
}
