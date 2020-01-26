import React from 'react';
import './text_field.css'

function TextField({label, error, name, onChange, onFocus, onBlur, value, hidden, placeholder}) {
  return (
    <div className="form_field text_field">
      { label ? <label className="form_label">{label}</label> : null}
      <input placeholder={placeholder} hidden={hidden} value={value || ''} onChange={onChange || null} name={name || ''} onFocus={onFocus} onBlur={onBlur} />
      {error && <div className="field-error">{error}</div>}
    </div>
  );

}

export default TextField;
