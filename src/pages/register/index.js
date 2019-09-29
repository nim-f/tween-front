import React from 'react';
import TextField from 'components/text_field'
import usersStore from 'store/users.js'
import {observer} from 'mobx-react';

export default observer(function Index() {
  const {currentUser} = usersStore
  const changeUser = (e) => {
    const value = e.target.value
    const name = e.target.name
    currentUser.set(name, value)
  }
  const register = e => {
    e.preventDefault()
    usersStore.register()
  }
  return (
    <div className="register">
      <form onSubmit={register}>
        <TextField label="Email"
                   value={currentUser.get('email')}
                   onChange={changeUser}
                   name="email"
        />
        <TextField label="First name"
                   value={currentUser.get('first_name')}
                   onChange={changeUser}
                   name="first_name"
        />
        <TextField label="Last name"
                   value={currentUser.get('last_name')}
                   onChange={changeUser}
                   name="last_name"
        />
        <TextField label="Password"
                   value={currentUser.get('password')}
                   onChange={changeUser}
                   name="password"
        />
        <TextField label="Repeat password"
                   value={currentUser.get('password2')}
                   onChange={changeUser}
                   name="password2"
        />

        <button className="button button--link">register</button>
      </form>
    </div>
  );
})
