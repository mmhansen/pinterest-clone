import axios from 'axios'

import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR
} from './types'

export function facebookLogin () {

}

export function twitterLogin () {
  return dispatch => {
    return axios.get('/api/twitter')
      .then(res => {
        console.log(res)
      })
  }
}

export function loginUser () {

}

export function logout () {

}

export function registerUser () {

}
