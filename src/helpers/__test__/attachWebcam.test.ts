import attachWebcam from '../attachWebcam'

describe('attachWebcam', () => {
  it('Should throw an error if navigator.mediaDevices does not exist', async () => {
    await expect(attachWebcam(null)).rejects.toThrow('No camera available')
  })

  it('should throw an error if no element is passed', async () => {
    Object.defineProperty(navigator, 'mediaDevices', {
      get: () => ({
        getUserMedia: jest.fn()
      })
    })

    await expect(attachWebcam(null)).rejects.toThrow('No video element passed')
  })
})
