import * as React from 'react'

import useModel from 'hooks/useModel'

import { ReactTensorFlow } from 'types/index'

export const ModelCtx = React.createContext<
  ReactTensorFlow.ModelContextInterface
>(null)
ModelCtx.displayName = 'TensorflowModel'

export default function ModelProvider ({
  children,
  url,
  layerModel = false
}: ReactTensorFlow.ModelProviderProps) {
  const model = useModel(url, { layers: layerModel })

  return <ModelCtx.Provider value={model}>{children}</ModelCtx.Provider>
}
