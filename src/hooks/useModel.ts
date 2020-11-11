import * as React from 'react'

import { ReactTensorFlow } from 'types/index'

import loadModel from 'helpers/loadModel'

export default function useModel (
  url: string | undefined,
  opts?: ReactTensorFlow.LoadOptionsType
): ReactTensorFlow.GraphModel | ReactTensorFlow.LayersModel | null {
  const [model, setModel] = React.useState<
    ReactTensorFlow.GraphModel | ReactTensorFlow.LayersModel | null
  >(null)

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

  return model
}
