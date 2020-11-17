import * as React from 'react'
import clsx from 'clsx'
import { Paper, Typography, makeStyles } from '@material-ui/core'
import { useWebcam, useModel } from 'react-tensorflow'
import Prism from 'prismjs'
// import * as mobilenet from '@tensorflow-models/mobilenet'

export default function PageClassifier () {
  const classes = useStyles()

  React.useEffect(() => {
    Prism.highlightAll()
  }, [])

  //   const model = useModel({ model: mobilenet })
  const [videoRef] = useWebcam({ width: 299, height: 299 })

  return (
    <main className={classes.root}>
      <article className={classes.largeBp}>
        <header className={classes.regBp}>
          <Typography color='textPrimary' component='h2' variant='h5'>
            useClassifier & useWebcam example
          </Typography>
        </header>
        <section className={clsx(classes.regBp, classes.section)}>
          <Typography color='textPrimary' component='p' variant='body1'>
            This example uses the useWecam hook to create tensors from the
            user's camera, when this is returned we can pass it to useClassifier
            hook that is currently running the mobilenet model from{' '}
            <code>@tensorflow-models/mobilenet</code>
          </Typography>
        </section>
        <section className={clsx(classes.section, classes.example)}>
          <div>
            <video ref={videoRef} width={560} height={420} />
            <Paper elevation={0}>This is where a prediction would go</Paper>
          </div>
          <Paper>
            <pre>
              <code className='language-javascript'>{`
                import * as React from 'react'
                import { useClassifier, useWebcam} from 'react-tensorflow'

                export default Classifier () {
                  const [ videoRef, webcamTensor ] = useWebcam({ height: 244, width: 244 })
                  
                  return null
                }
              `}</code>
            </pre>
          </Paper>
        </section>
      </article>
    </main>
  )
}

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
    margin: '1.6rem 0'
  },
  example: {
    display: 'flex'
  }
}))
