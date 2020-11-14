import * as tf from '@tensorflow/tfjs'
import { WebcamIterator } from '@tensorflow/tfjs-data/dist/iterators/webcam_iterator'

const getImageFromWebcam = async (
  webcam: WebcamIterator,
  width: number = 150,
  height: number = 150
): Promise<tf.Tensor> => {
  const img = await webcam.capture()

  const processedImg = processImage(resizeImage(width, height)(cropImage(img)))

  img.dispose()

  return processedImg
}

const cropImage = (img: tf.Tensor3D) => {
  const [width, height] = img.shape

  const shorterSide = Math.min(width, height)
  const startingHeight = (height - shorterSide) / 2
  const startingWidth = (width - shorterSide) / 2
  const endingHeight = startingHeight + shorterSide
  const endingWidth = startingWidth + shorterSide
  // return image data cropped to those points
  return img.slice(
    [startingWidth, startingHeight, 0],
    [endingWidth, endingHeight, 3]
  )
}

const processImage = (img: tf.Tensor3D) =>
  tf.tidy(() =>
    img
      .expandDims(0)
      .toFloat()
      .div(127)
      .sub(1)
  )

const resizeImage = (width: number, height: number) => (img: tf.Tensor3D) =>
  tf.image.resizeBilinear(img, [width, height])

export { resizeImage, processImage, cropImage, getImageFromWebcam }
