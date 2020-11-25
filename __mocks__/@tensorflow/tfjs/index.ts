/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/promise-function-async */
import * as tf from '@tensorflow/tfjs'

const modelSharedProperties = {
  predict: (v: any) => v,
  execute: (v: any) => v,
  outputs: [{ name: 'output_layer' }],
  dispose: jest.fn()
}

module.exports = {
  ...tf,
  dispose: jest.fn(),
  loadGraphModel: () =>
    new Promise(resolve =>
      resolve({
        name: 'TF Graph Model',
        ...modelSharedProperties
      })
    ),
  loadLayersModel: () =>
    new Promise(resolve =>
      resolve({
        name: 'TF Layer Model',
        ...modelSharedProperties
      })
    ),
  data: {
    ...tf.data,
    webcam: () => ({
      stop: () => null,
      capture: () =>
        tf.tensor3d([
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
    })
  }
}
