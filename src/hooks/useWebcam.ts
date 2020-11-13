import * as React from 'react'

import attachWebcam from 'helpers/attachWebcam'

export default function useWebcam () {
  const videoRef = React.useRef<HTMLVideoElement>(null)

  React.useEffect(() => {
    attachWebcam(videoRef.current)
  }, [videoRef])

  return videoRef
}
