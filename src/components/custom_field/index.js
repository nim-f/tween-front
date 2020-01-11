import React from 'react';
import { Field } from 'react-final-form';
import SelectField from '../select_field';
import TextField from '../text_field';
import './custom_field.css'

export default function CustomField({field, name, fieldCategories}) {
  if (field.edit) return (
    <div className="custom__field form_field">
      <Field
        name={`${name}.category`}
        render={({ input, meta }) => (
          <SelectField
            label="Field type"
            options={fieldCategories}
            selected={field && field.category}
            {...input}
          />
        )}
      />
      <Field
        name={`${name}.name`}
        render={({ input, meta }) => (
          <TextField
            label="Name"
            {...input}
          />
        )}
      />

      <label className="form_label">
        <span>Is required:</span>
        <Field
          name={`${name}.is_required`}
          type="checkbox"
          component="input"
        />
      </label>
      <label className="field__edit">
        <span>Edit:</span>
        <Field
          name={`${name}.edit`}
          type="checkbox"
          component="input"
        />
      </label>
    </div>
  )

  return (
    <div className="custom__field">
      <Field
        name={`${name}.value`}
        render={({input, meta}) => (
          <>
          <TextField
            label={field.name}
            {...input}
          />
          </>
        )} />
      <label className="field__edit">
        <span>Edit:</span>
        <Field
          name={`${name}.edit`}
          type="checkbox"
          component="input"
        />
      </label>
    </div>
    )
}
