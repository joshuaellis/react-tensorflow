import * as tf from '@tensorflow/tfjs'
import { renderHook } from '@testing-library/react-hooks'

import { PredictionReturn } from 'types/index'

import useClassifier from '../useClassifier'

describe('useClassifier', () => {
  const mockDataNoClasses = tf.tensor([
    [0, 0.2341515],
    [1, 0.12575438],
    [2, 0.874573456],
    [3, 0.905345],
    [4, 0.542548],
    [5, 0.2341515],
    [6, 0.2389],
    [7, 0.767443],
    [8, 0.064831],
    [9, 0.234782],
    [10, 0.123453],
    [11, 0.884425654]
  ])

  it('should return null and print an error if there is no model available', () => {
    jest.spyOn(console, 'error')

    const { result } = renderHook(() => useClassifier())

    expect(result.current[1]).toBeNull()
    expect(console.error).toHaveBeenCalled()
  })

  it('should return a maximum of 5 raw predictions with no parameters set', async () => {
    const { result, waitForNextUpdate } = renderHook(
      (): typeof PredictionReturn => {
        const [dataRef, prediction] = useClassifier({
          modelUrl:
            'https://tfhub.dev/google/tfjs-model/imagenet/inception_v3/classification/3/default/1'
        })

        dataRef.current = mockDataNoClasses

        return [dataRef, prediction]
      }
    )

    await waitForNextUpdate()

    expect((result.current[1] as tf.Tensor).arraySync()).toBe(
      (mockDataNoClasses.arraySync() as number[][]).slice(0, 5)
    )
  })

  it('should return one prediction when a return amount parameter has been set', () => {
    expect(false).toBe(true)
  })

  it('should return a prediction in the format of class:confidence percentage when classes are passed', () => {
    expect(false).toBe(true)
  })

  it('should return a different result if new data is passed', () => {
    expect(false).toBe(true)
  })
})
