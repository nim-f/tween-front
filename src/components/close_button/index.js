import React from 'react';
import './index.css'
export default function CloseButton({onClick}) {
  return (
    <button className="popup__close" onClick={onClick}>x</button>
  );
}
