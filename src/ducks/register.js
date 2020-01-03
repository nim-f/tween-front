import {
  all,
  put,
  takeEvery,
  call,
  select,
} from 'redux-saga/effects'
import { push } from 'connected-react-router'
import { appName, BASE_URL } from '../config'
import { sagaErrorHandler } from '../helpers/error'
import { fetchInstance } from '../helpers/fetch';

export const moduleName = 'register'
const prefix = `${appName}/${moduleName}`

const registerUrl = `${BASE_URL}/users/add/`

export const REGISTER_REQUEST = `${prefix}/REGISTER_REQUEST`
export const REGISTER_SUCCESS = `${prefix}/REGISTER_SUCCESS`
export const REGISTER_ERROR = `${prefix}/REGISTER_ERROR`

/**
 * Action Creators
 * */

export const registerAction = (user) => ({
  type: REGISTER_REQUEST,
  payload: {user}
})

/**
 * Reducer
 * */

const defaultState = {
  user: null,
  error: null,
  loading: false,
}

export default function reducer(state = defaultState, action) {
  const { type, payload } = action
  switch (type) {
    case REGISTER_REQUEST:
      return { ...state, loading: true, error: null }
    case REGISTER_SUCCESS:
      return { ...state, loading: false, error: null }
    case REGISTER_ERROR:
      return { ...state, loading: false, error: payload.error }
    default:
      return state
  }
}

/**
 * Selectors
 * */

export const errorSelector = state => state[moduleName].error

/**
 * Requests
 * */
export const registerRequest = (user) => {
  return fetchInstance.post(
    registerUrl,
    user,
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
export function* registerSaga({ payload }) {
  try {
    const reg = yield call(registerRequest, payload.user)
    yield put({
      type: REGISTER_SUCCESS,
      payload: reg.data
    })
    yield put(push('/login'))
  } catch (err) {
    yield sagaErrorHandler({ type: REGISTER_ERROR, payload: err })
  }
}

export function* saga() {
  yield all([
    takeEvery(REGISTER_REQUEST, registerSaga),
  ])
}
