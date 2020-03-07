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
const attendeeFieldUrl = `${BASE_URL}/attendees/field`
const fieldsUrl = (eventId) => `${BASE_URL}/attendees/field?event=${eventId}`
const addAttendeeUrl = id => `${BASE_URL}/attendees/${id}`

const ADD_ATTENDEE = generateActions(prefix, 'ADD_ATTENDEE')
const ADD_ATTENDEE_FIELD = generateActions(prefix, 'ADD_ATTENDEE_FIELD')
const GET_LIST = generateActions(prefix, 'GET_LIST')
const GET_FIELDS = generateActions(prefix, 'GET_FIELDS')
const EDIT_ATTENDEE = generateActions(prefix, 'EDIT_ATTENDEE')
/**
 * Action Creators
 * */
export const addAttendeeAction = (attendee) => ({
  type: ADD_ATTENDEE.REQUEST,
  payload: attendee
})

export const editAttendeeAction = (id, attendee, callback) => ({
  type: EDIT_ATTENDEE.REQUEST,
  payload: {id, attendee, callback}
})

export const getListAction = (eventId) => ({
  type: GET_LIST.REQUEST,
  payload: eventId
})

export const getFieldsAction = (eventId) => ({
  type: GET_FIELDS.REQUEST,
  payload: eventId
})

export const addAttendeeFieldAction = (eventId, field, resolve, reject) => ({
  type: ADD_ATTENDEE_FIELD.REQUEST,
  payload: {eventId, field, resolve, reject}
})

/**
 * Reducer
 * */

const defaultState = {
  attendees: {},
  fields: [],
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
    case ADD_ATTENDEE_FIELD.REQUEST:
      return {...state, loading: true}
    case ADD_ATTENDEE_FIELD.SUCCESS:
      return {...state, loading: false, fields: [...state.fields, payload]}
    case EDIT_ATTENDEE.SUCCESS:
      return {
        ...state,
        attendees: {
          ...state.attendees,
          [payload.id]: {
            ...state.attendees[payload.id],
            ...payload.attendee
          }
        }
      }
    case GET_FIELDS.REQUEST:
      return {...state, loading: true}
    case GET_FIELDS.SUCCESS:
      return {...state, loading: false, fields: payload}
    case ADD_ATTENDEE.ERROR:
    case GET_LIST.ERROR:
    case ADD_ATTENDEE_FIELD.ERROR:
    case GET_FIELDS.ERROR:
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
export const fieldsSelector = state => state[moduleName].fields

/**
 * Requests
 * */
const attendeeRequest = (token, attendee) => {
  return fetchInstance.post(
    attendeeUrl(event),
    attendee,
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${token}`
      }
    }
  )
}

const editAttendeeRequest = (token, id, attendee) =>
  fetchInstance.post(
    addAttendeeUrl(id),
    attendee,
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${token}`
      }
    }
  )

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
const getFieldsRequest = (token, eventId) => {
  return fetchInstance.get(
    fieldsUrl(eventId),
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${token}`
      }
    }
  )
}

const addFieldRequest = (token, eventId, field) => {
  return fetchInstance.post(
    attendeeFieldUrl,
    {event_id: eventId, ...field},
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
export function* editAttendeeSaga ({payload}) {
  try {
    const token = yield select(tokenSelector)
    const attendee = yield call(editAttendeeRequest, token, payload.id, payload.attendee)
    payload.callback()
    yield put({
      type: EDIT_ATTENDEE.SUCCESS,
      payload: {id: payload.id, attendee }
    })
  } catch(err) {
    console.error(err)
    payload.callback(false)
  }
}
export function* addFieldSaga ({payload}) {
  try {
    const token = yield select(tokenSelector)
    const field = yield call(addFieldRequest, token, payload.eventId, payload.field)

    yield put({
      type: ADD_ATTENDEE_FIELD.SUCCESS,
      payload: field
    })
    payload.resolve()
  } catch(err) {
    payload.reject()

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
export function* getFieldsSaga ({payload}) {
  try {
    const token = yield select(tokenSelector)
    const fields = yield call(getFieldsRequest, token, payload)

    yield put({
      type: GET_FIELDS.SUCCESS,
      payload: fields
    })
  } catch(err) {

  }
}

export function* saga() {
  yield all([
    takeEvery(ADD_ATTENDEE.REQUEST, addAttendeeSaga),
    takeEvery(EDIT_ATTENDEE.REQUEST, editAttendeeSaga),
    takeEvery(ADD_ATTENDEE_FIELD.REQUEST, addFieldSaga),
    takeEvery(GET_LIST.REQUEST, getListSaga),
    takeEvery(GET_FIELDS.REQUEST, getFieldsSaga)
  ])
}
