import React from 'react';
import { Redirect } from 'react-router-dom';
import { observer } from 'mobx-react';
import usersStore from 'store/users'

export default function IsLogged(Component) {
  @observer
  class Authenticate extends React.Component {
    render () {
      console.log(usersStore)
      if (usersStore.token) return <Component {...this.props} />

      return <Redirect to="/login" />;
    }
  }

  return Authenticate
}
