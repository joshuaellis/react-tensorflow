import * as tf from '@tensorflow/tfjs'

const setBackend = (desired: string): (() => void) => {
  const currBackend = tf.getBackend()
  const resetBackend = (): void => {
    void tf.setBackend(currBackend)
  }

  void tf.setBackend(desired)

  return resetBackend
}

export default setBackend
