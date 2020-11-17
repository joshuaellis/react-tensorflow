import * as React from 'react'
import clsx from 'clsx'
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  makeStyles
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'

type Props = {
  open: boolean
  onToolbarButtonClick: {
    (e: React.SyntheticEvent): void
  }
}

export default function SiteHeader ({ open, onToolbarButtonClick }: Props) {
  const classes = useStyles()

  const handleToolbarButtonClick = (e: React.SyntheticEvent) => {
    if (onToolbarButtonClick) {
      onToolbarButtonClick(e)
    }
  }

  return (
    <AppBar
      position='absolute'
      className={clsx(classes.appBar, open && classes.appBarShift)}
    >
      <Toolbar className={classes.toolbar}>
        <div className={classes.appBarLeft}>
          <IconButton
            edge='start'
            color='inherit'
            aria-label='open drawer'
            onClick={handleToolbarButtonClick}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component='h1'
            variant='h6'
            color='inherit'
            noWrap
            className={classes.title}
          >
            React Tensorflow
          </Typography>
        </div>
      </Toolbar>
    </AppBar>
  )
}

const useStyles = makeStyles(theme => ({
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
    justifyContent: 'space-between'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: 240,
    width: `calc(100% - 240px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  appBarLeft: {
    display: 'flex',
    alignItems: 'center'
  },
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: 'none'
  },
  title: {
    flexGrow: 1
  },
  appBarSpacer: theme.mixins.toolbar
}))
