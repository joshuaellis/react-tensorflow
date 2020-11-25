import * as React from 'react'
import clsx from 'clsx'
import { Paper, Typography, makeStyles } from '@material-ui/core'
import { withModel, ModelInterface } from 'react-tensorflow'
import Prism from 'prismjs'
import * as tf from '@tensorflow/tfjs'

import { IMAGENET_CLASSES } from 'references/mobilenetHocClasses'
import { hocExample } from 'references/codeExamples'

import getTensorFromImg from 'helpers/getTensorFromImg'
import classify, { ClassifyReturn } from 'helpers/classify'

export function PageClassifier ({ model }: { model: ModelInterface }) {
  const classes = useStyles()

  const imgRef = React.useRef<HTMLImageElement>(null!)

  const [imgLoaded, setImgLoad] = React.useState<boolean>(false)
  const [prediction, setPrediction] = React.useState<ClassifyReturn | null>(
    null
  )

  const handleImgLoad = () => setImgLoad(true)

  React.useEffect(() => {
    Prism.highlightAll()
  }, [])

  React.useEffect(() => {
    const { current: img } = imgRef

    const getClassifications = async () => {
      const tensor = getTensorFromImg(img)
      const result = (await model?.predict(tensor)) as tf.Tensor2D
      const prediction = classify(result, 1, IMAGENET_CLASSES)

      tensor.dispose()
      result.dispose()

      return prediction
    }

    if (model && img && img.width > 0 && img.height > 0) {
      Promise.resolve(getClassifications()).then(res =>
        requestAnimationFrame(() => setPrediction(res))
      )
    }
  }, [model, imgLoaded])

  return (
    <main className={classes.root}>
      <article className={classes.regBp}>
        <header>
          <Typography color='textPrimary' component='h2' variant='h5'>
            withModel HOC example
          </Typography>
        </header>
        <section className={classes.section}>
          <Typography color='textPrimary' component='p' variant='body1'>
            This example uses the withModel higher-order component, this
            requires the use of the <code>ModelProvider</code> component to be
            used. The model is <code>mobilenet_v2_140_224</code> model from{' '}
            <code>tfhub</code>.
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
            {prediction ? (
              <>
                <Typography color='textPrimary' component='p' variant='body1'>
                  Prediction: {prediction[0].className}
                </Typography>
                <Typography color='textPrimary' component='p' variant='body1'>
                  Probability: {Math.floor(prediction[0].probability * 100)}%
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
          <Paper className={classes.codeExample}>
            <pre>
              <code className='lang-jsx'>{hocExample}</code>
            </pre>
          </Paper>
        </section>
      </article>
    </main>
  )
}

export default withModel(PageClassifier)

const useStyles = makeStyles(theme => ({
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
  }
}))
