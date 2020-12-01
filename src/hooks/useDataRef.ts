import * as React from 'react'
import * as tf from '@tensorflow/tfjs'

import { UseDataRefReturn } from 'types/index'

export default function useDataRef (): typeof UseDataRefReturn {
  const [data, _setData] = React.useState<tf.Tensor | null>(null)

  const setData = React.useCallback(
    datum => {
      if (datum && datum !== data) {
        _setData(oldData => {
          if (oldData) {
            tf.dispose(oldData)
          }
          return datum
        })
      }
    },
    [data]
  )

  React.useEffect(() => {
    return () => {
      if (data) {
        tf.dispose(data)
      }
    }
  }, [data])

  return [data, setData]
}
