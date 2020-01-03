import React from 'react';
import TextField from 'components/text_field'
import TextArea from 'components/textarea'
import DateField from 'components/date_field'
import ColorField from 'components/color_field'
import {connect} from 'react-redux'
import { Form, Field } from 'react-final-form'
import { userSelector } from '../../ducks/login'
import { createEventAction } from '../../ducks/event'
import { getRandomColor } from '../../helpers/color';

function EventForm({currentUser, createEventAction, errors, initial}) {
  console.log({initial})
  const initialValues = {}
  if (initial) {
    Object.keys(initial).forEach(key => {
      const original = initial[key]
      initialValues[key] = original.value || original
    })
  }
  
  const onSubmit = values => {
    const { date, ...rest } = values
    const event = {}
    Object.keys(rest).forEach(item => {
      event[item] = {
        value: rest[item],
        updated_by: currentUser.email,
      }
    })
    event.start = {
      value: date.start,
      updated_by: currentUser.email,
    }
    event.end = {
      value: date.end,
      updated_by: currentUser.email,
    }

    if (!event.color) {
      event.color = {
        value: getRandomColor(),
        updated_by: currentUser.email,
      }
    }
    event.createdAt = Date.now()

    createEventAction(event)
  }

  const validate = values => {
    const localErrors = {}
    if (!values.title) localErrors.title = 'Title is required'
    if (!values.date || !values.date.start || !values.date.end) localErrors.date = 'Event dates are required'
    return localErrors
  }

  return (
    <div>
      <Form
        onSubmit={onSubmit}
        validate={validate}
        initialValues={initialValues}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>

            <div className="form form__2col">
              <div>
                <Field
                  name="date"
                  render={({ input, meta }) => (
                    <DateField
                      label="Event dates"
                      error={(meta.touched && meta.error && meta.error) || errors && errors.date}
                      {...input}
                    />
                  )}
                />
                <Field
                  name="color"
                  render={({ input, meta }) => (
                    <ColorField
                      label="Color"
                      error={(meta.touched && meta.error && meta.error) || errors && errors.color}
                      {...input}
                    />
                  )}
                />
                <Field
                  name="title"
                  render={({ input, meta }) => (
                    <TextField
                      label="Event title"
                      error={(meta.touched && meta.error && meta.error) || errors && errors.title}
                      {...input}
                    />
                  )}
                />
                <Field
                  name="subtitle"
                  render={({ input, meta }) => (
                    <TextArea
                      label="Event subtitle"
                      {...input}
                    />
                  )}
                />
                <Field
                  name="venue"
                  render={({ input, meta }) => (
                    <TextField
                      label="Venue"
                      {...input}
                    />
                  )}
                />
                <Field
                  name="lpLink"
                  render={({ input, meta }) => (
                    <TextField
                      label="link to lp"
                      {...input}
                    />
                  )}
                />
                <Field
                  name="surveyLink"
                  render={({ input, meta }) => (
                    <TextField
                      label="link to survey"
                      {...input}
                    />
                  )}
                />
                <Field
                  name="description"
                  render={({ input, meta }) => (
                    <TextArea
                      label="Description"
                      {...input}
                    />
                  )}
                />
                {/*

                <TextField
                  label={`Event title (${props.users.find(item => {
                      console.log(item)
                      console.log(props.title.updated_at)
                    }
                  )}`}
                  value={props.title.value}
                  onChange={(e) => props.change('title', e.target.value)}
                />

 */}
                <button className="button--link">save</button>
                <button className="button--link">add a field</button>
              </div>
              <div>
                <div className="text_field">
                  <label>event local page:</label>
                  <a href="">https://local.acronis.com/events/arw-in-hockenheim</a>
                </div>
                {/*<TextField*/}
                {/*  label="Event manager:"*/}
                {/*  value={props.managerId}*/}
                {/*  onChange={(e) => props.change('managerId', e.target.value)}*/}
                {/*/>*/}
                <div className="text_field">
                  <label>event team:</label>
                </div>
              </div>

            </div>
          </form>
        )}
      />
    </div>
  );
}
export default connect(state => ({
  currentUser: userSelector(state),
}), { createEventAction })(EventForm)
