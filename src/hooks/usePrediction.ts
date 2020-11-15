import * as React from 'react'
import * as tf from '@tensorflow/tfjs'

import { ReactTensorflow } from 'types/index'

import useModel from './useModel'
import useDataRef from './useDataRef'

let T:[React.MutableRefObject<tf.Tensor | null>, tf.Tensor | tf.Tensor[] | tf.NamedTensorMap | null]

export default function usePrediction (opts:ReactTensorflow.UsePredictionOptions = {}):typeof T {
  const { modelUrl } = opts
  const [prediction, setPrediction] = React.useState<tf.Tensor | tf.Tensor[] | tf.NamedTensorMap | null>(null)
  const model = useModel(modelUrl)
  const dataRef = React.useRef<tf.Tensor | null>(null)
  const data = useDataRef(dataRef)

  React.useEffect(() => {
    if (model && data) {
      Promise.resolve(getPrediction(model, data)).then((prediction: tf.Tensor | tf.Tensor[] | tf.NamedTensorMap | null) => setPrediction(prediction))
    }
  }, [model, data, prediction])

  return [dataRef, prediction]
}

const getPrediction = async (model: ReactTensorflow.GraphModel | ReactTensorflow.LayersModel, data: tf.Tensor) => {
  const prediction = await model.predict(data, {})
  return prediction
}
