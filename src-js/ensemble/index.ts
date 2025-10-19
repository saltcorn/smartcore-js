// export { RandomForestClassifier } from './random_forest_classifier.js'
// export { RandomForestRegressor } from './random_forest_regressor.js'
export { ExtraTreesRegressor } from './extra_trees_regressor/index.js'

type XTypeStr = 'f32' | 'f64'
type YTypeStr = 'f64' | 'f32' | 'i64' | 'u64' | 'i32'

export type { XTypeStr, YTypeStr }
