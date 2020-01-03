import {
  all,
  put,
  takeEvery,
  call,
  select,
} from 'redux-saga/effects'
import { push } from 'connected-react-router'
import cookie from 'react-cookies'
import { appName, BASE_URL } from '../config'
import { fetchInstance } from '../helpers/fetch';
import { sagaErrorHandler } from '../helpers/error';
import {generateActions} from '../helpers/actions';

export const moduleName = 'login'
const prefix = `${appName}/${moduleName}`

const loginUrl = `${BASE_URL}/login/`
const currentUserUrl = `${BASE_URL}/users/current/`

export const LOGIN = generateActions(prefix, 'LOGIN')
export const LOGOUT = generateActions(prefix, 'LOGOUT')
export const GET_CURRENT_USER = generateActions(prefix, 'GET_CURRENT_USER')

/**
 * Action Creators
 * */

export const loginAction = (email, password) => ({
  type: LOGIN.REQUEST,
  payload: {email, password}
})
export const logOutAction = () => ({
  type: LOGOUT.REQUEST,
})

export const currentUserAction = () => ({
  type: GET_CURRENT_USER.REQUEST,
})

/**
 * Reducer
 * */

const defaultState = {
  token: cookie.load('access') || null,
  user: null,
  errors: null,
  loading: false,
}


export default function reducer(state = defaultState, action) {
  const { type, payload } = action
  switch (type) {
    case GET_CURRENT_USER.REQUEST:
    case LOGIN.REQUEST:
      return { ...state, loading: true }
    case GET_CURRENT_USER.SUCCESS:
    case LOGIN.SUCCESS:
      const { token, ...rest } = payload
      return { ...state, loading: false, token, user: rest }
    case GET_CURRENT_USER.ERROR:
    case LOGIN.ERROR:
      return { ...state, loading: false, error: payload.error }
    default:
      return state
    case LOGOUT.REQUEST:
      return {...defaultState, token: null }
  }
}
/**
 * Selectors
 * */

export const tokenSelector = (state) => state[moduleName].token
export const errorsSelector = (state) => state[moduleName].errors
export const userSelector = (state) => state[moduleName].user

/**
 * Requests
 * */
export const logInRequest = (email, password) => {
  return fetchInstance.post(
    loginUrl,
    {
      email,
      password
    },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
}
export const currentUserRequest = (token) => {
  return fetchInstance.get(
    currentUserUrl,
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${token}`
      }
    }
  )
}

/**
 * Saga
 * */
export function* loginSaga({ payload }) {
  try {
    const login = yield call(logInRequest, payload.email, payload.password)
    console.log({login})
    cookie.save('access', login.token, { path: '/' })
    yield put({
      type: LOGIN.SUCCESS,
      payload: login
    })
    yield put(push('/'))

  } catch (err) {
    yield sagaErrorHandler({ type: LOGIN.ERROR, payload: err })
  }
}
export function* currentUserSaga({ payload }) {
  try {
    const token = yield select(tokenSelector)
    const currentUser = yield call(currentUserRequest, token)
    console.log({currentUser})
    yield put({
      type: GET_CURRENT_USER.SUCCESS,
      payload: currentUser
    })

  } catch (err) {
    if (err.error.detail === 'invalid signature') {
      yield put({type: LOGOUT.REQUEST})
    }
    yield sagaErrorHandler({ type: GET_CURRENT_USER.ERROR, payload: err })
  }
}

export function* logoutSaga() {
  try {
    yield cookie.remove('access', { path: '/' })
    yield put(push('/login'))
  } catch (err) {
    console.error(error)
  }
}

export function* saga() {
  yield all([
    takeEvery(LOGIN.REQUEST, loginSaga),
    takeEvery(LOGOUT.REQUEST, logoutSaga),
    takeEvery(GET_CURRENT_USER.REQUEST, currentUserSaga),
  ])
}
