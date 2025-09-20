import principal_component_analysis from './principal_component_analysis'
import singular_value_decomposition from './singular_value_decomposition'

export default () => {
  describe('Dimensionality Reduction', () => {
    principal_component_analysis()
    singular_value_decomposition()
  })
}
