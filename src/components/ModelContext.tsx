import * as React from 'react'

import { ReactTensorFlow } from 'types/index'

const ModelCtx = React.createContext<ReactTensorFlow.ModelContextInterface>(
  null
)
ModelCtx.displayName = 'TensorflowModel'

export default ModelCtx
