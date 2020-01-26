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
import {generateActions} from '../helpers/actions';
import { arrayToObj, objToArray } from '../helpers/normalize';
import { tokenSelector } from './login';

export const moduleName = 'attendee'
const prefix = `${appName}/${moduleName}`

const attendeeUrl = (eventId) => `${BASE_URL}/attendees?event=${eventId}`

const ADD_ATTENDEE = generateActions(prefix, 'ADD_ATTENDEE')
const GET_LIST = generateActions(prefix, 'GET_LIST')

/**
 * Action Creators
 * */
export const addAttendeeAction = (attendee) => ({
  type: ADD_ATTENDEE.REQUEST,
  payload: attendee
})

export const getListActions = (eventId) => ({
  type: GET_LIST.REQUEST,
  payload: eventId
})

/**
 * Reducer
 * */

const defaultState = {
  attendees: {},
  errors: null,
  loading: false,
}

export default function reducer(state = defaultState, action) {
  const { type, payload } = action
  switch (type) {
    case GET_LIST.REQUEST:
      return {...state, loading: true}
    case ADD_ATTENDEE.REQUEST:
      return {...state, loading: true}
    case GET_LIST.SUCCESS:
      return {...state, loading: false, attendees: payload}
    case ADD_ATTENDEE.SUCCESS:
      return {...state, loading: false, attendees: {...state.attendees}}
    case ADD_ATTENDEE.ERROR:
    case GET_LIST.ERROR:
      return {...state, loading: false}

    default:
      return {...state}
  }
}

/**
 * Selectors
 * */

export const attendeeListSelector = state => {
  return objToArray(state[moduleName].attendees)
}
/**
 * Requests
 * */
const attendeeRequest = (token, attendee) => {
  return fetchInstance.post(
    attendeeUrl,
    attendee,
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${token}`
      }
    }
  )
}

const getListRequest = (token, eventId) => {
  return fetchInstance.get(
    attendeeUrl(eventId),
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

export function* addAttendeeSaga ({payload}) {
  try {
    const token = yield select(tokenSelector)
    const attendee = yield call(attendeeRequest, token, payload)

    yield put({
      type: ADD_ATTENDEE.SUCCESS,
      payload: attendee
    })
  } catch(err) {

  }
}
export function* getListSaga ({payload}) {
  try {
    const token = yield select(tokenSelector)
    const attendee = yield call(getListRequest, token, payload)

    yield put({
      type: GET_LIST.SUCCESS,
      payload: attendee
    })
  } catch(err) {

  }
}

export function* saga() {
  yield all([
    takeEvery(ADD_ATTENDEE.REQUEST, addAttendeeSaga),
    takeEvery(GET_LIST.REQUEST, getListSaga)
  ])
}
