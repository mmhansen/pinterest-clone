import axios from 'axios'
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR
} from './types'

export function facebookLogin () {
  return dispatch => {
      return axios.get('/api/facebook')
        .then((res) => {
          console.log(res)
        })
  }
}

export function twitterLogin () {

}

export function loginUser () {

}

export function logout () {

}

export function registerUser () {

}
