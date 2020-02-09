import React from 'react';
import { connect } from 'react-redux'
import './attendee_field_form.css'
import { Field, Form } from 'react-final-form';
import TextField from '../text_field';
import SelectField from '../select_field';
import {addAttendeeFieldAction} from '../../ducks/attendee';

function AttendeeFieldForm({error, eventId, column, addAttendeeFieldAction, onSuccess}) {
  const onSubmit = (values) => {
    return new Promise((resolve, reject) => {
      const field = {
        ...values,
        category: values.category.value,
        is_in_table: column || values.is_in_table,
      }
      addAttendeeFieldAction(eventId, field,  resolve, reject)
    })
  }

  const validate = () => {}

  return (
    <div className="attendee__field">
      <Form
        onSubmit={onSubmit}
        validate={validate}
        render={({ handleSubmit, values, form }) => (
          <form onSubmit={(e) => handleSubmit(e).then(onSuccess)}>
            <div className="form_field">
              <Field
                name="name"
                render={({ input, meta }) => (
                  <TextField
                    label="ID"
                    error={(meta.touched && meta.error && meta.error) || error && error.name}
                    {...input} />
                )}
              />
            </div>
            <div className="form_field">
              <Field
                name="value"
                render={({ input, meta }) => (
                  <TextField
                    label="name"
                    error={(meta.touched && meta.error && meta.error) || error && error.name}
                    {...input} />
                )}
              />
            </div>
            <div className="form_field">
              <Field
                name="category"
                render={({ input, meta }) => (
                  <SelectField
                    options={[
                      {value: 1, label: 'text input'},
                      {value: 2, label: 'select'},
                      {value: 3, label: 'checkbox'},
                    ]}
                    label="category"
                    error={(meta.touched && meta.error && meta.error) || error && error.category}
                    selected={values.category}
                    {...input} />
                )}
              />
            </div>

            <div className="form_field">
              <label className="form_label">
                <span>Is required:</span>
                <Field
                  name={`is_required`}
                  type="checkbox"
                  component="input"
                />
              </label>
            </div>

            {!column &&
              <div className="form_field">
                <label className="form_label">
                  <span>Is in table:</span>
                  <Field
                    name={`is_in_table`}
                    type="checkbox"
                    component="input"
                  />
                </label>
              </div>
            }

            <div className="form_field">
              <label className="form_label">
                <span>Is disabled:</span>
                <Field
                  name={`is_disabled`}
                  type="checkbox"
                  component="input"
                />
              </label>
            </div>
            <div className="form_field">
              <button className="button--link" >save</button>
            </div>
          </form>
        )}
      />
    </div>
  );
}
export default connect(
  null,
  { addAttendeeFieldAction }
)(AttendeeFieldForm)
