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
  useExecute,
  outputName,
  ...props
}: UsePredictionProps = {}): typeof PredictionReturn {
  const [prediction, setPrediction] = React.useState<Float32Array | null>(null)
  const model = useModel({ ...props })
  const dataRef = React.useRef<tf.Tensor | null>(null)
  const data = useDataRef(dataRef)

  React.useEffect(() => {
    if (model !== null && data !== null) {
      void Promise.resolve(
        getPrediction(model, data, predictConfig, useExecute, outputName)
      )
        .then(
          async prediction =>
            (await (prediction as tf.Tensor).data()) as Float32Array
        )
        .then(data => setPrediction(data))
    }
  }, [model, data, prediction])

  return [dataRef, prediction]
}

const getPrediction = (
  model: GraphModel | LayersModel,
  data: tf.Tensor,
  predictConfig?: tf.ModelPredictConfig,
  useExecute = false,
  outputName = ''
): Prediction => {
  if (useExecute) {
    return model.execute(data, outputName)
  } else {
    return model.predict(data, predictConfig)
  }
}
