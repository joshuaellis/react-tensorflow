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
  const [prediction, setPrediction] = React.useState<Prediction>(null)
  const [predictionFault, setPredictionFault] = React.useState<boolean>(false)
  const requestFramRef = React.useRef(0)

  const model = useModel({ ...props })
  const [data, setDataRef] = useDataRef()

  React.useEffect(() => {
    return () => {
      cancelAnimationFrame(requestFramRef.current)

      if (prediction) {
        void (prediction as tf.Tensor)?.dispose()
      }
    }
  }, [prediction])

  React.useEffect(() => {
    if (model && data && !predictionFault) {
      const predictFunc = getPrediction(model, {
        useExecute,
        outputName,
        predictConfig
      })(data)

      void Promise.resolve(predictFunc)
        .then(prediction => {
          requestFramRef.current = requestAnimationFrame(() =>
            setPrediction(oldPrediction => {
              if (oldPrediction) {
                tf.dispose(oldPrediction)
              }
              return prediction
            })
          )
        })
        .catch(e => {
          console.error(e.message)
          setPredictionFault(true)
        })
    }
  }, [model, data])

  return [setDataRef, prediction]
}

const getPrediction = (
  model: GraphModel | LayersModel | null,
  { predictConfig, useExecute = false, outputName }: UsePredictionProps
) => async (data: tf.Tensor): Promise<Prediction> => {
  if (useExecute && model instanceof tf.GraphModel && model?.executeAsync) {
    return await model.executeAsync(data, outputName)
  } else if (model?.predict ?? model instanceof tf.LayersModel) {
    return model.predict(data, predictConfig)
  } else {
    throw new Error('model does not have prediction function')
  }
}
