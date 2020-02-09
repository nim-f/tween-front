import React from 'react';
import { Field, Form } from 'react-final-form';
import TextField from '../../components/text_field';
import {connect} from 'react-redux'
import {addAttendeeAction} from '../../ducks/attendee';
import { currentEventSelector } from '../../ducks/event';

function AddAttendee({currentEvent, error, addAttendeeAction}) {
  const onSubmit = (values) => {
    addAttendeeAction({...values, event: currentEvent})
  }
  const validate = () => {

  }
  return (
    <div>
      <Form
        onSubmit={onSubmit}
        validate={validate}
        render={({ handleSubmit, values, form }) => (
          <form onSubmit={handleSubmit}>
            <div className="form_field">
              <Field
                name="email"
                render={({ input, meta }) => (
                  <TextField
                    label="Email"
                    error={(meta.touched && meta.error && meta.error) || error && error.email}
                    {...input} />
                )}
              />
            </div>
            <div className="form_field">
              <Field
                name="first_name"
                render={({ input, meta }) => (
                  <TextField
                    label="First name"
                    error={(meta.touched && meta.error && meta.error) || error && error.first_name}
                    {...input} />
                )}
              />
            </div>
            <div className="form_field">
              <Field
                name="last_name"
                render={({ input, meta }) => (
                  <TextField
                    label="Last name"
                    error={(meta.touched && meta.error && meta.error) || error && error.last_name}
                    {...input} />
                )}
              />
            </div>

            <div className="form_field">
              <label className="form_label">
                <span>Is invited:</span>
                <Field
                  name="invited"
                  type="checkbox"
                  component="input"
                />
              </label>
            </div>

            <div className="form_field">
              <label className="form_label">
                <span>Is registered:</span>
                <Field
                  name="registered"
                  type="checkbox"
                  component="input"
                />
              </label>
            </div>
            <div className="form_field">
              <Field
                name="type"
                render={({ input, meta }) => (
                  <TextField
                    label="Type"
                    error={(meta.touched && meta.error && meta.error) || error && error.type}
                    {...input} />
                )}
              />
            </div>
            <div className="form_field">
              <Field
                name="title"
                render={({ input, meta }) => (
                  <TextField
                    label="Title"
                    error={(meta.touched && meta.error && meta.error) || error && error.title}
                    {...input} />
                )}
              />
            </div>
            <button className="button--link">save</button>

          </form>
        )}
      />

    </div>
  );
}

export default connect(
  state => ({
    currentEvent: state.event.currentId
  }),
  { addAttendeeAction }
)(AddAttendee)
