import { all } from 'redux-saga/effects'
import { saga as loginSaga } from '../ducks/login';
import { saga as registerSaga } from '../ducks/register';
import { saga as eventSaga } from '../ducks/event';
import { saga as userSaga } from '../ducks/user';
import { saga as attendeeSaga } from '../ducks/attendee';

export default function*() {
  yield all([
    loginSaga(),
    registerSaga(),
    eventSaga(),
    userSaga(),
    attendeeSaga(),
  ])
}
