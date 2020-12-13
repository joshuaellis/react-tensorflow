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

  const predictFunc = React.useCallback(
    getPrediction(model, {
      useExecute,
      outputName,
      predictConfig
    }),
    [model, useExecute, outputName, predictConfig]
  )

  React.useEffect(() => {
    return () => {
      cancelAnimationFrame(requestFramRef.current)
      void (prediction as tf.Tensor)?.dispose()
    }
  }, [prediction])

  React.useEffect(() => {
    if (model && data && !predictionFault) {
      try {
        void Promise.resolve(predictFunc(data)).then(prediction => {
          requestFramRef.current = requestAnimationFrame(() =>
            setPrediction(oldPrediction => {
              if (oldPrediction) {
                tf.dispose(oldPrediction)
              }
              return prediction
            })
          )
        })
      } catch (err) {
        console.error(err.message)
        setPredictionFault(true)
      }
    }
  }, [model, data])

  return [setDataRef, prediction]
}

const getPrediction = (
  model: GraphModel | LayersModel | null,
  { predictConfig, useExecute = false, outputName = '' }: UsePredictionProps
) => async (data: tf.Tensor): Promise<Prediction> => {
  if (useExecute && model instanceof tf.GraphModel && model?.executeAsync) {
    return await model.executeAsync(data, outputName)
  } else if (model?.predict ?? model instanceof tf.LayersModel) {
    return model.predict(data, predictConfig)
  } else {
    throw new Error('model does not have prediction function')
  }
}
