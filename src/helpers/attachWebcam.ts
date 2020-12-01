import { AttachWebcamOptions } from 'types/index'

import { noWebcamAvailable, webcamGetFailed } from 'references/errors'

const attachWebcam = async (
  elem: HTMLVideoElement | null,
  opts?: AttachWebcamOptions
): Promise<MediaStream> => {
  try {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error(noWebcamAvailable('useWebcam'))
    }
    if (elem === null) {
      throw new Error(webcamGetFailed('useWebcam'))
    }

    const defaults: AttachWebcamOptions = {
      audio: false,
      video: true,
      facingMode: 'user',
      width: elem.width,
      height: elem.height
    }
    const stream = await navigator.mediaDevices.getUserMedia({
      ...defaults,
      ...opts
    })

    elem.srcObject = stream

    return stream
  } catch (err) {
    console.error(err.message)
    throw err
  }
}

export default attachWebcam
