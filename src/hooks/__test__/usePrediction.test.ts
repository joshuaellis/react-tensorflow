import * as tf from '@tensorflow/tfjs'
import { renderHook } from '@testing-library/react-hooks'

import * as prediction from '../usePrediction'

describe('usePrediction', () => {
  it('should return null and print an error if there is no model available', async () => {
    const { result } = renderHook(() => prediction.usePrediction())

    expect(result.current[1]).toBe(null)
  })

  it('should use .predict as default', async () => {
    const mockPredict = jest.fn().mockImplementation(v => v)
    const expected = tf.tensor([1, 2, 3, 4])

    const promise = new Promise(resolve =>
      resolve({
        predict: mockPredict,
        dispose: jest.fn()
      })
    )

    const { waitForNextUpdate } = renderHook(() => {
      const arr = prediction.usePrediction({
        model: {
          load: async () => await promise
        }
      })

      arr[0].current = expected

      return arr
    })

    await waitForNextUpdate()
    expect(mockPredict).toHaveBeenCalled()
  })

  it('should use .execute if a execute boolean is passed', async () => {
    const mockExecute = jest.fn().mockImplementation(v => v)

    const expected = tf.tensor([1, 2, 3, 4])
    const promise = new Promise(resolve =>
      resolve({
        execute: mockExecute,
        dispose: jest.fn()
      })
    )

    const { waitForNextUpdate } = renderHook(() => {
      const arr = prediction.usePrediction({
        model: {
          load: async () => await promise
        },
        useExecute: true,
        outputName: 'test'
      })
      arr[0].current = expected
      return arr
    })

    await waitForNextUpdate()
    expect(mockExecute).toHaveBeenCalled()
  })

  it('should use a passed function name if predictionFunction is passed and exists', async () => {
    const mockClassify = jest.fn().mockImplementation(v => v)

    const expected = tf.tensor([1, 2, 3, 4])
    const promise = new Promise(resolve =>
      resolve({
        classify: mockClassify,
        dispose: jest.fn()
      })
    )

    const { waitForNextUpdate } = renderHook(() => {
      const arr = prediction.usePrediction({
        model: {
          load: async () => await promise
        },
        predictionFunction: 'classify'
      })
      arr[0].current = expected
      return arr
    })

    await waitForNextUpdate()
    expect(mockClassify).toHaveBeenCalled()
  })

  it('should print an error and not try to predict again if there is no prediction function available on the passed model', async () => {
    const errorSpy = jest.spyOn(console, 'error')

    const expected = tf.tensor([1, 2, 3, 4])
    const promise = new Promise(resolve => resolve({ dispose: jest.fn() }))

    const { waitForNextUpdate } = renderHook(() => {
      const arr = prediction.usePrediction({
        model: {
          load: async () => await promise
        }
      })
      arr[0].current = expected
      return arr
    })

    await waitForNextUpdate()
    expect(errorSpy).toBeCalledWith('model does not have prediction function')
  })
})
