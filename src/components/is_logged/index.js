import React from 'react';
import { Redirect } from 'react-router-dom';
import {connect} from 'react-redux'
import { tokenSelector } from '../../ducks/login';

export default function IsLogged(Component) {
  function Authenticate ({token, ...rest}) {
    if (token) return <Component {...rest} />
    return <Redirect to="/login" />;
  }
  return connect(state => ({
    token: tokenSelector(state)
  }))(Authenticate)
}
