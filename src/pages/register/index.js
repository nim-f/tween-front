import React from 'react';
import TextField from 'components/text_field'
import {connect} from 'react-redux'
import { registerAction, errorSelector } from '../../ducks/register'
import { Form, Field } from 'react-final-form'

function Register({registerAction, error}) {

  const register = e => {
    e.preventDefault()
    register()
  }
  const onSubmit = (values) => {
    registerAction(values)
  }
  const validate = (values) => {

    const localErrors = {}

    if (!values.email) localErrors.email = 'Email is required'
    if (!values.password) localErrors.password = 'Password is required'
    if (!values.password2 || values.password2 !== values.password) localErrors.password = 'Password is not match'
    return
  }
  return (
    <div className="register">
      <Form
        onSubmit={onSubmit}
        validate={validate}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Field
              name="email"
              render={({ input, meta }) => (
                <TextField
                  label="Email"
                  error={(meta.touched && meta.error && meta.error) || error && error.email}
                  {...input} />
              )}
            />
            <Field
              name="first_name"
              render={({ input, meta }) => (
                <TextField
                  label="First name"
                  error={(meta.touched && meta.error && meta.error) || error && error.first_name}
                  {...input} />
              )}
            />

            <Field
              name="last_name"
              render={({ input, meta }) => (
                <TextField
                  label="Last name"
                  error={(meta.touched && meta.error && meta.error) || error && error.last_name}
                  {...input} />
              )}
            />

            <Field
              name="password"
              render={({ input, meta }) => (
                <TextField
                  label="Password"
                  error={(meta.touched && meta.error && meta.error) || error && error.password}
                  {...input} />
              )}
            />

            <Field
              name="password2"
              render={({ input, meta }) => (
                <TextField label="Repeat password" {...input} error={meta.touched && meta.error && meta.error}/>
              )}
            />

            <button className="button button--link">register</button>
          </form>
        )}
      />
    </div>
  );
}
export default connect(state => ({
  error: errorSelector(state),
}), {registerAction})(Register)
