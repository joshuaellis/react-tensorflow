import * as React from 'react'

import { ReactTensorflow } from 'types/index'

import loadModel from 'helpers/loadModel'

import ModelCtx from 'components/ModelContext'

export default function useModel (
  url?: string | undefined,
  opts?: ReactTensorflow.LoadOptionsType
): ReactTensorflow.GraphModel | ReactTensorflow.LayersModel | null {
  const [model, setModel] = React.useState<
    ReactTensorflow.GraphModel | ReactTensorflow.LayersModel | null
  >(null)

  const contextModel = React.useContext(ModelCtx)

  React.useEffect(() => {
    const getModel = async () => {
      const loadedModel = await loadModel(url, opts)
      if (loadedModel) {
        setModel(loadedModel)
      }
    }
    if (url) {
      getModel()
    }
  }, [url])

  return model || contextModel
}
