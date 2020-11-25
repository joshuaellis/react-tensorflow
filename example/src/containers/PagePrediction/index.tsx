import * as React from 'react'
import clsx from 'clsx'
import Prism from 'prismjs'
import * as tf from '@tensorflow/tfjs'
import { Paper, Typography, makeStyles } from '@material-ui/core'
import { useWebcam, usePrediction } from 'react-tensorflow'

import { predictionExample } from 'references/codeExamples'
import { IMAGENET_CLASSES } from 'references/mobilenetHocClasses'

import classify, { ClassifyReturn } from 'helpers/classify'

export default function PageClassifier () {
  const classes = useStyles()
  const [classification, setClassification] = React.useState<
    ClassifyReturn | null
  >(null)

  React.useEffect(() => {
    Prism.highlightAll()
  }, [])

  const [videoRef, webcamTensor] = useWebcam({ width: 192, height: 192 })
  const [dataRef, prediction] = usePrediction({
    modelUrl:
      'https://tfhub.dev/google/tfjs-model/imagenet/mobilenet_v2_050_192/classification/3/default/1'
  })

  React.useEffect(() => {
    if (webcamTensor instanceof tf.Tensor) {
      dataRef.current = webcamTensor.clone()
    }
  }, [webcamTensor])

  React.useEffect(() => {
    if (prediction) {
      const classifiedResult = classify(
        prediction as tf.Tensor2D,
        1,
        IMAGENET_CLASSES
      )
      setClassification(classifiedResult)
    }
  }, [prediction])

  return (
    <main className={classes.root}>
      <article className={classes.regBp}>
        <header>
          <Typography color='textPrimary' component='h2' variant='h5'>
            usePrediction & useWebcam example
          </Typography>
        </header>
        <section className={classes.section}>
          <Typography color='textPrimary' component='p' variant='body1'>
            This example uses the useWecam hook to create tensors from the
            user's camera, when this is returned we can pass it to usePrediction
            hook that is currently running the mobilenet{' '}
            <code>mobilenet_v2_050_192</code> model from <code>tfhub</code>.
          </Typography>
        </section>
        <section className={classes.section}>
          <Typography
            className={classes.sectionHead}
            color='textPrimary'
            component='h3'
            variant='h6'
          >
            Actual example
          </Typography>
          <video
            className={classes.video}
            ref={videoRef}
            width={560}
            height={420}
          />
          <Paper className={classes.prediction} elevation={0}>
            {classification ? (
              <>
                <Typography color='textPrimary' component='p' variant='body1'>
                  Prediction: {classification[0].className}
                </Typography>
                <Typography color='textPrimary' component='p' variant='body1'>
                  Probability: {Math.floor(classification[0].probability * 100)}
                  %
                </Typography>
              </>
            ) : (
              'no prediction'
            )}
          </Paper>
        </section>
        <section className={classes.section}>
          <Typography
            className={classes.sectionHead}
            color='textPrimary'
            component='h3'
            variant='h6'
          >
            Code example
          </Typography>
          <Typography
            className={classes.sectionHead}
            color='textPrimary'
            component='p'
            variant='body1'
          >
            Due to memory disposal in <code>@tensorflow/tfjs</code> when setting
            the <code>dataRef</code> provided by <code>usePrediction</code> you
            should use the <code>.clone()</code> method on the tensor
          </Typography>
          <Paper className={classes.codeExample}>
            <pre>
              <code className='lang-jsx'>{predictionExample}</code>
            </pre>
          </Paper>
        </section>
      </article>
    </main>
  )
}

const useStyles = makeStyles(() => ({
  root: {
    padding: '2.4rem 4rem'
  },
  largeBp: {
    maxWidth: '1200px',
    margin: '0 auto'
  },
  regBp: {
    maxWidth: '800px',
    margin: '0 auto'
  },
  section: {
    margin: '1.6rem auto'
  },
  exampleImage: {
    width: '100%'
  },
  codeExample: {
    overflow: 'hidden',
    '& pre': {
      margin: 0,
      height: '100%'
    }
  },
  prediction: {
    padding: '8px 12px'
  },
  sectionHead: {
    marginBottom: '12px'
  },
  video: {
    width: '100%',
    margin: '0 auto'
  }
}))
