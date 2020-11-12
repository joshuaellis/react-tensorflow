import * as React from 'react'
import { Typography, makeStyles } from '@material-ui/core'

export default function PageHOC () {
  const classes = useStyles()
  return (
    <main className={classes.root}>
      <Typography component='h2' variant='h5'>
        This page uses the withModel HOC with a local model served by express
      </Typography>
    </main>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    padding: '2.4rem 4rem'
  }
}))
