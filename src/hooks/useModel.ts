import * as React from 'react'

import { GraphModel, LayersModel, LoadOptionsType } from 'types/model'

import loadModel from 'helpers/loadModel'

export default function useModel (
  url: string,
  opts?: LoadOptionsType
): GraphModel | LayersModel | null {
  const [model, setModel] = React.useState<GraphModel | LayersModel | null>(
    null
  )

  React.useEffect(() => {
    const getModel = async () => {
      const loadedModel = await loadModel(url, opts)
      if (loadedModel) {
        setModel(loadedModel)
      }
    }
    if (url && !model) {
      getModel()
    }
  }, [url, model])

  return model
}
