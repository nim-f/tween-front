import React from 'react';
import './textarea.css'
export default function TextArea(props) {
  return (
    <div className="text-area">
      <label className="form_label">{props.label}</label>
      <textarea value={props.value} onChange={props.onChange}/>
    </div>
  );
}
