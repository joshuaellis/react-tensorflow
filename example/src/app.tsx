import '@babel/polyfill'

import * as React from 'react'
import ReactDOM from 'react-dom'
import { ConnectedRouter } from 'connected-react-router'
import { Provider } from 'react-redux'
import { enableES5 } from 'immer'
import { ModelProvider } from 'react-tensorflow'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'

import history from 'helpers/history'

import App from 'containers/App'

import 'references/styles/prism.css'

import createStore from './configureStore'

enableES5()

const initialState = {}
const store = createStore(initialState, history)

const MOUNT_NODE = document.getElementById('app')

const theme = createMuiTheme({
  palette: {
    type: 'dark'
  }
})

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ModelProvider url='https://tfhub.dev/google/tfjs-model/imagenet/mobilenet_v2_140_224/feature_vector/2/default/1'>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </ModelProvider>
      </ConnectedRouter>
    </Provider>,
    MOUNT_NODE
  )
}

if (module.hot) {
  module.hot.accept(['containers/App'], () => {
    render()
  })
}

render()
