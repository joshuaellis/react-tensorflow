import * as React from 'react'
import { Typography, makeStyles } from '@material-ui/core'

export default function PageHome () {
  const classes = useStyles()

  return (
    <main className={classes.root}>
      <article className={classes.article}>
        <header>
          <Typography color='textPrimary' component='h2' variant='h5'>
            Welcome to the react-tensorflow example app
          </Typography>
        </header>
        {sections.map(sec => (
          <section className={classes.section} key={sec.title}>
            <Typography
              color='textPrimary'
              component='h3'
              variant='h6'
              className={classes.sectionTitle}
            >
              {sec.title}
            </Typography>
            <Typography color='textPrimary' component='p' variant='body1'>
              {sec.body}
            </Typography>
            {sec.list && (
              <ul>
                {sec.list?.map(item => (
                  <Typography
                    key={item}
                    className={classes.sectionListItem}
                    color='textPrimary'
                    component='li'
                    variant='body2'
                  >
                    {item}
                  </Typography>
                ))}
              </ul>
            )}
          </section>
        ))}
      </article>
    </main>
  )
}

const useStyles = makeStyles(() => ({
  root: {
    padding: '2.4rem 4rem'
  },
  article: {
    maxWidth: '800px',
    margin: '0 auto'
  },
  section: {
    margin: '1.6rem 0'
  },
  sectionTitle: {
    marginBottom: '0.6rem'
  },
  sectionListItem: {
    marginBottom: '0.4rem'
  }
}))

const sections = [
  {
    title: 'What is react-tensorflow?',
    body:
      "Put simply, it's a library of react hooks to help use tensorflow models in react. But there is a HOC included incase you need it!"
  },
  {
    title: 'So whats this app got?',
    body:
      "This app is contains samples of the hooks being used, it includes the code examples as well incase they're useful too. Currently we have the following hook examples:",
    list: ['Higher-order Component', 'useClassified (with useWebcam)']
  }
]
