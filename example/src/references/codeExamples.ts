export const hocExample = `
import * as React from 'react'
import { withModel } from 'react-tensorflow'

class ModelPredictor extends React.PureComponent {
  render () {
    const { model } = this.props
    return null
  }
}

export default withModel(ModelPredictor)
`
