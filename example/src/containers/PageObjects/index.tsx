import * as React from 'react'
import * as tf from '@tensorflow/tfjs'
import Prism from 'prismjs'
import { Paper, Typography, makeStyles } from '@material-ui/core'
import { ModelInterface, useObjectDetect } from 'react-tensorflow'

import { objectsExample } from 'references/codeExamples'

import getTensorFromImg from 'helpers/getTensorFromImg'

export default function PageObjects () {
  const classes = useStyles()

  const imgRef = React.useRef<HTMLImageElement>(null!)
  const [imgLoaded, setImgLoad] = React.useState<boolean>(false)

  const handleImgLoad = () => setImgLoad(true)

  React.useEffect(() => {
    Prism.highlightAll()
  }, [])

  const onLoadCallback = React.useCallback(async (model: ModelInterface) => {
    if (model && model instanceof tf.GraphModel) {
      const zeroTensor = tf.zeros([1, 300, 300, 3], 'int32')
      const result = (await model.executeAsync(zeroTensor)) as tf.Tensor[]
      await Promise.all(result.map(t => t.data()))
      result.map(t => t.dispose())
      zeroTensor.dispose()
    }
  }, [])

  const [setData, objects] = useObjectDetect({
    modelUrl:
      'https://tfhub.dev/tensorflow/tfjs-model/ssd_mobilenet_v2/1/default/1',
    onLoadCallback,
    useExecute: true
  })

  React.useEffect(() => {
    if (imgLoaded) {
      const { current: img } = imgRef
      const tensor = getTensorFromImg(img).cast('int32')
      if (tensor) {
        console.log(tensor)
        setData(tensor)
      }
    }
  }, [imgLoaded])

  return (
    <main className={classes.root}>
      <article className={classes.regBp}>
        <header>
          <Typography color='textPrimary' component='h2' variant='h5'>
            useClassifier & useWebcam example
          </Typography>
        </header>
        <section className={classes.section}>
          <Typography color='textPrimary' component='p' variant='body1'>
            {/* This example uses the useWebcam hook to create tensors from the
            user's camera, when this is returned we can pass it to usePrediction
            hook that is currently running the mobilenet{' '}
            <code>mobilenet_v2_050_192</code> model from <code>tfhub</code>. */}
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
          <img
            onLoad={handleImgLoad}
            className={classes.exampleImage}
            ref={imgRef}
            src={'/public/images/hoc-honeybee.jpg'}
          />
          <Paper className={classes.prediction} elevation={0}>
            {/* {classification ? (
              <>
                <Typography color='textPrimary' component='p' variant='body1'>
                  Prediction: {classification[0].class}
                </Typography>
                <Typography color='textPrimary' component='p' variant='body1'>
                  Probability: {Math.floor(classification[0].probability * 100)}
                  %
                </Typography>
              </>
            ) : (
              'no prediction'
            )} */}
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
            {/* Due to memory disposal in <code>@tensorflow/tfjs</code> when setting
            the <code>dataRef</code> provided by <code>useClassifier</code> you
            should use the <code>.clone()</code> method on the tensor */}
          </Typography>
          <Paper className={classes.codeExample}>
            <pre>
              {/* <code className='lang-jsx'>{objectsExample}</code> */}
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
