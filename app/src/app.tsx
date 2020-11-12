import '@babel/polyfill'

import * as React from 'react'
import ReactDOM from 'react-dom'
import { ConnectedRouter } from 'connected-react-router'
import { Provider } from 'react-redux'
import { enableES5 } from 'immer'

import history from 'helpers/history'

import App from 'containers/App'

import createStore from './configureStore'

enableES5()

const initialState = {}
const store = createStore(initialState, history)

const MOUNT_NODE = document.getElementById('app')

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
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
