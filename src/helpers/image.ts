import * as tf from '@tensorflow/tfjs'
import { WebcamIterator } from '@tensorflow/tfjs-data/dist/iterators/webcam_iterator'

const cropImage = (img: tf.Tensor3D): tf.Tensor3D =>
  tf.tidy(() => {
    const [width, height] = img.shape

    const shorterSide = Math.min(width, height)
    const startingHeight = (height - shorterSide) / 2
    const startingWidth = (width - shorterSide) / 2
    const endingHeight = startingHeight + shorterSide
    const endingWidth = startingWidth + shorterSide

    return img.slice(
      [startingWidth, startingHeight, 0],
      [endingWidth, endingHeight, 3]
    )
  })

const processImage = (img: tf.Tensor3D): tf.Tensor3D =>
  tf.tidy(() =>
    img
      .expandDims(0)
      .toFloat()
      .div(127)
      .sub(1)
  )

const resizeImage = (width: number, height: number) => (
  img: tf.Tensor3D
): tf.Tensor3D => tf.tidy(() => tf.image.resizeBilinear(img, [width, height]))

const getImageFromWebcam = async (
  webcam: WebcamIterator | null,
  width = 150,
  height = 150
): Promise<tf.Tensor | null> => {
  if (webcam === null) {
    return null
  }

  const img = await webcam.capture()

  if (img) {
    const processedImg = tf.tidy(() =>
      processImage(resizeImage(width, height)(cropImage(img)))
    )

    img.dispose()

    return processedImg
  } else {
    return null
  }
}

export { resizeImage, processImage, cropImage, getImageFromWebcam }
