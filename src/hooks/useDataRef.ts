import * as React from 'react'
import * as tf from '@tensorflow/tfjs'

export default function useDataRef (
  dataRef: React.MutableRefObject<tf.Tensor | null>
): tf.Tensor | null {
  const [data, setData] = React.useState<tf.Tensor | null>(null)

  React.useEffect(() => {
    if (dataRef.current !== null && data !== dataRef.current) {
      setData(dataRef.current)
    }
  }, [dataRef])

  return data
}
