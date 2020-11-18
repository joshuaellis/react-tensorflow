import * as React from 'react'
import { screen, render, waitFor } from '@testing-library/react'
// import * as tf from '@tensorflow/tfjs'

import useWebcam, { getTensorflowWebcam } from '../useWebcam'

afterEach(() => {
  jest.clearAllMocks()
})

describe('useWebcam', () => {
  const mockGetTracks = jest.fn()
  const mock = jest.fn().mockImplementation(() => ({
    getTracks: mockGetTracks.mockReturnValueOnce([
      {
        stop: jest.fn()
      }
    ])
  }))

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

    render(<VideoComponent />)
    expect(mock).toHaveBeenCalledTimes(1)
  })

  it('should return a tensor the size of the video', async () => {
    const expected: number[] = [1, 150, 150, 3]

    const VideoComponent: React.FC = () => {
      const [ref, tensor] = useWebcam()

      console.log(tensor)

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

  // it('should dispose of the old tensor when replacing the new tensor in state', async () => {
  //   const disposeSpy = jest.spyOn(tf, 'dispose')
  //   const requestAnimationSpy = jest.spyOn(global, 'requestAnimationFrame')

  //   const VideoComponent: React.FC = () => {
  //     const [ref] = useWebcam()
  //     return <video width={150} height={150} ref={ref} />
  //   }

  //   render(<VideoComponent />)

  //   await waitFor(() => expect(requestAnimationSpy).toHaveBeenCalled())

  //   expect(disposeSpy).toHaveBeenCalled()
  // })

  it('should clear stream tracks when unmounted', async () => {
    const requestAnimationSpy = jest.spyOn(global, 'requestAnimationFrame')

    const VideoComponent: React.FC = () => {
      const [ref] = useWebcam()
      return <video width={150} height={150} ref={ref} />
    }

    const { unmount } = render(<VideoComponent />)

    await waitFor(() => expect(requestAnimationSpy).toHaveBeenCalled())

    unmount()

    expect(mockGetTracks).toHaveBeenCalled()
  })
})

describe('getTensorflowWebcam', () => {
  it('should throw an error if passed no element', async () => {
    void expect(getTensorflowWebcam(null)).rejects.toThrowError(
      'Failed to pass element to react-tensorflow/getTensorflowWebcam'
    )
  })
})
