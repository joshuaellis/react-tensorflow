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
  const dataRef = React.useRef<tf.Tensor | null>(null)
  const requestFramRef = React.useRef(0)

  const model = useModel({ ...props })
  const data = useDataRef(dataRef)

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
        const prediction = predictFunc(data)

        requestFramRef.current = requestAnimationFrame(() =>
          setPrediction(oldPrediction => {
            if (oldPrediction && oldPrediction instanceof tf.Tensor) {
              oldPrediction.dispose()
            }
            return prediction
          })
        )
      } catch (err) {
        console.error(err.message)
        setPredictionFault(true)
      }
    }
  }, [model, data])

  return [dataRef, prediction]
}

const getPrediction = (
  model: GraphModel | LayersModel | null,
  { predictConfig, useExecute = false, outputName = '' }: UsePredictionProps
) => (data: tf.Tensor): Prediction => {
  if (useExecute && model?.execute) {
    return model.execute(data, outputName)
  } else if (model?.predict) {
    return model.predict(data, predictConfig)
  } else {
    throw new Error('model does not have prediction function')
  }
}
