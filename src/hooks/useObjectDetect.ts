/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react'
import * as tf from '@tensorflow/tfjs'

import logOnce from 'helpers/logOnce'

import setBackend from 'helpers/setBackend'

import {
  UseObjectDetectProps,
  ObjectDetectReturn,
  ObjectDetection,
  BoundingBoxReturn,
  ObjectDetectClassifiedResults,
  ObjectDetectNonClassifiedResults
} from 'types/index'

import usePrediction from './usePrediction'

export default function useObjectDetect ({
  returns = 5,
  minConfidence = 0,
  classes,
  width,
  height,
  modelUrl,
  layers,
  ...props
}: UseObjectDetectProps = {}): typeof ObjectDetectReturn {
  const [detection, setObjectDetection] = React.useState<ObjectDetection>(null)
  const requestFramRef = React.useRef(0)
  const noBoxesReturningRef = React.useRef(logOnce(() =>
  console.warn(
    'You have not supplied a width and/or height to useObjectDetect, no boxes will be provided.'
  )
))

  const [setDataRef, prediction] = usePrediction({ modelUrl, layers, ...props })

  if (!width || !height) {
    noBoxesReturningRef.current()
  }

  const createObjectPredictions = React.useCallback(
    (res: tf.Tensor[]): ObjectDetection => {
      let resetBackend = null
      const [scores, boxes] = res.map(data => {
        const datum = data.dataSync()
        data.dispose()
        return datum as Float32Array
      })

      const [maxScores, classIndexes] = calcMaxScores(
        scores,
        // @ts-expect-error why you break piece of shit
        res[0].shape[1],
        res[0].shape[2]
      )

      if (tf.getBackend() === 'webgl') {
        resetBackend = setBackend('cpu')
      }

      const indexTensor = tf.tidy(() => {
        const boxes2 = tf.tensor2d(boxes, [res[1].shape[1] ?? 0, res[1].shape[3] ?? 0])
        return tf.image.nonMaxSuppression(
          boxes2,
          maxScores,
          returns,
          minConfidence,
          minConfidence
        )
      })

      const indexes = indexTensor.dataSync() as Float32Array
      indexTensor.dispose()

      if (resetBackend) {
        resetBackend()
      }

return buildObjects(
        indexes,
        maxScores,
        { width, height, boxes },
        {
classIndexes,
          classes
}
      )
    },
    []
  )

  React.useEffect(() => {
    if (prediction) {
      const objects = createObjectPredictions(prediction as tf.Tensor[])

      requestFramRef.current = requestAnimationFrame(() =>
        setObjectDetection(objects)
      )
    }
  }, [prediction])

  return [setDataRef, detection]
}

interface BoxBuildingArgs {
  width?: number
  height?: number
  boxes: Float32Array
}

interface ClassBuildingArgs {
  classIndexes: number[]
  classes?: { [classId: number]: string }
}

const buildObjects = (
  indexes: Float32Array,
  scores: number[],
{
  width,
  height,
  boxes
}: BoxBuildingArgs,
  {
    classIndexes,
    classes
  }: ClassBuildingArgs
  ): ObjectDetectClassifiedResults | ObjectDetectNonClassifiedResults => {
  const objects: ObjectDetectClassifiedResults | ObjectDetectNonClassifiedResults = []

  indexes.forEach((index, i) => {
    const bbox = []

    if (width && height) {
      for (let j = 0; j < 4; j++) {
        bbox[j] = boxes[indexes[i] * 4 + j]
      }
      const minY = bbox[0] * height
      const minX = bbox[1] * width
      const maxY = bbox[2] * height
      const maxX = bbox[3] * width
      bbox[0] = minX
      bbox[1] = minY
      bbox[2] = maxX - minX
      bbox[3] = maxY - minY
    }

    const classInd = classIndexes[index] + 1

    if (classes) {
      objects.push({
        class: classes[classInd],
        probability: scores[index],
        boundingBox: bbox as BoundingBoxReturn
      } as any)
    } else {
      objects.push({
        class: classInd,
        probability: scores[index],
        boundingBox: bbox as BoundingBoxReturn
      } as any)
    }
  })

  return objects
}

const calcMaxScores = (
  scores: Float32Array,
  numBoxes: number,
  numClasses: number): [number[], number[]] => {
  if (!numBoxes || !numClasses) {
    return [[], []]
  }

  const maxes = []
  const classes = []

  for (let i = 0; i < numBoxes; i++) {
    let max = Number.MIN_VALUE
    let index = -1

    for (let j = 0; j < numClasses; j++) {
      if (scores[i * numClasses + j] > max) {
        max = scores[i * numClasses + j]
        index = j
      }
    }

    maxes[i] = max
    classes[i] = index
  }

  return [maxes, classes]
}
