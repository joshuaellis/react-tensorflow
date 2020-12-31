import * as React from 'react'
import * as tf from '@tensorflow/tfjs'
import Prism from 'prismjs'
import { Paper, Typography, makeStyles } from '@material-ui/core'
import { ModelInterface, useObjectDetect, ObjectDetectClassified } from 'react-tensorflow'

import { objectsExample } from 'references/codeExamples'
import { COCO_SSD_CLASSES } from 'references/cocossdClasses'

import getTensorFromImg from 'helpers/getTensorFromImg'

import BoundingBox from 'components/BoundingBox'

export default function PageObjects () {
  const classes = useStyles()

  const imgRef = React.useRef<HTMLImageElement>(null)
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
    useExecute: true,
    width: imgRef.current?.width ?? 0,
    height: imgRef.current?.height ?? 0,
    classes: COCO_SSD_CLASSES
  })

  React.useEffect(() => {
    if (imgLoaded) {
      const { current: img } = imgRef
      if(img){
        const tensor = getTensorFromImg(img).cast('int32')
        if (tensor) {
          setData(tensor)
        }
      }
    }
  }, [imgLoaded])

  console.log(objects)

  return (
    <main className={classes.root}>
      <article className={classes.regBp}>
        <header>
          <Typography color='textPrimary' component='h2' variant='h5'>
            useObjectDetect example
          </Typography>
        </header>
        <section className={classes.section}>
          <Typography color='textPrimary' component='p' variant='body1'>
            This example uses useObjectDetect hook to analyze an image 
            and return the class, probability and bounding box of the 
            objects. The useObjectDetect hook is currently running the 
            cocossd{' '}<code>mobilenet_v2</code> model from <code>tfhub</code>.
            For this model, we provide a warmup function by using the{' '} 
            <code>onLoadCallback</code> argument.
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
          <div style={{position:'relative'}}>
            <img
              onLoad={handleImgLoad}
              className={classes.exampleImage}
              ref={imgRef}
              src={'/public/images/object-room.webp'}
              />
              {objects ? objects.map((object: ObjectDetectClassified) => <BoundingBox box={object.boundingBox} label={object.class} probability={object.probability} />) : null}
          </div>
          <Paper className={classes.prediction} elevation={0}>
            {objects ? objects.map((object: ObjectDetectClassified) => (
              <React.Fragment key={object.class}>
                <Typography color='textPrimary' component='p' variant='body1'>
                  Prediction: {object.class}
                </Typography>
                <Typography color='textPrimary' component='p' variant='body1'>
                  Probability: {Math.floor(object.probability * 100)}
                  %
                </Typography>
              </React.Fragment>
            )) : (
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
          </Typography>
          <Paper className={classes.codeExample}>
            <pre>
              <code className='lang-jsx'>{objectsExample}</code>
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
