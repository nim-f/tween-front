import React from 'react';
import { observer } from 'mobx-react'
import './textarea.css'
export default observer(function TextArea(props) {
  console.log(props.value)
  return (
    <div className="text-area">
      <label>{props.label}</label>
      <textarea value={props.value} onChange={props.onChange}/>
    </div>
  );
})
