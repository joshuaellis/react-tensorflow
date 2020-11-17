/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import history from 'helpers/history'

const rootReducer = combineReducers({
  router: connectRouter(history)
})

export default rootReducer

export type RootState = ReturnType<typeof rootReducer>
