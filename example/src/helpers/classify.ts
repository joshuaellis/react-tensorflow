import { Tensor2D } from '@tensorflow/tfjs'

export type ClassifyReturn = Array<{ className: string; probability: number }>

const classify = (
  tensor: Tensor2D,
  returnAmount: number,
  classes: { [classId: number]: string }
): ClassifyReturn => {
  const softmax = tensor.slice([0, 1], [-1, 1000]).softmax()
  const values = softmax.dataSync() as Int32Array
  softmax.dispose()

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
