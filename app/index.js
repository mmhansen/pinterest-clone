import React from 'react'
import { render } from 'react-dom'
import Routes from './router'
// redux
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import { Provider } from 'react-redux'

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
)

render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('app')
)
