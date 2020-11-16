import * as tf from '@tensorflow/tfjs'
import { renderHook } from '@testing-library/react-hooks'

import usePrediction from '../usePrediction'

describe('usePrediction', () => {
  void tf.setBackend('cpu')

  it('should return null and print an error if there is no model available', async () => {
    const { result } = renderHook(() => usePrediction())

    expect(result.current[1]).toBe(null)
  })

  it('should return a prediction if given a tensor', async () => {
    const expected = tf.tensor([1, 2, 3, 4])

    const { result, waitForNextUpdate } = renderHook(() => {
      const arr = usePrediction({
        modelUrl:
          'https://tfhub.dev/google/tfjs-model/imagenet/inception_v3/classification/3/default/1'
      })

      arr[0].current = expected

      return arr
    })

    await waitForNextUpdate()

    expect(result.current[1]).toBe(expected)
  })
})
