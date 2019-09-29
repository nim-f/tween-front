import React, { Component } from 'react';
import './text_field.css'

function TextField(props) {
  return (
    <div className="text_field">
      { props.label ? <label>{props.label}</label> : null}
      <input value={props.value || ''} onChange={props.onChange || null} name={props.name || ''}/>
    </div>
  );

}

export default TextField;
