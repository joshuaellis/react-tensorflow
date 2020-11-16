import * as tf from '@tensorflow/tfjs'

import { resizeImage, processImage, cropImage } from '../image'

void tf.setBackend('cpu')

describe('image helpers', () => {
  const expected = [1, 150, 150, 3]

  const img = tf.tensor3d([
    [
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1]
    ],
    [
      [1, 1, 1],
      [11, 12, 13],
      [14, 15, 16],
      [1, 1, 1]
    ],
    [
      [1, 1, 1],
      [1, 2, 3],
      [4, 5, 6],
      [1, 1, 1]
    ],
    [
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1]
    ]
  ])

  it(`should return a shape of ${JSON.stringify(expected)}`, () => {
    const tensor = processImage(resizeImage(150, 150)(cropImage(img)))
    expect(tensor.shape).toEqual(expected)
  })
})
