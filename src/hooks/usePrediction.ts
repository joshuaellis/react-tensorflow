import * as React from 'react'
import * as tf from '@tensorflow/tfjs'

import {
  UsePredictionProps,
  Prediction,
  GraphModel,
  LayersModel,
  PredictionReturn
} from 'types/index'

import useModel from './useModel'
import useDataRef from './useDataRef'

export default function usePrediction ({
  predictConfig,
  usePredict,
  ...props
}: UsePredictionProps = {}): typeof PredictionReturn {
  const [prediction, setPrediction] = React.useState<Prediction>(null)
  const model = useModel({ ...props })
  const dataRef = React.useRef<tf.Tensor | null>(null)
  const data = useDataRef(dataRef)

  React.useEffect(() => {
    if (model !== null && data !== null) {
      void Promise.resolve(
        getPrediction(model, data, predictConfig, usePredict)
      ).then(prediction => setPrediction(prediction))
    }
  }, [model, data, prediction])

  return [dataRef, prediction]
}

const getPrediction = (
  model: GraphModel | LayersModel,
  data: tf.Tensor,
  predictConfig?: tf.ModelPredictConfig,
  usePredict = false
): Prediction => {
  if (predictConfig !== undefined || usePredict) {
    return model.predict(data, {
      batchSize: 32,
      verbose: false,
      ...predictConfig
    })
  } else {
    return model.execute(data, model.outputs[0].name)
  }
}
