import * as React from 'react'
import clsx from 'clsx'
import {
  Drawer,
  List,
  Divider,
  IconButton,
  makeStyles
} from '@material-ui/core'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'

type ChildrenArray = {
  title: string
  items: React.ReactElement<any>
}

type Props = {
  menus: ChildrenArray[]
  open: boolean
  onDrawCloseClick: {
    (e: React.SyntheticEvent): void
  }
}

export default function SiteDrawer ({ menus, open, onDrawCloseClick }: Props) {
  const classes = useStyles()

  const handleDrawCloseClick = (e: React.SyntheticEvent) => {
    if (onDrawCloseClick) {
      onDrawCloseClick(e)
    }
  }

  return (
    <Drawer
      variant='permanent'
      classes={{
        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
      }}
      open={open}
    >
      <div className={classes.toolbarIcon}>
        <IconButton onClick={handleDrawCloseClick}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      {menus.map(({ items, title }: ChildrenArray) => (
        <React.Fragment key={title}>
          <Divider className={classes.divider} />
          <List>{items}</List>
        </React.Fragment>
      ))}
    </Drawer>
  )
}

const useStyles = makeStyles(theme => ({
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  divider: {
    opacity: 0.12
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: 240,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9)
    }
  }
}))
