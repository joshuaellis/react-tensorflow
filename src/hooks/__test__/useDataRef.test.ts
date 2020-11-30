import * as tf from '@tensorflow/tfjs'
import { renderHook, act } from '@testing-library/react-hooks'

import useDataRef from '../useDataRef'

describe('useDataRef', () => {
  const expectedData = [1, 2, 3, 4]
  const disposeSpy = jest.spyOn(tf, 'dispose')

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return data', async () => {
    const expected = tf.tensor(expectedData)
    const { result } = renderHook(() => useDataRef())

    expect(result.current[0]).toBeNull()

    void act(() => {
      result.current[1](expected)
    })

    expect(result.current[0]).toEqual(expected)
  })

  it('should not update when the ref data is the same', async () => {
    const expected = tf.tensor(expectedData)
    const { result } = renderHook(() => useDataRef())

    expect(result.current[0]).toBeNull()

    void act(() => {
      result.current[1](expected)
    })

    expect(result.current[0]).toEqual(expected)

    void act(() => {
      result.current[1](expected)
    })

    expect(disposeSpy).not.toHaveBeenCalled()
  })

  it('should update if the data ref has changed', async () => {
    const expected = tf.tensor(expectedData)
    const altExpected = tf.tensor([1, 2])
    const { result } = renderHook(() => useDataRef())

    expect(result.current[0]).toBeNull()

    void act(() => {
      result.current[1](expected)
    })

    expect(result.current[0]).toEqual(expected)

    void act(() => {
      result.current[1](altExpected)
    })

    expect(disposeSpy).toHaveBeenCalled()
    expect(result.current[0]).toEqual(altExpected)
  })

  it('should dispose of tensor data on unmount', async () => {
    const expected = tf.tensor(expectedData)
    const { result, unmount } = renderHook(() => useDataRef())

    void act(() => {
      result.current[1](expected)
    })

    void act(() => {
      unmount()
    })

    expect(disposeSpy).toHaveBeenCalled()
  })
})
