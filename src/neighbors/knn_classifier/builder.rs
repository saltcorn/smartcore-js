use std::ops::Deref;

use napi::bindgen_prelude::*;
use napi_derive::napi;

use super::{
  distance_type::DistanceVariantType,
  factory::{self, KNNClassifierFactory},
  set_parameters::SetParametersParams,
  KNNClassifier,
};
use crate::{
  algorithm::neighbor::KNNAlgorithmName,
  dense_matrix::{DenseMatrix, DenseMatrixType},
  neighbors::KNNWeightFunction,
  typed_array::{TypedArrayVec, TypedArrayWrapper},
};

/// KNNClassifierBuilder allows you to set the parameters to be used to initialize a new KNNClassifier instance when you call
/// .build() on it.
#[napi(js_name = "KNNClassifierBuilder")]
pub struct KNNClassifierBuilder {
  pub(super) fit_data_x: SharedReference<DenseMatrix, &'static mut DenseMatrix>,
  pub(super) fit_data_y: TypedArrayVec,
  pub(super) distance_type: Option<DistanceVariantType>,
  pub(super) k: Option<usize>,
  pub(super) algorithm: Option<KNNAlgorithmName>,
  pub(super) weight: Option<KNNWeightFunction>,
  pub(super) data: Option<SharedReference<DenseMatrix, &'static mut DenseMatrix>>,
  pub(super) p: Option<u16>,
}

#[napi]
impl KNNClassifierBuilder {
  #[napi(constructor)]
  pub fn new(
    fit_data_x: Reference<DenseMatrix>,
    fit_data_y: TypedArrayWrapper,
    env: Env,
  ) -> Result<Self> {
    Ok(Self {
      fit_data_x: fit_data_x.share_with(env, Ok)?,
      fit_data_y: fit_data_y.into(),
      distance_type: None,
      k: None,
      weight: None,
      algorithm: None,
      data: None,
      p: None,
    })
  }

  #[napi(setter)]
  pub fn with_weight(&mut self, weight: KNNWeightFunction) {
    self.weight = Some(weight)
  }

  #[napi(setter)]
  pub fn with_distance_type(&mut self, distance_type: DistanceVariantType) {
    self.distance_type = Some(distance_type)
  }

  #[napi(setter)]
  pub fn with_k(&mut self, k: BigInt) -> Result<()> {
    let (sign_bit, k, ..) = k.get_u64();
    if sign_bit {
      return Err(Error::new(
        Status::InvalidArg,
        "Expected a value greater than or equal to 0",
      ));
    }
    self.k = Some(k as usize);
    Ok(())
  }

  #[napi(setter)]
  pub fn algorithm(&mut self, algorithm: KNNAlgorithmName) {
    self.algorithm = Some(algorithm)
  }

  #[napi(setter)]
  pub fn data(&mut self, data: Reference<DenseMatrix>, env: Env) -> Result<()> {
    let data = data.share_with(env, Ok)?;
    match (self.fit_data_x.r#type(), data.r#type()) {
      (DenseMatrixType::F32, DenseMatrixType::F32) => (),
      (DenseMatrixType::F64, DenseMatrixType::F64) => (),
      _ => unimplemented!(),
    }
    self.data = Some(data);
    Ok(())
  }

  #[napi(setter)]
  pub fn p(&mut self, p: i32) -> Result<()> {
    if p < 0 || p > (u16::MAX as i32) {
      return Err(Error::new(
        Status::InvalidArg,
        format!("Expected a value within the range 0 - {}", u16::MAX),
      ));
    }
    self.p = Some(p as u16);
    Ok(())
  }

  #[napi]
  pub fn build(&mut self) -> Result<KNNClassifier> {
    let fit_data_x_type = self.fit_data_x.r#type();
    let params = factory::NewParameters {
      distance_variant_type: self.distance_type,
      fit_data_x: self.fit_data_x.deref(),
      fit_data_y: &self.fit_data_y,
      knn_classifier_parameters: SetParametersParams {
        k: self.k,
        weight: self.weight.map(|w| w.into()),
        algorithm: self.algorithm.map(|a| a.into()),
      },
      data: self.data.as_deref(),
      p: self.p,
    };
    Ok(KNNClassifier {
      inner: KNNClassifierFactory::create(params)?,
      fit_data_x_type,
      fit_data_y_type: self.fit_data_y.r#type().try_into()?,
      distance_type: self.distance_type.unwrap_or_default(),
    })
  }
}
