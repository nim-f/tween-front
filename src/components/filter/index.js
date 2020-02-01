import React from 'react';
import './filter.css'

export default function Filter({setFilter, selected, label, values, name, type}) {
  const btnClass = `${type}--filter`
  return (
    <div className={`filter--${name}`}>
      <label>{label}:</label>
      {values.map(item => (
        <button className={`${btnClass} ${selected === item.id ? '-active' : ''}`} onClick={() => setFilter(item.id)}>{item.name}</button>
      ))}
    </div>
  );
}
