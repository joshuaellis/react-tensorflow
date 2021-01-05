/* eslint-disable promise/param-names */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/promise-function-async */
import * as tf from '@tensorflow/tfjs'

import { GraphModel } from '@tensorflow/tfjs-converter'

const modelSharedProperties = {
  predict: (v: any) => v,
  executeAsync: (v: any) => v,
  outputs: [{ name: 'output_layer' }],
  dispose: jest.fn()
}

module.exports = {
  ...tf,
  dispose: jest.fn(),
  loadGraphModel: (url: string) => {
    const model = new GraphModel(url)
    model.executeAsync = async (): Promise<tf.Tensor[]> =>
      await new Promise(res =>
        res([tf.ones([1, 1917, 90]), tf.ones([1, 1917, 1, 4])])
      )
    return model
  },
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
