import * as React from 'react'
import * as tf from '@tensorflow/tfjs'

import {
  ClassificationReturn,
  UseClassifierProps,
  Prediction,
  Classification
} from 'types/index'

import usePrediction from './usePrediction'

export default function useClassifier ({
  returns = 5,
  classes,
  modelUrl,
  layers
}: UseClassifierProps = {}): typeof ClassificationReturn {
  const [classifications, setClassifications] = React.useState<Classification>(
    null
  )
  const requestFramRef = React.useRef(0)

  const [setDataRef, prediction] = usePrediction({ modelUrl, layers })

  const classify = React.useCallback(
    (tensor: Prediction): Classification => {
      const values = tf.tidy(() => {
        const softmax = (tensor as tf.Tensor2D).softmax()
        return softmax.dataSync() as Int32Array
      })

      const valuesWithIndices: Array<{
        probability: number
        class: number
      }> = []
      values.forEach((val, i) => {
        valuesWithIndices.push({ probability: val, class: i })
      })

      const unclassifiedPrediction = valuesWithIndices
        .sort((a, b) => b.probability - a.probability)
        .slice(0, returns)

      if (classes) {
        return unclassifiedPrediction.map(
          ({ class: predClassInd, probability }) => ({
            class: classes[predClassInd],
            probability
          })
        )
      } else {
        return unclassifiedPrediction
      }
    },
    [returns, classes]
  )

  React.useEffect(() => {
    if (prediction) {
      const classifiedPrediction = classify(prediction)

      requestFramRef.current = requestAnimationFrame(() =>
        setClassifications(classifiedPrediction)
      )
    }
  }, [prediction])

  return [setDataRef, classifications]
}
