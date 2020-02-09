import React from 'react';
import './tip.css'

export default function Tip({children}) {
  return (
    <div className="tip">
      {children}
    </div>
  );
}
