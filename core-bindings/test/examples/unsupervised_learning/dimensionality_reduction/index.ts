import principal_component_analysis from './principal_component_analysis.ts'
import singular_value_decomposition from './singular_value_decomposition.ts'

export default () => {
  describe('Dimensionality Reduction', () => {
    principal_component_analysis()
    singular_value_decomposition()
  })
}
