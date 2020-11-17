import * as React from 'react'
import { screen, render, waitFor } from '@testing-library/react'

import useWebcam from '../useWebcam'

describe('useWebcam', () => {
  const mock = jest.fn()
  Object.defineProperty(navigator, 'mediaDevices', {
    get: () => ({
      getUserMedia: mock
    })
  })

  it('should call getUserMedia given there is an element attached to the ref', () => {
    const VideoComponent: React.FC = () => {
      const [ref] = useWebcam()
      return <video ref={ref} />
    }

    const { unmount } = render(<VideoComponent />)
    expect(mock).toHaveBeenCalledTimes(1)
    unmount()
  })

  it('should return a tensor the size of the video', async () => {
    const expected: number[] = [1, 150, 150, 3]

    const VideoComponent: React.FC = () => {
      const [ref, tensor] = useWebcam()

      return (
        <div>
          <video width={150} height={150} ref={ref} />
          {tensor !== null && (
            <p data-testid='tfp'>{JSON.stringify(tensor?.shape)}</p>
          )}
        </div>
      )
    }

    render(<VideoComponent />)

    await waitFor(() => expect(screen.getAllByTestId('tfp')))

    expect(screen.getByTestId('tfp')).toHaveTextContent(
      JSON.stringify(expected)
    )
  })

  it('should return a tensor at a size of 75 x 75', async () => {
    const expected: number[] = [1, 75, 75, 3]

    const VideoComponent: React.FC = () => {
      const [ref, tensor] = useWebcam({
        width: 75,
        height: 75
      })

      return (
        <div>
          <video width={150} height={150} ref={ref} />
          {tensor !== null && (
            <p data-testid='tfp'>{JSON.stringify(tensor?.shape)}</p>
          )}
        </div>
      )
    }

    render(<VideoComponent />)

    await waitFor(() => expect(screen.getAllByTestId('tfp')))

    expect(screen.getByTestId('tfp')).toHaveTextContent(
      JSON.stringify(expected)
    )
  })
})
