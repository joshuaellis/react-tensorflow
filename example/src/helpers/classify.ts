import * as tf from '@tensorflow/tfjs'

export type ClassifyReturn = Array<{ className: string; probability: number }>

const classify = (
  tensor: tf.Tensor2D,
  returnAmount: number,
  classes: { [classId: number]: string }
): ClassifyReturn => {
  const values = tf.tidy(() => {
    const softmax = tensor.slice([0, 1], [-1, 1000]).softmax()
    return softmax.dataSync() as Int32Array
  })

  const valuesWithIndices: Array<{ value: number; index: number }> = []
  values.forEach((val, i) => {
    valuesWithIndices.push({ value: val, index: i })
  })

  return valuesWithIndices
    .sort((a, b) => b.value - a.value)
    .filter((_, i) => i < returnAmount)
    .map(({ value, index }) => ({
      className: classes[index],
      probability: value
    }))
}

export default classify
