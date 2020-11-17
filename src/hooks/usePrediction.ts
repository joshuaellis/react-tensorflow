import * as React from 'react'
import * as tf from '@tensorflow/tfjs'

import {
  UsePredictionOptions,
  Prediction,
  GraphModel,
  LayersModel
} from 'types/index'

import useModel from './useModel'
import useDataRef from './useDataRef'

let T: [React.MutableRefObject<tf.Tensor | null>, Prediction]

export default function usePrediction ({
  modelUrl
}: UsePredictionOptions = {}): typeof T {
  const [prediction, setPrediction] = React.useState<Prediction>(null)
  const model = useModel({ modelUrl })
  const dataRef = React.useRef<tf.Tensor | null>(null)
  const data = useDataRef(dataRef)

  React.useEffect(() => {
    if (model !== null && data !== null) {
      void Promise.resolve(getPrediction(model, data)).then(
        (prediction: tf.Tensor | tf.Tensor[] | tf.NamedTensorMap | null) =>
          setPrediction(prediction)
      )
    }
  }, [model, data, prediction])

  return [dataRef, prediction]
}

const getPrediction = async (
  model: GraphModel | LayersModel,
  data: tf.Tensor
): Promise<Prediction> => {
  const prediction = await model.predict(data, {})
  return prediction
}
