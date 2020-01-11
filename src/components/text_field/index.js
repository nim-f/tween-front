import React from 'react';
import './text_field.css'

function TextField({label, error, name, onChange, value}) {
  return (
    <div className="form_field text_field">
      { label ? <label className="form_label">{label}</label> : null}
      <input value={value || ''} onChange={onChange || null} name={name || ''}/>
      {error && <div className="field-error">{error}</div>}
    </div>
  );

}

export default TextField;
