import { AttachWebcamOptions } from 'types/index'

const attachWebcam = async (
  elem: HTMLVideoElement | null,
  opts?: AttachWebcamOptions
): Promise<void> => {
  try {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error('No camera available')
    }
    if (elem === null) {
      throw new Error('No video element passed')
    }

    const defaults: AttachWebcamOptions = {
      audio: false,
      video: true,
      facingMode: 'user',
      width: elem.width,
      height: elem.height
    }
    elem.srcObject = await navigator.mediaDevices.getUserMedia({
      ...defaults,
      ...opts
    })
  } catch (err) {
    console.error(err.message)
    throw err
  }
}

export default attachWebcam
