import * as React from 'react'

import useModel from 'hooks/useModel'

import { ReactTensorflow } from 'types/index'

import ModelCtx from './ModelContext'

export default function ModelProvider ({
  children,
  url,
  layerModel = false
}: ReactTensorflow.ModelProviderProps) {
  const model = useModel(url, { layers: layerModel })

  return <ModelCtx.Provider value={model}>{children}</ModelCtx.Provider>
}
