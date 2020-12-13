import * as React from 'react'
import * as tf from '@tensorflow/tfjs'

import usePrediction from './usePrediction'

import {
  UseObjectDetectProps,
  ObjectDetectReturn,
  ObjectDetection
} from 'types/index'

export default function useObjectDetect ({
  returns = 5,
  classes,
  modelUrl,
  layers,
  ...props
}: UseObjectDetectProps = {}): typeof ObjectDetectReturn {
  const [detection, setObjectDetection] = React.useState<ObjectDetection>(null)
  const requestFramRef = React.useRef(0)

  const [setDataRef, prediction] = usePrediction({ modelUrl, layers, ...props })

  React.useEffect(() => {
    if (prediction) {
      void transformPredictions(prediction as tf.Tensor[])
    }
  }, [prediction])

  return [setDataRef, detection]
}

const transformPredictions = async (
  res: tf.Tensor[]
): Promise<Array<Float32Array | Int32Array | Uint8Array>> => {
  const result = await Promise.all(
    res.map(async data => {
      const datum = await data.data()
      data.dispose()
      return datum
    })
  )
  return result
}
