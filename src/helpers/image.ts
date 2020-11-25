import * as tf from '@tensorflow/tfjs'
import { WebcamIterator } from '@tensorflow/tfjs-data/dist/iterators/webcam_iterator'

const getImageFromWebcam = async (
  webcam: WebcamIterator | null,
  width = 150,
  height = 150
): Promise<tf.Tensor | null> => {
  if (webcam === null || width === 0 || height === 0) {
    return null
  }

  const img = await webcam.capture()

  if (img) {
    const processedImg = tf.tidy(() => {
      const normalized: tf.Tensor3D = img
        .toFloat()
        .mul(2 / 255)
        .add(-1)

      const resized = tf.image.resizeBilinear(normalized, [width, height], true)

      return resized.reshape([-1, width, height, 3])
    })

    img.dispose()

    return processedImg
  } else {
    return null
  }
}

export default getImageFromWebcam
