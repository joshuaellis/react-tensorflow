import * as React from 'react'
import { Typography } from '@material-ui/core'
import { useModel } from 'react-tensorflow'

export default function PageHome () {
  const model = useModel(
    'https://tfhub.dev/google/tfjs-model/imagenet/inception_v3/classification/3/default/1'
  )

  return (
    <main>
      <Typography component='h2' variant='h5'>
        This page uses the useModelHook with a TF Hub Model
      </Typography>
    </main>
  )
}
