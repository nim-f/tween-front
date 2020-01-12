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
import { normalize, schema } from 'normalizr';
import {generateActions} from '../helpers/actions';
import cookie from 'react-cookies';

const user = new schema.Entity('user');
const userListSchema = [user];

export const moduleName = 'user'
const prefix = `${appName}/${moduleName}`

const userListUrl = (q) => {
  let url = `${BASE_URL}/users`
  if (q) url += `?q=${encodeURIComponent(q)}`
  return url
}

export const GET_USERS = generateActions(prefix, 'GET_USERS')

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
  usersList: {},
  errors: null,
  loading: false,
}

export default function reducer(state = defaultState, action) {
  const { type, payload } = action
  switch (type) {
    case GET_USERS.REQUEST:
      return {...state, loading: true}
    case GET_USERS.SUCCESS:
      return {...state, loading: false, usersList: normalize(payload, userListSchema)}
    case GET_USERS.ERROR:
      return {...state, loading: false}

    default:
      return {...state}
  }
}

/**
 * Selectors
 * */
export const usersSelector = (state) => state[moduleName].usersList.result ?  state[moduleName].usersList.result.map(id => state[moduleName].usersList.entities.user[id]) : []

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
    yield put({
      type: GET_USERS.SUCCESS,
      payload: userList
    })
  } catch (err) {
    yield sagaErrorHandler({ type: GET_USERS.ERROR, payload: err })
  }
}


export function* saga() {
  yield all([
    takeEvery(GET_USERS.REQUEST, usersListSaga)
  ])
}
