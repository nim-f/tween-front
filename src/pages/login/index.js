import React, { useState } from 'react'
import TextField from 'components/text_field'
import { observer } from 'mobx-react';
import userStore from 'store/users.js'

export default observer(function Login () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const login = e => {
    e.preventDefault()
    userStore.login(email, password)
  }
  return (
    <div className="login">
      <div className="login__block">
        <h1>Login</h1>
        <form onSubmit={login}>
          <TextField label="login" value={email} onChange={e => setEmail(e.target.value)} />
          <TextField label="password" value={password} onChange={e => setPassword(e.target.value)} />
          <button>Login</button>
        </form>
      </div>

    </div>
  );
})
