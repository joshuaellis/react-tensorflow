import * as React from 'react'

import { ModelContextInterface } from 'types/index'

const ModelCtx = React.createContext<ModelContextInterface>(null)
ModelCtx.displayName = 'TensorflowModel'

export default ModelCtx
