import { ReactTensorflow } from 'types/index'

const attachWebcam = async (
  elem: HTMLVideoElement | null,
  opts?: ReactTensorflow.AttachWebcamOptions
) => {
  try {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error('No camera available')
    }
    if (!elem) {
      throw new Error('No video element passed')
    }

    const defaults: ReactTensorflow.AttachWebcamOptions = {
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
