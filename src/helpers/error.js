import { put } from "redux-saga/effects";
// import { refreshAction } from "./account";
import { error } from "react-notification-system-redux";

export const unknownErr = (status, data) => ({
  title: `Ошибка ${status}`,
  message: (data && data.detail) || 'Что-то пошло не так. Попробуйте позже',
  position: 'tr',
  autoDismiss: 0,
})

export const setError = (status, data) => {
  switch(status) {
    case 400:
    case 401:
      if (data) {
        return {
          title: `Ошибка ${status}`,
          message: data.detail,
          position: 'tr',
          autoDismiss: 0,
        }
      }
      return unknownErr(status, data)
    case 404:
      return {
        title: `Ошибка ${status}`,
        message: 'Не найдено',
        position: 'tr',
        autoDismiss: 0,
      }
    default: {
      return unknownErr(status, data)
    }
  }
}

export function* sagaErrorHandler({ type, payload, repeatAction }) {
  // if (status === 401 && repeatAction) {
  //   yield put(refreshAction(repeatAction))
  // } else {
    yield put({type, payload})
    yield put(error(setError(payload.status, payload.error)))
  // }
}
