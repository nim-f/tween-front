import {
  all,
  put,
  takeEvery,
  call,
  select,
} from 'redux-saga/effects'

import { appName, BASE_URL } from '../config'
import { fetchInstance } from '../helpers/fetch';
import { sagaErrorHandler } from '../helpers/error'

import { GET_CURRENT_USER, LOGIN, LOGOUT, tokenSelector } from './login';
import {generateActions} from '../helpers/actions';
import cookie from 'react-cookies';
import { arrayToObj, objToArray } from '../helpers/normalize';


export const moduleName = 'user'
const prefix = `${appName}/${moduleName}`

const userListUrl = (q) => {
  let url = `${BASE_URL}/users`
  if (q) url += `?q=${encodeURIComponent(q)}`
  return url
}

export const GET_USERS = generateActions(prefix, 'GET_USERS')
export const SEARCH_USERS = generateActions(prefix, 'SEARCH_USERS')

/**
 * Action Creators
 * */
export const getUsersAction = (q) => ({
  type: GET_USERS.REQUEST,
  payload: {q}
})

/**
 * Reducer
 * */

const defaultState = {
  users: {},
  filteredUsers: {},
  errors: null,
  loading: false,
}

export default function reducer(state = defaultState, action) {
  const { type, payload } = action
  switch (type) {
    case GET_USERS.REQUEST:
      return {...state, loading: true}
    case GET_USERS.SUCCESS:
      return {...state, loading: false, users: arrayToObj(payload)}
    case SEARCH_USERS.SUCCESS:
      return {...state, loading: false, filteredUsers: arrayToObj(payload)}
    case GET_USERS.ERROR:
      return {...state, loading: false}

    default:
      return {...state}
  }
}

/**
 * Selectors
 * */
export const filteredSelector = (state) => objToArray(state[moduleName].filteredUsers)
export const userListSelector = (state) => objToArray(state[moduleName].users)
export const userMapSelector = (state) => state[moduleName].users

/**
 * Requests
 * */

const usersRequest = (token, q) => {
  return fetchInstance.get(
    userListUrl(q),
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
}

/**
 * Saga
 * */
export function* usersListSaga({ payload }) {
  try {
    const token = yield select(tokenSelector)
    const userList = yield call(usersRequest, token, payload.q)

    if (payload.q) {
      yield put({
        type: SEARCH_USERS.SUCCESS,
        payload: userList
      })
    } else {
      yield put({
        type: GET_USERS.SUCCESS,
        payload: userList
      })
    }

  } catch (err) {
    yield sagaErrorHandler({ type: GET_USERS.ERROR, payload: err })
  }
}


export function* saga() {
  yield all([
    takeEvery(GET_USERS.REQUEST, usersListSaga)
  ])
}
