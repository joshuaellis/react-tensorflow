import * as React from 'react'

import { ModelContext } from 'types/index'

const ModelCtx = React.createContext<ModelContext>(null)
ModelCtx.displayName = 'TensorflowModel'

export default ModelCtx
