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

export function usePrediction ({
  predictConfig,
  useExecute,
  outputName,
  predictionFunction,
  ...props
}: UsePredictionProps = {}): typeof PredictionReturn {
  const [prediction, setPrediction] = React.useState<Prediction>(null)
  const [predictionFault, setPredictionFault] = React.useState<boolean>(false)
  const dataRef = React.useRef<tf.Tensor | null>(null)

  const model = useModel({ ...props })
  const data = useDataRef(dataRef)

  const predictFunc = React.useCallback(
    getPrediction(model, {
      useExecute,
      outputName,
      predictConfig,
      predictionFunction
    }),
    [model, useExecute, outputName, predictConfig, predictionFunction]
  )

  React.useEffect(() => {
    if (model && data && !predictionFault) {
      try {
        const prediction = predictFunc(data)

        requestAnimationFrame(() =>
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

export default usePrediction

export const getPrediction = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  model: GraphModel | LayersModel | any,
  {
    predictConfig,
    useExecute = false,
    outputName = '',
    predictionFunction
  }: UsePredictionProps
) => (data: tf.Tensor): Prediction => {
  if (predictionFunction !== undefined && model[predictionFunction]) {
    return model[predictionFunction](data)
  } else if (useExecute && model.execute) {
    return model.execute(data, outputName)
  } else if (model.predict !== undefined) {
    return model.predict(data, predictConfig)
  } else {
    throw new Error('model does not have prediction function')
  }
}
