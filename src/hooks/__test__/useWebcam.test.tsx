import * as React from 'react'
import { render } from '@testing-library/react'

import useWebcam from '../useWebcam'

describe('useWebcam', () => {
  it('should call getUserMedia given there is an element attached to the ref', () => {
    const mock = jest.fn()

    Object.defineProperty(navigator, 'mediaDevices', {
      get: () => ({
        getUserMedia: mock
      })
    })

    const VideoComponent: React.FC = () => {
      const ref = useWebcam()
      return <video ref={ref} />
    }

    render(<VideoComponent />)
    expect(mock).toHaveBeenCalled()
  })
})
