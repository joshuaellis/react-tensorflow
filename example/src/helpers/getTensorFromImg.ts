import * as tf from '@tensorflow/tfjs'

const getTensorFromImg = (elem: HTMLImageElement) =>
  tf.tidy(() => {
    const image = tf.browser.fromPixels(elem)

    const normalized: tf.Tensor3D = image
      .toFloat()
      .mul(2 / 255)
      .add(-1)

    let resized = tf.image.resizeBilinear(normalized, [224, 224], true)

    return resized.reshape([-1, 224, 224, 3])
  })

export default getTensorFromImg
