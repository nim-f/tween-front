import React, {useState} from 'react';
import TextField from 'components/text_field'
import TextArea from 'components/textarea'
import DateField from 'components/date_field'
import ColorField from 'components/color_field'
import {connect} from 'react-redux'
import { Form, Field } from 'react-final-form'
import { userSelector } from '../../ducks/login'
import { createEventAction, editEventAction } from '../../ducks/event'
import { getRandomColor } from '../../helpers/color';
import SelectField from '../select_field';
import { FieldArray } from 'react-final-form-arrays'
import arrayMutators from 'final-form-arrays'
import CustomField from '../custom_field';

const fieldCategories = [
  {value: 1, label: 'Text input'},
  {value: 2, label: 'Textarea'},
  {value: 3, label: 'Select'},
  {value: 4, label: 'Checkbox'},
]

function EventForm({currentUser, createEventAction, editEventAction, errors, initial}) {
  const [isFieldOpen, setIsFieldOpen] = useState(false)

  const initialValues = {}
  if (initial) {
    Object.keys(initial).forEach(key => {
      if (key === 'customFields') return null
      if (key === 'start') return null
      if (key === 'end') return null
      const original = initial[key]
      initialValues[key] = original.value || original
    })
  }

  if (initial && initial.customFields) {
    initialValues.customFields = initial.customFields.map(field => ({
      ...field,
      category: fieldCategories.find(opt => opt.value == field.category),
      edit: false,
    }))
    initialValues.date = {end: initial.end.value, start: initial.start.value}
  } else {
    initialValues.customFields = []
  }

  console.log({initialValues})

  const onSubmit = values => {
    const { date, id, _id, __v, customFields, ...rest } = values
    const event = { id }
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

    event.customFields = customFields.map(field => ({...field, category: field.category.value}))

    if (!event.color) {
      event.color = {
        value: getRandomColor(),
        updated_by: currentUser.email,
      }
    }
    event.createdAt = Date.now()

    if (initial) {
      editEventAction(event)
    } else {
      createEventAction(event)
    }
  }

  const validate = values => {
    const localErrors = {}
    if (!values.title) localErrors.title = 'Title is required'
    if (!values.date || !values.date.start || !values.date.end) localErrors.date = 'Event dates are required'
    return localErrors
  }

  const addCustomField = e => {
    e.preventDefault()
    setIsFieldOpen(true)
  }

  const searchUser = (e) => {

  }

  return (
    <div>

      <Form
        onSubmit={onSubmit}
        validate={validate}
        initialValues={initialValues}
        mutators={{
          // potentially other mutators could be merged here
          ...arrayMutators
        }}
        render={({ handleSubmit, values }) => (
          <form onSubmit={handleSubmit}>

            <div className="form form__2col">
              <div>
                <Field
                  name="date"
                  render={({ input, meta }) => (
                    <>

                      <DateField
                      label="Event dates"
                      error={(meta.touched && meta.error && meta.error) || errors && errors.date}
                      {...input}
                    />
                    </>
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

                <FieldArray name="customFields">
                  {({ fields }) => (
                    <div>
                      {fields.map((name, index) => {
                        const field = values.customFields[index]
                        return (
                          <CustomField field={field} name={name} fieldCategories={fieldCategories} onEditToggle={() => {field.edit = !field.edit; console.log(field)}} />
                        )
                      })}
                      <>
                        <button className="button--link">save</button>
                        <button className="button--link"
                                onClick={(e) => { e.preventDefault(); console.log({values}); fields.push({ category: '', name: '', edit: true, value: '' })}}>add a field</button>
                      </>
                    </div>
                  )}

                </FieldArray>

              </div>


              <div>
                <div className="form_field">
                  <label className="form_label">event local page:</label>
                  <a href="">https://local.acronis.com/events/arw-in-hockenheim</a>
                </div>
                <Field
                  name="managerId"
                  render={({ input, meta }) => (
                    <TextField
                      // label="event manager"
                      {...input}
                    />
                  )}
                />

                <TextField
                  label="event manager"
                  onChange={searchUser}
                />

                <div className="form_field">
                  <label className="form_label">event team:</label>
                </div>
              </div>

            </div>
            <div>{console.log('re-render')}</div>

          </form>
        )}
      />
    </div>
  );
}
export default connect(state => ({
  currentUser: userSelector(state),
}), { createEventAction, editEventAction })(EventForm)
