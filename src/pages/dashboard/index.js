import React, {useState} from 'react';
import DayPicker from 'react-day-picker';
import './dashboard.css'
import eventStore from 'store/events.js'
import {observer} from 'mobx-react';
import {toJS} from 'mobx';

const calendarSettings = {
  year: {
    numberOfMonths: 12,
    initialMonth: new Date(new Date().getFullYear(), 0, 1),
  },
  q1: {
    numberOfMonths: 3,
    month: new Date(new Date().getFullYear(), 0, 1),
  },
  q2: {
    numberOfMonths: 3,
    month: new Date(new Date().getFullYear(), 3, 1),
  },
  q3: {
    numberOfMonths: 3,
    month: new Date(new Date().getFullYear(), 6, 1),
  },
  q4: {
    numberOfMonths: 3,
    month: new Date(new Date().getFullYear(), 9, 1),
  },
}

export default observer(function Dashboard() {
  const [view, setView] = useState('overview')
  const [filter, setFilter] = useState('year')

  const events = toJS(eventStore.events)

  const modifiers = {
    start: events.map(item => (new Date(item.start.value))),
    end: events.map(item => (new Date(item.end.value))),
  }

  const modifiersStyles = {
  }

  events.forEach(item => {
    modifiersStyles[`event_${item.id}`] = {
      backgroundColor: item.color.value,
      opacity: 0.7,
    }

    let start = new Date(item.start.value)
    let end = new Date(item.end.value)
    start.setDate(start.getDate() - 1)
    end.setDate(end.getDate() + 1)
    modifiers[`event_${item.id}`] = { after: start, before: end }
  })

  console.log('modifiersStyles', modifiersStyles)
  console.log('modifiers', modifiers)

  return (
    <div className="dashboard">
      <div className="filters">
        <div className="filter--view">
          <label>Change view:</label>
          <button
            className={`button--filter ${view === 'overview' ? '-active' : '' }`}
            onClick={() => setView('overview')}
          >Overview</button>
          <button
            className={`button--filter ${view === 'tasks' ? '-active' : '' }`}
            onClick={() => setView('tasks')}
          >Tasks</button>
        </div>
        <div className="filter--time">
          <label>Quick filters:</label>
          <button className="link--filter" onClick={() => setFilter('year')}>Year</button>
          <button className="link--filter" onClick={() => setFilter('q1')}>Q1</button>
          <button className="link--filter" onClick={() => setFilter('q2')}>Q2</button>
          <button className="link--filter" onClick={() => setFilter('q3')}>Q3</button>
          <button className="link--filter" onClick={() => setFilter('q4')}>Q4</button>
          <button className="link--filter" onClick={() => setFilter('prev')}>Previous month</button>
          <button className="link--filter" onClick={() => setFilter('current')}>Current month</button>
          <button className="link--filter" onClick={() => setFilter('next')}>Next month</button>
        </div>
      </div>

      <DayPicker
        {...calendarSettings[filter]}
        modifiers={modifiers}
        modifiersStyles={modifiersStyles}
      />

      <h2>Short status (year)</h2>
      <p>Overall tasks: 14</p>

      <p>
        Current load:
        <br/>
        @Chris Watts – Todo: 4, In progress: 3, Done: 14
      </p>
    </div>
  );
})
