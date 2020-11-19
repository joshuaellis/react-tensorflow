import * as React from 'react'

import { UseModelProps, ModelInterface } from 'types/index'

import loadModel from 'helpers/loadModel'

import ModelCtx from 'components/ModelContext'

export default function useModel ({
  model: modelObj,
  modelUrl,
  ...opts
}: UseModelProps = {}): ModelInterface {
  const [model, setModel] = React.useState<ModelInterface>(null)

  const contextModel = React.useContext(ModelCtx)

  React.useEffect(() => {
    const getModel = async (): Promise<void> => {
      const loadedModel = await loadModel(modelUrl, opts)
      setModel(loadedModel)
    }

    const loadNodeModel = async (): Promise<void> => {
      const loadedModel = await modelObj.load()
      setModel(loadedModel)
    }

    if (modelUrl !== undefined) {
      void getModel()
    } else if (modelObj !== undefined) {
      void loadNodeModel()
    }
  }, [modelUrl, modelObj])

  return model ?? contextModel
}
