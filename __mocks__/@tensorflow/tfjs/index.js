import * as tf from '@tensorflow/tfjs'

module.exports = {
  ...tf,
  dispose: jest.fn(),
  loadGraphModel: () =>
    new Promise(resolve =>
      resolve({
        name: 'TF Graph Model',
        predict: v => v,
        execute: v => v,
        outputs: [{ name: 'output_layer' }]
      })
    ),
  loadLayersModel: () =>
    new Promise(resolve =>
      resolve({
        name: 'TF Layer Model',
        predict: v => v,
        execute: v => v,
        outputs: [{ name: 'output_layer' }]
      })
    ),
  data: {
    ...tf.data,
    webcam: () => ({
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
