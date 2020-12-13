import * as React from 'react'

import { UseModelProps, ModelInterface, LoadOptionsType } from 'types/index'

import loadModel from 'helpers/loadModel'

import { noModelError, modelFailedLoad } from 'references/errors'

import ModelCtx from 'components/ModelContext'

export default function useModel ({
  model: modelObj,
  modelUrl,
  ...opts
}: UseModelProps = {}): ModelInterface {
  const [model, setModel] = React.useState<ModelInterface>(null)
  const [err, setErr] = React.useState(false)

  const ctx = React.useContext(ModelCtx)

  if (!ctx && !modelUrl && !modelObj && !err) {
    console.error(noModelError('useModel'))
    setErr(true)
  }

  React.useEffect(() => {
    if (!err && (modelUrl ?? modelObj)) {
      void Promise.resolve(
        getModel(modelUrl ?? modelObj, opts, !modelUrl)
      ).then(loadedModel => setModel(loadedModel))
    }

    return () => {
      if (model) {
        model.dispose()
      }
    }
  }, [modelUrl, modelObj, err])

  if (!modelUrl && !modelObj && ctx) {
    return ctx.model
  } else {
    return model
  }
}

const getModel = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  model: string | any,
  opts: LoadOptionsType,
  pkg = false
): Promise<ModelInterface> => {
  try {
    let loadedModel = null
    if (pkg) {
      loadedModel = await model.load()
    } else {
      loadedModel = await loadModel(model, opts)
    }

    if (!loadedModel) {
      throw new Error(modelFailedLoad('useModel'))
    } else if (loadedModel && opts.onLoadCallback) {
      opts.onLoadCallback(loadedModel)
    }

    return loadedModel
  } catch (err) {
    console.error(err.message)
    return null
  }
}
