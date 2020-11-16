import * as React from 'react'

import { LoadOptionsType, ModelContextInterface } from 'types/index'

import loadModel from 'helpers/loadModel'

import ModelCtx from 'components/ModelContext'

export default function useModel (
  url?: string | undefined,
  opts?: LoadOptionsType
): ModelContextInterface {
  const [model, setModel] = React.useState<ModelContextInterface>(null)

  const contextModel = React.useContext(ModelCtx)

  React.useEffect(() => {
    const getModel = async (): Promise<void> => {
      const loadedModel = await loadModel(url, opts)
      if (loadedModel !== null) {
        setModel(loadedModel)
      }
    }
    if (url !== null) {
      void getModel()
    }
  }, [url])

  return model ?? contextModel
}
