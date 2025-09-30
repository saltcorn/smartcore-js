use napi::bindgen_prelude::*;
use napi_derive::napi;
use paste::paste;
use smartcore::model_selection::{
  cross_validate as lib_cross_validate, CrossValidationResult as LibCrossValidationResult,
};

use crate::{
  linalg::basic::matrix::DenseMatrixF64,
  linear::{
    elastic_net::{ElasticNetF64F64, ElasticNetF64I64, ElasticNetParameters},
    logistic_regression::{LogisticRegressionF64I64, LogisticRegressionParametersF64},
  },
  model_selection::kfold::KFold,
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
  ( $x:ty, $y:ty, $xs:ty, $ys:ty, $e:ty, $e_params:ty ) => {
    paste! {
        #[napi(js_name=""[<crossValidate $e>]"")]
        #[allow(non_snake_case)]
        pub fn [<cross_validate_ $e>](
            xs: &$xs,
            ys: $ys,
            parameters: &$e_params,
            cv: &KFold,
            score: Function<FnArgs<($ys, $ys)>, f64>
        ) -> Result<CrossValidationResult> {
            let score = |y1: &Vec<$y>, y2: &Vec<$y>| -> f64 {
                let y1 = $ys::with_data_copied(y1);
                let y2 = $ys::with_data_copied(y2);
                score.call((y1, y2).into()).unwrap()
            };
            let inner = lib_cross_validate($e::new_inner(), xs.inner(), &ys.to_vec(), parameters.owned_inner(), cv.inner(), &score)
                .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?;
            Ok(inner.into())
        }
    }
  };
}

cross_validate_struct! {f64, f64, DenseMatrixF64, Float64Array, ElasticNetF64F64, ElasticNetParameters}
cross_validate_struct! {f64, i64, DenseMatrixF64, BigInt64Array, ElasticNetF64I64, ElasticNetParameters}
cross_validate_struct! {f64, i64, DenseMatrixF64, BigInt64Array, LogisticRegressionF64I64, LogisticRegressionParametersF64}
