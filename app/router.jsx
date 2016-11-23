import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
// pages
import Container from './container'
//import NotFoundPage from './components/NotFoundPage'
import Login from './components/LoginPage'
import HomePage from './components/HomePage'

export default function () {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={Container}>
        <IndexRoute component={HomePage} />
        <Route path="/login" component={Login} />
      </Route>
    </Router>
  )
}
