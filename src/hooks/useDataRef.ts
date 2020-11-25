import * as React from 'react'
import * as tf from '@tensorflow/tfjs'

export default function useDataRef (
  dataRef: React.MutableRefObject<tf.Tensor | null>
): tf.Tensor | null {
  const [data, setData] = React.useState<tf.Tensor | null>(null)
  const current = dataRef.current

  React.useEffect(() => {
    return () => {
      data?.dispose()
    }
  }, [])

  React.useEffect(() => {
    if (current && data !== current) {
      setData(oldData => {
        if (oldData) {
          oldData.dispose()
        }
        return current
      })
    }
  }, [current])

  return data
}
