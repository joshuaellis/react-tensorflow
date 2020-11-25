import * as React from 'react'
import { Switch, Route, Redirect } from 'react-router'
import { makeStyles } from '@material-ui/core/styles'

import PageHome from 'containers/PageHome'
import PageHOC from 'containers/PageHOC'
import PagePrediction from 'containers/PagePrediction'

import { SiteDrawer, SiteHeader } from 'components/Site'
import { ListMainNavigation } from 'components/Lists'

export default function App () {
  const classes = useStyles()

  const [open, setOpen] = React.useState<boolean>(false)

  const handleDrawOpening = () => setOpen(!open)

  return (
    <div className={classes.root}>
      <SiteHeader onToolbarButtonClick={handleDrawOpening} open={open} />
      <SiteDrawer
        onDrawCloseClick={handleDrawOpening}
        open={open}
        menus={[
          {
            title: 'main-nav',
            items: <ListMainNavigation />
          }
        ]}
      />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Switch>
          <Route exact path='/' component={PageHome} />
          <Route exact path='/hoc' component={PageHOC} />
          <Route exact path='/predictor' component={PagePrediction} />
          <Route component={() => <Redirect to='/' />} />
        </Switch>
      </main>
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    backgroundColor: '#212121',
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto'
  }
}))
