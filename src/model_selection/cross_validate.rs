use napi::bindgen_prelude::*;
use napi_derive::napi;
use paste::paste;
use smartcore::model_selection::{
  cross_validate as lib_cross_validate, CrossValidationResult as LibCrossValidationResult,
};

use crate::{
  linalg::basic::matrix::{DenseMatrixF32, DenseMatrixF64},
  linear::{
    elastic_net::{ElasticNetF32F32, ElasticNetF32U32, ElasticNetF64F64, ElasticNetParameters},
    lasso::{LassoF32F32, LassoF32U32, LassoF64F64, LassoParameters},
    logistic_regression::{
      LogisticRegressionF32U32, LogisticRegressionF64U64, LogisticRegressionParametersF32,
      LogisticRegressionParametersF64,
    },
  },
  model_selection::kfold::KFold,
  refs::{
    DatasetF32F32JsVecRef, DatasetF32U32JsVecRef, DatasetF64F64JsVecRef, DatasetF64U64JsVecRef,
  },
};

#[napi]
pub struct CrossValidationResult {
  inner: LibCrossValidationResult,
}

#[napi]
impl CrossValidationResult {
  #[napi]
  pub fn test_score(&self) -> Float64Array {
    Float64Array::with_data_copied(&self.inner.test_score)
  }

  #[napi]
  pub fn train_score(&self) -> Float64Array {
    Float64Array::with_data_copied(&self.inner.train_score)
  }

  #[napi]
  pub fn mean_test_score(&self) -> f64 {
    self.inner.mean_test_score()
  }

  #[napi]
  pub fn mean_train_score(&self) -> f64 {
    self.inner.mean_train_score()
  }
}

impl From<LibCrossValidationResult> for CrossValidationResult {
  fn from(value: LibCrossValidationResult) -> Self {
    Self { inner: value }
  }
}

macro_rules! cross_validate_struct {
  ( $x:ty, $y:ty, $xs:ty, $ys:ty, $ys_js:ty, $e:ty, $e_params:ty ) => {
    paste! {
        #[napi(js_name=""[<crossValidate $e>]"")]
        #[allow(non_snake_case)]
        pub fn [<cross_validate_ $e>](
            xs: &$xs,
            ys: &$ys,
            parameters: &$e_params,
            cv: &KFold,
            score: Function<($ys_js, $ys_js), f64>
        ) -> Result<CrossValidationResult> {
            let score = |y1: &Vec<$y>, y2: &Vec<$y>| -> f64 {
                let y1 = $ys_js::with_data_copied(y1);
                let y2 = $ys_js::with_data_copied(y2);
                score.call((y1, y2).into()).unwrap()
            };
            let inner = lib_cross_validate($e::new_inner(), xs.inner(), ys.as_ref(), parameters.owned_inner(), cv.inner(), &score)
                .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?;
            Ok(inner.into())
        }
    }
  };
}

cross_validate_struct! {f32, f32, DenseMatrixF32, DatasetF32F32JsVecRef, Float32Array, ElasticNetF32F32, ElasticNetParameters}
cross_validate_struct! {f64, f64, DenseMatrixF64, DatasetF64F64JsVecRef, Float64Array, ElasticNetF64F64, ElasticNetParameters}
cross_validate_struct! {f32, u32, DenseMatrixF32, DatasetF32U32JsVecRef, Uint32Array, ElasticNetF32U32, ElasticNetParameters}

cross_validate_struct! {f32, f32, DenseMatrixF32, DatasetF32F32JsVecRef, Float32Array, LassoF32F32, LassoParameters}
cross_validate_struct! {f64, f64, DenseMatrixF64, DatasetF64F64JsVecRef, Float64Array, LassoF64F64, LassoParameters}
cross_validate_struct! {f32, u32, DenseMatrixF32, DatasetF32U32JsVecRef, Uint32Array, LassoF32U32, LassoParameters}

cross_validate_struct! {f32, u32, DenseMatrixF32, DatasetF32U32JsVecRef, Uint32Array, LogisticRegressionF32U32, LogisticRegressionParametersF32}
cross_validate_struct! {f64, u64, DenseMatrixF64, DatasetF64U64JsVecRef, BigUint64Array, LogisticRegressionF64U64, LogisticRegressionParametersF64}
