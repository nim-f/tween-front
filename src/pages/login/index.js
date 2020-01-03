import React, { useState } from 'react'
import { Form, Field } from 'react-final-form'
import TextField from 'components/text_field'
import {connect} from 'react-redux'
import { tokenSelector, loginAction, errorsSelector } from '../../ducks/login';
import { Redirect } from 'react-router-dom';

function Login ({ token, errors, loginAction }) {
  if (token) return <Redirect to={"/"} />

  const onSubmit = values => {
    const {email, password} = values
    loginAction(email, password)
  }
  const validate = values => {
    const localErrors = {}
    if (!values.email) localErrors.email = 'Email is required'
    if (!values.password) localErrors.email = 'Password is required'
    return localErrors
  }
  return (
    <div className="login">
      <div className="login__block">
        <h1>Login</h1>
        <Form
          onSubmit={onSubmit}
          validate={validate}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Field
                name="email"
                render={({ input, meta }) => (
                  <TextField
                    label="login"
                    error={(meta.touched && meta.error && meta.error) || errors && errors.email}
                    {...input}
                  />
                )}
              />
              <Field
                name="password"
                render={({ input, meta }) => (
                  <TextField
                    label="password"
                    error={(meta.touched && meta.error && meta.error) || errors && errors.password}
                    {...input}
                  />
                )}
              />

              <button>Login</button>
            </form>
          )}
        />
      </div>

    </div>
  );
}
export default connect(state => ({
  token: tokenSelector(state),
  errors: errorsSelector(state),
}), {
  loginAction
})(Login)
