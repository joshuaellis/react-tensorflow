import * as React from 'react'
import * as tf from '@tensorflow/tfjs'
import { WebcamIterator } from '@tensorflow/tfjs-data/dist/iterators/webcam_iterator'

import attachWebcam from 'helpers/attachWebcam'
import { getImageFromWebcam } from 'helpers/image'

import { ReactTensorflow } from 'types/index'

export default function useWebcam (args?: ReactTensorflow.AttachWebcamOptions):[React.MutableRefObject<HTMLVideoElement | null>, tf.Tensor| null] {
  const [tfWebcam, setTfWebcam] = React.useState<WebcamIterator | null>(null)
  const [imageTensor, setImageTensor] = React.useState<tf.Tensor | null>(null)
  const videoRef = React.useRef<HTMLVideoElement | null>(null)

  React.useEffect(() => {
    if (tfWebcam) {
      return
    } else {
      attachWebcam(videoRef.current, args)
      Promise.resolve(getTensorflowWebcam(videoRef.current)).then(tfCam =>
        setTfWebcam(tfCam)
      )
    }
  }, [videoRef])

  React.useEffect(() => {
    if (!tfWebcam || !videoRef) {
      return
    }

    const { current: video } = videoRef

    Promise.resolve(
      getImageFromWebcam(
        tfWebcam,
        args?.width || video?.width,
        args?.height || video?.height
      )
    ).then(tensor =>
      requestAnimationFrame(() => {
        setImageTensor(tensor)
      })
    )
  }, [videoRef, tfWebcam, imageTensor])

  return [videoRef, imageTensor]
}

const getTensorflowWebcam = async (
  elem: HTMLVideoElement | null
): Promise<WebcamIterator | null> => {
  try {
    if (!elem) {
      throw new Error(
        'Failed to pass element to react-tensorflow/getTensorflowWebcam'
      )
    } else {
      const webcam = await tf.data.webcam(elem)
      return webcam
    }
  } catch (err) {
    console.error(err.message)
    return null
  }
}
