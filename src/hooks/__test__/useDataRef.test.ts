import * as tf from '@tensorflow/tfjs'
import { renderHook } from '@testing-library/react-hooks'
import { useRef } from 'react'
import { act } from 'react-dom/test-utils'

import useDataRef from '../useDataRef'

describe('useDataRef', () => {
  const expected = tf.tensor([1, 2, 3, 4])
  const disposeSpy = jest.spyOn(tf, 'dispose')

  it('should dispose of tensor data on unmount', async () => {
    const { unmount } = renderHook(() => {
      const ref = useRef(expected)

      return useDataRef(ref)
    })

    act(() => {
      unmount()
    })
    expect(disposeSpy).toHaveBeenCalled()
  })
})
