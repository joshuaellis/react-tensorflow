import React from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { Dispatch } from 'redux'

import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import { RootState } from 'src/reducers'

import {
  Home as HomeIcon,
  Input as InputIcon,
  Build as BuildIcon,
  Equalizer as EqualizerIcon,
  LinkedCamera as LinkedCameraIcon
} from '@material-ui/icons'

interface OwnProps {}

interface StateProps {
  pathname: string
}

interface DispatchProps {
  dispatchPushURL: { (href: string): void }
}

type Props = StateProps & DispatchProps & OwnProps

export function ListMainNavigation ({ pathname, dispatchPushURL }: Props) {
  const handleItemClick = (href: string) => {
    if (href && pathname !== href) {
      dispatchPushURL(href)
    }
  }

  return (
    <div>
      {items.map(({ title, icon, href }) => (
        <ListItem key={title} onClick={() => handleItemClick(href)} button>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={title} />
        </ListItem>
      ))}
    </div>
  )
}

const mapStateToProps = ({ router: { location } }: RootState) => ({
  pathname: location.pathname
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  dispatchPushURL: (location: string) => dispatch(push(location))
})

export default connect(mapStateToProps, mapDispatchToProps)(ListMainNavigation)

const items = [
  {
    title: 'TF Hub Model',
    icon: <HomeIcon />,
    href: '/'
  },
  {
    title: 'HOC with local model',
    icon: <BuildIcon />,
    href: '/hoc-example'
  }
]
