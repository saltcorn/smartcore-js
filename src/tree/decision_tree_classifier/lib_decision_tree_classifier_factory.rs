use napi::{Error, Result, Status};
use paste::paste;
use smartcore::{
  linalg::basic::matrix::DenseMatrix as LibDenseMatrix,
  tree::decision_tree_classifier::{
    DecisionTreeClassifier, DecisionTreeClassifierParameters as LibDecisionTreeClassifierParameters,
  },
};

use super::factory::DecisionTreeClassifierParameters;
use crate::{dense_matrix::DenseMatrix, traits::PredictorEstimator, typed_array::TypedArrayVec};

pub struct DecisionTreeClassifierParametersDto<'a> {
  pub fit_data_x: &'a DenseMatrix,
  pub fit_data_y: &'a TypedArrayVec,
  pub decision_tree_classifier_parameters: DecisionTreeClassifierParameters,
}

#[derive(Debug, Clone, Default)]
pub struct LibDecisionTreeClassifierFactory {}

macro_rules! create_impl {
    (
        x_type: $x:ty,
        y_type: $y:ty
    ) => {
    paste! {
        impl LibDecisionTreeClassifierFactory {
            pub fn [<$x _ $y>](params: DecisionTreeClassifierParametersDto) -> Result<Box<dyn PredictorEstimator>> {
                let x: &LibDenseMatrix<$x> = params.fit_data_x.try_into()?;
                let y: &Vec<$y> = params.fit_data_y.try_into()?;
                let mut parameters = LibDecisionTreeClassifierParameters::default();
                if let Some(split_criterion) = params.decision_tree_classifier_parameters.split_criterion {
                    parameters = parameters.with_criterion(split_criterion)
                }
                if let Some(max_depth) = params.decision_tree_classifier_parameters.max_depth {
                    parameters = parameters.with_max_depth(max_depth);
                }
                if let Some(min_samples_leaf) = params.decision_tree_classifier_parameters.min_samples_leaf {
                    parameters = parameters.with_min_samples_leaf(min_samples_leaf);
                }
                if let Some(min_samples_split) = params.decision_tree_classifier_parameters.min_samples_split {
                    parameters = parameters.with_min_samples_split(min_samples_split);
                }

                let decision_tree_classifier_instance = DecisionTreeClassifier::<$x, $y, LibDenseMatrix<$x>, Vec<$y>>::fit(x, y, parameters)
                    .map_err(|e| Error::new(Status::GenericFailure, e.to_string()))?;
                Ok(Box::new(decision_tree_classifier_instance))
            }
        }
    }
  };
}

create_impl! { x_type:f64, y_type:i64 }
create_impl! { x_type:f64, y_type:i32 }

create_impl! { x_type:f32, y_type:i64 }
create_impl! { x_type:f32, y_type:i32 }

create_impl! { x_type:i64, y_type:i64 }
create_impl! { x_type:i64, y_type:i32 }

create_impl! { x_type:u64, y_type:i64 }
create_impl! { x_type:u64, y_type:i32 }

create_impl! { x_type:i32, y_type:i64 }
create_impl! { x_type:i32, y_type:i32 }

create_impl! { x_type:u32, y_type:i64 }
create_impl! { x_type:u32, y_type:i32 }
