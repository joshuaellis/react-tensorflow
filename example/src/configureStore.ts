import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'connected-react-router'

import { History } from 'history'

import rootReducer from './reducers'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}

export default function configureStore (initialState = {}, history: History) {
  let composeEnhancers = compose

  // If Redux Dev Tools are installed, enable them
  if (process.env.NODE_ENV !== 'production' && typeof window === 'object') {
    if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    }
  }
  // add redux middlewares here
  const middlewares = [routerMiddleware(history)]

  const enhancers = [applyMiddleware(...middlewares)]

  return createStore(rootReducer, initialState, composeEnhancers(...enhancers))
}
