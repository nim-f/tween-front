import React from 'react';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import './select_field.css'

export default function SelectField({options, onChange, selected, defaultOption, label}) {
  return (
    <div className="form_field">
      { label ? <label className="form_label">{label}</label> : null}
      <Dropdown options={options} onChange={onChange} value={selected || defaultOption} placeholder="Select an option" />
    </div>
  );
}
