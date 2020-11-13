import * as React from 'react'

import useModel from 'hooks/useModel'

import { ReactTensorFlow } from 'types/index'

import ModelCtx from './ModelContext'

export default function ModelProvider ({
  children,
  url,
  layerModel = false
}: ReactTensorFlow.ModelProviderProps) {
  const model = useModel(url, { layers: layerModel })

  return <ModelCtx.Provider value={model}>{children}</ModelCtx.Provider>
}
