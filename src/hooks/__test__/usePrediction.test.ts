import * as tf from '@tensorflow/tfjs'
import { act } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'

import usePrediction from '../usePrediction'

describe('usePrediction', () => {
  const errorSpy = jest.spyOn(console, 'error')
  const requestAnimSpy = jest.spyOn(global, 'requestAnimationFrame')
  const cancelAnimSpy = jest.spyOn(global, 'cancelAnimationFrame')
  const expected = tf.tensor([1, 2, 3, 4])

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return null and print an error if there is no model available', async () => {
    const { result } = renderHook(() => usePrediction())

    expect(result.current[1]).toBe(null)
  })

  it('should use .predict as default', async () => {
    const mockPredict = jest.fn().mockImplementation(v => v)

    const promise = new Promise(resolve =>
      resolve({
        predict: mockPredict,
        dispose: jest.fn()
      })
    )

    const { waitForNextUpdate } = renderHook(() => {
      const arr = usePrediction({
        model: {
          load: async () => await promise
        }
      })

      arr[0].current = expected

      return arr
    })

    await waitForNextUpdate()
    await waitForNextUpdate()
    expect(mockPredict).toHaveBeenCalled()
  })

  it('should use .execute if a execute boolean is passed', async () => {
    const mockExecute = jest.fn().mockImplementation(v => v)

    const promise = new Promise(resolve =>
      resolve({
        execute: mockExecute,
        dispose: jest.fn()
      })
    )

    const { waitForNextUpdate } = renderHook(() => {
      const arr = usePrediction({
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
    await waitForNextUpdate()
    expect(mockExecute).toHaveBeenCalled()
  })

  it('should print an error and not try to predict again if there is no prediction function available on the passed model', async () => {
    const expected = tf.tensor([1, 2, 3, 4])
    const promise = new Promise(resolve => resolve({ dispose: jest.fn() }))

    const { waitForNextUpdate } = renderHook(() => {
      const arr = usePrediction({
        model: {
          load: async () => await promise
        }
      })
      arr[0].current = expected
      return arr
    })

    await waitForNextUpdate()
    expect(errorSpy).toBeCalledWith('model does not have prediction function')
    expect(requestAnimSpy).not.toHaveBeenCalled()
  })

  it('should dispose of the tensor and cancel the animation frame on unmount', async () => {
    const disposeSpy = jest.fn()
    const mockPredict = jest
      .fn()
      .mockImplementation(v => ({ dispose: disposeSpy }))

    const promise = new Promise(resolve =>
      resolve({
        predict: mockPredict,
        dispose: jest.fn()
      })
    )

    const { waitForNextUpdate, unmount } = renderHook(() => {
      const arr = usePrediction({
        model: {
          load: async () => await promise
        }
      })
      arr[0].current = expected
      return arr
    })

    await waitForNextUpdate()
    await waitForNextUpdate()
    act(() => {
      unmount()
    })
    expect(cancelAnimSpy).toHaveBeenCalled()
    expect(disposeSpy).toHaveBeenCalled()
  })
})
