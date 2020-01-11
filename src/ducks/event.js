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
import {generateActions} from '../helpers/actions';

const event = new schema.Entity('events');
const eventListSchema = [event];

export const moduleName = 'event'
const prefix = `${appName}/${moduleName}`

const eventListUrl = `${BASE_URL}/events`
const eventUrl = (id) => `${BASE_URL}/events/${id}`

export const EVENTS_LIST = generateActions(prefix, 'EVENTS_LIST')
export const EDIT_EVENT = generateActions(prefix, 'EDIT_EVENT')
export const CREATE_EVENT = generateActions(prefix, 'CREATE_EVENT')
export const GET_EVENT = generateActions(prefix, 'GET_EVENT')

export const SET_CURRENT_EVENT = `${prefix}/SET_CURRENT_EVENT`

/**
 * Action Creators
 * */

export const eventsListAction = () => ({
  type: EVENTS_LIST.REQUEST,
})

export const setCurrentEventAction = (id) => ({
  type: SET_CURRENT_EVENT,
  payload: id
})

export const createEventAction = (event) => ({
  type: CREATE_EVENT.REQUEST,
  payload: event,
})

export const editEventAction = (event) => ({
  type: EDIT_EVENT.REQUEST,
  payload: event,
})

export const getSingleEvent = id => ({
  type: GET_EVENT.REQUEST,
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
    case CREATE_EVENT.REQUEST:
      return { ...state, loading: true, error: null }
    case CREATE_EVENT.SUCCESS:
      return { ...state, loading: false, events: {...state.events, [payload.id]: payload, result: [...state.result, payload.id]}}
    case EVENTS_LIST.REQUEST:
      return { ...state, loading: true, error: null }
    case EVENTS_LIST.SUCCESS:
      const {entities: { events }, result} = payload
      return { ...state, loading: false, error: null, events, result }
    case EVENTS_LIST.ERROR:
    case CREATE_EVENT.ERROR:
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
export const editEventRequest = (event, token) => {
  console.log({event})
  return fetchInstance.post(
    eventUrl(event.id),
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
      type: EVENTS_LIST.SUCCESS,
      payload: normalize(reg, eventListSchema),
    })
  } catch (err) {
    yield sagaErrorHandler({ type: EVENTS_LIST.ERROR, payload: err })
  }
}

export function* createEventSaga({ payload }) {
  try {
    const token = yield select(tokenSelector)
    const event = yield call(createEventRequest, payload, token)
    yield put({
      type: CREATE_EVENT.SUCCESS,
      payload: event,
    })
  } catch (err) {
    yield sagaErrorHandler({ type: CREATE_EVENT.ERROR, payload: err })
  }
}

export function* editEventSaga({ payload }) {
  try {
    const token = yield select(tokenSelector)
    const event = yield call(editEventRequest, payload, token)
    yield put({
      type: EDIT_EVENT.SUCCESS,
      payload: event,
    })
  } catch (err) {
    yield sagaErrorHandler({ type: EDIT_EVENT.ERROR, payload: err })
  }
}


export function* getEventSaga({ payload }) {
  try {
    const token = yield select(tokenSelector)
    const event = yield call(getEventRequest, payload, token)
    yield put({
      type: GET_EVENT.SUCCESS,
      payload: event,
    })
  } catch (err) {
    yield sagaErrorHandler({ type: GET_EVENT.ERROR, payload: err })
  }
}

export function* saga() {
  yield all([
    takeEvery(EVENTS_LIST.REQUEST, eventsSaga),
    takeEvery(CREATE_EVENT.REQUEST, createEventSaga),
    takeEvery(EDIT_EVENT.REQUEST, editEventSaga),
    takeEvery(GET_EVENT.REQUEST, getEventSaga),
  ])
}
