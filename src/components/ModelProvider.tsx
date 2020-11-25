import * as React from 'react'

import useModel from 'hooks/useModel'

import { ModelProviderProps } from 'types/index'

import ModelCtx from './ModelContext'

export default function ModelProvider ({
  children,
  url,
  layerModel = false
}: ModelProviderProps): JSX.Element {
  const model = useModel({ modelUrl: url, layers: layerModel })

  return <ModelCtx.Provider value={model}>{children}</ModelCtx.Provider>
}
