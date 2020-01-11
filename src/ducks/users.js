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

import { tokenSelector } from './login';
import { normalize, schema } from 'normalizr';
import {generateActions} from '../helpers/actions';

const user = new schema.Entity('user');
const eventListSchema = [user];

export const moduleName = 'user'
const prefix = `${appName}/${moduleName}`

const userListUrl = () => (`${BASE_URL}/users`)
