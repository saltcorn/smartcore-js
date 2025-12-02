use napi::{Error, Result, Status};
use paste::paste;
use smartcore::{
  ensemble::random_forest_classifier::{
    RandomForestClassifier, RandomForestClassifierParameters as LibRandomForestClassifierParameters,
  },
  linalg::basic::matrix::DenseMatrix as LibDenseMatrix,
};

use super::factory::RandomForestClassifierParameters;
use crate::{dense_matrix::DenseMatrix, traits::PredictorEstimator, typed_array::TypedArrayVec};

pub struct RandomForestClassifierParametersDto<'a> {
  pub fit_data_x: &'a DenseMatrix,
  pub fit_data_y: &'a TypedArrayVec,
  pub random_forest_classifier_parameters: RandomForestClassifierParameters,
}

#[derive(Debug, Clone, Default)]
pub struct LibRandomForestClassifierFactory {}

macro_rules! create_impl {
    (
        x_type: $x:ty,
        y_type: $y:ty
    ) => {
    paste! {
        impl LibRandomForestClassifierFactory {
            pub fn [<$x _ $y>](params: RandomForestClassifierParametersDto) -> Result<Box<dyn PredictorEstimator>> {
                let x: &LibDenseMatrix<$x> = params.fit_data_x.try_into()?;
                let y: &Vec<$y> = params.fit_data_y.try_into()?;
                let mut parameters = LibRandomForestClassifierParameters::default();
                if let Some(split_criterion) = params.random_forest_classifier_parameters.split_criterion {
                    parameters = parameters.with_criterion(split_criterion)
                }
                if let Some(max_depth) = params.random_forest_classifier_parameters.max_depth {
                    parameters = parameters.with_max_depth(max_depth);
                }
                if let Some(min_samples_leaf) = params.random_forest_classifier_parameters.min_samples_leaf {
                    parameters = parameters.with_min_samples_leaf(min_samples_leaf);
                }
                if let Some(min_samples_split) = params.random_forest_classifier_parameters.min_samples_split {
                    parameters = parameters.with_min_samples_split(min_samples_split);
                }
                if let Some(n_trees) = params.random_forest_classifier_parameters.n_trees {
                    parameters = parameters.with_n_trees(n_trees);
                }
                if let Some(m) = params.random_forest_classifier_parameters.m {
                    parameters = parameters.with_m(m);
                }
                if let Some(keep_samples) = params.random_forest_classifier_parameters.keep_samples {
                    parameters = parameters.with_keep_samples(keep_samples);
                }
                if let Some(seed) = params.random_forest_classifier_parameters.seed {
                    parameters = parameters.with_seed(seed);
                }

                let random_forest_classifier_instance = RandomForestClassifier::<$x, $y, LibDenseMatrix<$x>, Vec<$y>>::fit(x, y, parameters)
                    .map_err(|e| Error::new(Status::GenericFailure, e.to_string()))?;
                Ok(Box::new(random_forest_classifier_instance))
            }
        }
    }
  };
}

create_impl! { x_type:f32, y_type:i64 }
create_impl! { x_type:f64, y_type:i64 }

create_impl! { x_type:f32, y_type:u64 }
create_impl! { x_type:f64, y_type:u64 }

create_impl! { x_type:f32, y_type:i32 }
create_impl! { x_type:f64, y_type:i32 }
