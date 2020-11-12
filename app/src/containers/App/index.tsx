import * as React from 'react'
import { Switch, Route, Redirect } from 'react-router'
import { makeStyles } from '@material-ui/core/styles'

import PageHome from 'containers/PageHome'
import PageHOC from 'containers/PageHOC'

import { SiteDrawer, SiteHeader } from 'components/Site'
import { ListMainNavigation } from 'components/Lists'

export default function App () {
  const classes = useStyles()

  const [open, setOpen] = React.useState<boolean>(true)

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
          <Route exact path='/hoc-example' component={PageHOC} />
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
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto'
  }
}))
