import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import {reducer as notifications} from 'react-notification-system-redux';

import loginReducer, { moduleName as loginModule } from '../ducks/login'
import registerReducer, { moduleName as registerModule } from '../ducks/register'
import eventReducer, { moduleName as eventModule } from '../ducks/event'
import userReducer, { moduleName as userModule } from '../ducks/user'

export default history =>
  combineReducers({
    router: connectRouter(history),
    [loginModule]: loginReducer,
    [registerModule]: registerReducer,
    [eventModule]: eventReducer,
    [userModule]: userReducer,
    notifications
  })
