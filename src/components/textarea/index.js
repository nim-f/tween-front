import React from 'react';
import './textarea.css'
export default function TextArea(props) {
  console.log(props.value)
  return (
    <div className="text-area">
      <label>{props.label}</label>
      <textarea value={props.value} onChange={props.onChange}/>
    </div>
  );
}
