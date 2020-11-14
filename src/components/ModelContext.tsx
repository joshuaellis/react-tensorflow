import * as React from 'react'

import { ReactTensorflow } from 'types/index'

const ModelCtx = React.createContext<ReactTensorflow.ModelContextInterface>(
  null
)
ModelCtx.displayName = 'TensorflowModel'

export default ModelCtx
