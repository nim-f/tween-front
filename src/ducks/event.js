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
import { sagaErrorHandler } from '../helpers/error'
import { REGISTER_ERROR, REGISTER_REQUEST, REGISTER_SUCCESS, registerRequest } from './register';
import { tokenSelector } from './login';
import { normalize, schema } from 'normalizr';

const event = new schema.Entity('events');
const eventListSchema = [event];

export const moduleName = 'event'
const prefix = `${appName}/${moduleName}`

const eventListUrl = `${BASE_URL}/events`
const eventUrl = (id) => `${BASE_URL}/events/${id}`

export const EVENTS_LIST_REQUEST = `${prefix}/EVENTS_LIST_REQUEST`
export const EVENTS_LIST_SUCCESS = `${prefix}/EVENTS_LIST_SUCCESS`
export const EVENTS_LIST_ERROR = `${prefix}/EVENTS_LIST_ERROR`

export const SET_CURRENT_EVENT = `${prefix}/SET_CURRENT_EVENT`

export const SAVE_EVENT_REQUEST = `${prefix}/SAVE_EVENT_REQUEST`
export const SAVE_EVENT_SUCCESS = `${prefix}/SAVE_EVENT_SUCCESS`
export const SAVE_EVENT_ERROR = `${prefix}/SAVE_EVENT_ERROR`

export const CREATE_EVENT_REQUEST = `${prefix}/CREATE_EVENT_REQUEST`
export const CREATE_EVENT_SUCCESS = `${prefix}/CREATE_EVENT_SUCCESS`
export const CREATE_EVENT_ERROR = `${prefix}/CREATE_EVENT_ERROR`

export const GET_EVENT_REQUEST = `${prefix}/GET_EVENT_REQUEST`
export const GET_EVENT_SUCCESS = `${prefix}/GET_EVENT_SUCCESS`
export const GET_EVENT_ERROR = `${prefix}/GET_EVENT_ERROR`

/**
 * Action Creators
 * */

export const eventsListAction = () => ({
  type: EVENTS_LIST_REQUEST,
})

export const setCurrentEventAction = (id) => ({
  type: SET_CURRENT_EVENT,
  payload: id
})

export const createEventAction = (event) => ({
  type: CREATE_EVENT_REQUEST,
  payload: event,
})

export const getSingleEvent = id => ({
  type: GET_EVENT_REQUEST,
  payload: id
})

/**
 * Reducer
 * */

const defaultState = {
  events: {},
  result: [],
  currentId: null,
  errors: null,
  loading: false,
}

export default function reducer(state = defaultState, action) {
  const { type, payload } = action
  switch (type) {
    case CREATE_EVENT_REQUEST:
      return { ...state, loading: true, error: null }
    case CREATE_EVENT_SUCCESS:
      return { ...state, loading: false, events: {...state.events, [payload.id]: payload, result: [...state.result, payload.id]}}
    case EVENTS_LIST_REQUEST:
      return { ...state, loading: true, error: null }
    case EVENTS_LIST_SUCCESS:
      const {entities: { events }, result} = payload
      return { ...state, loading: false, error: null, events, result }
    case EVENTS_LIST_ERROR:
    case CREATE_EVENT_ERROR:
      return { ...state, loading: false, error: payload.error }
    case SET_CURRENT_EVENT:
      return {...state, currentId: payload}
    default:
      return state
  }
}
/**
 * Selectors
 * */

export const errorSelector = state => state[moduleName].error
export const eventsListSelector = state => state[moduleName].result
export const eventsSelector = state => state[moduleName].events
export const currentEventSelector = state => state[moduleName].currentId ? state[moduleName].events[state[moduleName].currentId] : null
export const singleEventSelector = (state, id) => state[moduleName].events[id]
/**
 * Requests
 * */
export const eventsListRequest = (token) => {
  return fetchInstance.get(
    eventListUrl,
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${token}`
      }
    }
  )
}

export const createEventRequest = (event, token) => {
  return fetchInstance.post(
    eventListUrl,
    event,
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${token}`
      }
    }
  )
}

export const getEventRequest = (id, token) => {
  return fetchInstance.get(
    eventUrl(id),
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
export function* eventsSaga({ payload }) {
  try {
    const token = yield select(tokenSelector)
    const reg = yield call(eventsListRequest, token)
    yield put({
      type: EVENTS_LIST_SUCCESS,
      payload: normalize(reg, eventListSchema),
    })
  } catch (err) {
    yield sagaErrorHandler({ type: EVENTS_LIST_ERROR, payload: err })
  }
}

export function* createEventSaga({ payload }) {
  try {
    const token = yield select(tokenSelector)
    const event = yield call(createEventRequest, payload, token)
    yield put({
      type: CREATE_EVENT_SUCCESS,
      payload: event,
    })
  } catch (err) {
    yield sagaErrorHandler({ type: CREATE_EVENT_ERROR, payload: err })
  }
}


export function* getEventSaga({ payload }) {
  try {
    const token = yield select(tokenSelector)
    const event = yield call(getEventRequest, payload, token)
    yield put({
      type: GET_EVENT_SUCCESS,
      payload: event,
    })
  } catch (err) {
    yield sagaErrorHandler({ type: GET_EVENT_ERROR, payload: err })
  }
}

export function* saga() {
  yield all([
    takeEvery(EVENTS_LIST_REQUEST, eventsSaga),
    takeEvery(CREATE_EVENT_REQUEST, createEventSaga),
    takeEvery(GET_EVENT_REQUEST, getEventSaga),
  ])
}
