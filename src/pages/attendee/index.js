import React, {useEffect} from 'react';
import { Field, Form } from 'react-final-form';
import TextField from '../../components/text_field';
import {connect} from 'react-redux'
import { addAttendeeAction, fieldsSelector, getFieldsAction } from '../../ducks/attendee';
import { currentEventSelector } from '../../ducks/event';
import SelectField from '../../components/select_field';

function AddAttendee({currentEvent, error, addAttendeeAction, getFieldsAction, fields}) {
  console.log({fields})
  useEffect(() => {
    getFieldsAction(currentEvent)
  }, [])

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

            {fields.map((field, index) => {
              switch (field.category) {
                case 1:
                  return (
                    <Field
                      name={`custom_fields.${field.slug}`}
                      render={({ input, meta }) => (
                        <TextField
                          label={field.name}
                          error={(meta.touched && meta.error && meta.error) || error && error[field.name]}
                          {...input} />
                      )}
                    />
                  )
                case 2:
                  return (
                    <Field
                      name={`custom_fields.${field.slug}`}
                      render={({ input, meta }) => (
                        <SelectField
                          options={field.options}
                          label={field.name}
                          error={(meta.touched && meta.error && meta.error) || error && error.category}
                          selected={values.category}
                          {...input} />
                      )}
                    />
                  )
                case 3:
                  return (
                    <label>
                      <span>{field.name}</span>
                    <Field
                      name={`custom_fields.${field.slug}`}
                      type="checkbox"
                      component="input"
                    />
                    </label>
                  )
                default:
                  return null
              }
              if (field.category === 1) {
                return (
                  <Field
                    name="title"
                    render={({ input, meta }) => (
                      <TextField
                        label="Title"
                        error={(meta.touched && meta.error && meta.error) || error && error.title}
                        {...input} />
                    )}
                  />
                )
              }

            })}
            <button className="button--link">save</button>

          </form>
        )}
      />

    </div>
  );
}

export default connect(
  state => ({
    currentEvent: state.event.currentId,
    fields: fieldsSelector(state)
  }),
  { addAttendeeAction, getFieldsAction }
)(AddAttendee)
