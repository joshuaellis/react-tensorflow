import * as React from 'react'
import clsx from 'clsx'
import { Paper, Typography, makeStyles } from '@material-ui/core'
import { withModel, ModelInterface } from 'react-tensorflow'
import Prism from 'prismjs'

import { hocExample } from 'references/codeExamples'

export function PageClassifier ({ model }: { model: ModelInterface }) {
  const classes = useStyles()

  React.useEffect(() => {
    Prism.highlightAll()
  }, [])

  return (
    <main className={classes.root}>
      <article className={classes.largeBp}>
        <header className={classes.regBp}>
          <Typography color='textPrimary' component='h2' variant='h5'>
            withModel HOC example
          </Typography>
        </header>
        <section className={clsx(classes.regBp, classes.section)}>
          <Typography color='textPrimary' component='p' variant='body1'>
            This example uses the withModel higher-order component, this
            requires the use of the <code>ModelProvider</code> component to be
            used.
          </Typography>
        </section>
        <section className={clsx(classes.section, classes.example)}>
          <div>
            <Paper elevation={0}>{}</Paper>
          </div>
          <Paper>
            <pre>
              <code className='language-javascript'>{hocExample}</code>
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
    margin: '1.6rem 0'
  },
  example: {
    display: 'flex'
  }
}))
