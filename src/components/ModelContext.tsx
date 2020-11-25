import * as React from 'react'

import { ModelInterface } from 'types/index'

const ModelCtx = React.createContext<ModelInterface>(null)
ModelCtx.displayName = 'TensorflowModel'

export default ModelCtx
