const attachWebcam = async (elem: HTMLVideoElement | null) => {
  try {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error('No camera available')
    }
    if (!elem) {
      throw new Error('No video element passed')
    }

    elem.srcObject = await navigator.mediaDevices.getUserMedia()
  } catch (err) {
    console.error(err.message)
    throw err
  }
}

export default attachWebcam
