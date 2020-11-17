import attachWebcam from '../attachWebcam'

describe('attachWebcam', () => {
  const getUserMediaMock = jest.fn()

  it('should throw an error if navigator.mediaDevices does not exist', async () => {
    await expect(attachWebcam(null)).rejects.toThrow('No camera available')
  })

  it('should throw an error if no element is passed', async () => {
    Object.defineProperty(navigator, 'mediaDevices', {
      get: () => ({
        getUserMedia: getUserMediaMock
      })
    })
    await expect(attachWebcam(null)).rejects.toThrow('No video element passed')
  })

  it('should pass arguments to getUserMedia', async () => {
    const video = document.createElement('video')

    const args = {
      audio: true,
      video: true,
      facingMode: 'user',
      width: 600,
      height: 420
    }

    await attachWebcam(video, args)

    expect(getUserMediaMock).toHaveBeenCalledWith(args)
  })

  it('should pass defaults to getUserMedia if no arguments are passed', async () => {
    const video = document.createElement('video')
    video.height = 100
    video.width = 100

    const defaults = {
      audio: false,
      video: true,
      facingMode: 'user',
      width: video.width,
      height: video.height
    }

    await attachWebcam(video)

    expect(getUserMediaMock).toHaveBeenCalledWith(defaults)
  })
})
