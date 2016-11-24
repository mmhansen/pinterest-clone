import React from 'react'
import { connect } from 'react-redux'

import * as authenticationActions from '../actions/authenticationActions'

const LoginPage = function ({ facebookLogin, twitterLogin }) {
    return (
      <div>
        <button onClick={() => { twitterLogin() }}>Login with Twitter</button>
        {/* <button onClick={() => { facebookLogin() }}>Login with Facebook</button> */}
        <a href="/api/facebook">Login with Facebook</a>
        <div>
          <h3>Login</h3>
        </div>
      </div>
    )
}



export default connect(null, authenticationActions)(LoginPage)
