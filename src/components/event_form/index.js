import React, {useState, useEffect} from 'react';
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
import AddMembers from '../add_members';
import { DateTime } from 'luxon';

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
    event.updatedAt = Date.now()

    if (initial) {
      editEventAction(event)
    } else {
      event.createdAt = Date.now()
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

  return (
    <div>

      <Form
        onSubmit={onSubmit}
        validate={validate}
        initialValues={initialValues}
        mutators={{
          // potentially other mutators could be merged here
          setManagerId: ([id], state, { changeValue }) => {
            changeValue(state, 'managerId', () => id)
          },
          deleteMembers: ([id], state, { changeValue }) => {
            changeValue(state, 'teamIds', () => {
              const { teamIds } = state.formState.values
              return teamIds.filter(mId => mId !== id)
            })
          },
          setMembers: ([id], state, { changeValue }) => {
            changeValue(state, 'teamIds', () => {
              const {teamIds} = state.formState.values
              if (teamIds) return [...teamIds, id]
              return [id]
            })
          },
          ...arrayMutators
        }}
        render={({ handleSubmit, values, form }) => (
          <form onSubmit={handleSubmit}>
            {console.log({values})}

            <div className="form form__2col">
              <div>
                <div className="form_field">
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
                </div>
                <div className="form_field">
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
                </div>
                <div className="form_field">
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
                </div>
                <div className="form_field">
                  <Field
                    name="subtitle"
                    render={({ input, meta }) => (
                      <TextArea
                        label="Event subtitle"
                        {...input}
                      />
                    )}
                  />
                </div>
                <div className="form_field">
                  <Field
                    name="venue"
                    render={({ input, meta }) => (
                      <TextField
                        label="Venue"
                        {...input}
                      />
                    )}
                  />
                </div>
                <div className="form_field">
                  <Field
                    name="lpLink"
                    render={({ input, meta }) => (
                      <TextField
                        label="link to lp"
                        {...input}
                      />
                    )}
                  />
                </div>
                <div className="form_field">
                  <Field
                    name="surveyLink"
                    render={({ input, meta }) => (
                      <TextField
                        label="link to survey"
                        {...input}
                      />
                    )}
                  />
                </div>

                <div className="form_field">
                  <Field
                    name="description"
                    render={({ input, meta }) => (
                      <TextArea
                        label="Description"
                        {...input}
                      />
                    )}
                  />
                </div>
                <div className="form_field">
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
              </div>


              <div>
                <div className="form_field">
                  <label className="form_label">event local page:</label>
                  <a href="">https://local.acronis.com/events/arw-in-hockenheim</a>
                </div>

                <AddMembers
                  deleteMember={form.mutators.deleteMembers}
                  selectMember={form.mutators.setMembers}
                  selectManager={form.mutators.setManagerId}
                  members={values.teamIds}
                  managerId={values.managerId}
                />
                {values.createdAt &&
                  <div className="form_field">
                    <label className="form_label">created:</label>
                    <div>{DateTime.fromISO(values.createdAt).toLocaleString()}</div>
                  </div>
                }
                {values.updatedAt &&
                  <div className="form_field">
                    <label className="form_label">profile updated:</label>
                    <div>{DateTime.fromISO(values.updatedAt).toLocaleString()}</div>
                  </div>
                }

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
}), { createEventAction, editEventAction })(EventForm)
