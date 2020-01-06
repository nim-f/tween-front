import React, {useState} from 'react';
import DayPicker from 'react-day-picker';
import {connect} from 'react-redux'
import { DateTime } from 'luxon';
import './dashboard.css'
import { eventsListSelector, eventsSelector } from '../../ducks/event';
import IsLogged from '../../components/is_logged';
import EventsListPopup from '../../components/events_list_popup';
import DayHover from '../../components/day_hover';

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

function Dashboard({events, list, history}) {
  const [view, setView] = useState('overview')
  const [filter, setFilter] = useState('year')
  const [dayEvents, setDayEvents] = useState([])
  const [hoverDayEvents, setHoverDayEvents] = useState([])
  const [selectedDay, setSelectedDay] = useState(null)
  const [popupPosition, setPopupPosition] = useState({x: 0, y: 0})
  console.log({events})

  const onDayClick = (day, modifiers) => {
    const dayString = `${day.getDate()}.${day.getMonth()}.${day.getFullYear()}`
    setSelectedDay(dayString)
    const dayEvents = Object.keys(modifiers).filter(key => key !== 'end' && key !== 'start')
    if (dayEvents.length > 1) {
      setDayEvents(dayEvents)
      console.log({dayEvents})
    } else {
      dayEvents[0] && history.push(`/event/${dayEvents[0]}`)
    }
  }

  const modifiers = {
    start: list.map(item => (new Date(events[item].start.value))),
    end: list.map(item => (new Date(events[item].end.value))),
  }

  const modifiersStyles = {
  }

  list.forEach(item => {
    const event = events[item]
    modifiersStyles[`${event.id}`] = {

    }

    let start = new Date(event.start.value)
    let end = new Date(event.end.value)
    start.setDate(start.getDate() - 1)
    end.setDate(end.getDate() + 1)
    modifiers[`${event.id}`] = { after: start, before: end }
  })

  // console.log('modifiersStyles', modifiersStyles)
  // console.log('modifiers', modifiers)

  const renderDay = (day, modifiers) => {
    const dayEvents = Object.keys(modifiers).filter(key => key !== 'end' && key !== 'start' && key !== 'outside').map(key => {
      return events[key]
    })
    const date = day.getDate();
    return (
      <div className="dashboard__day">
        {dayEvents.map(event => {
          if (event) {
            const start = DateTime.fromISO(event.start.value)
            const end = DateTime.fromISO(event.end.value)
            const current = DateTime.fromISO(day.toISOString())
            const isStart = start.hasSame(current, 'day')
            const isEnd = end.hasSame(current, 'day')
            return event &&
              <div className={`day__bg ${isStart ? 'day__start' : ''} ${isEnd ? 'day__end' : ''}`}
                   style={{backgroundColor: event.color.value, opacity: 0.7}}
              />
          }
          return event
        })}
        <div className="day__date">{date}</div>
      </div>
    );
  }
  const onDayMouseEnter = (day, modifiers, e) => {
    // console.log({positionX: e.clientX, positionY: e.clientY})
    setPopupPosition({x: e.clientX , y:  e.clientY})
    const dayEvents = Object.keys(modifiers).filter(key => key !== 'end' && key !== 'start').map(key => events[key])
    setHoverDayEvents(dayEvents)
  }
  const onDayMouseLeave = (day, modifiers, e) => {
    setHoverDayEvents([])
  }
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
        onDayClick={onDayClick}
        pagedNavigation
        renderDay={renderDay}
        onDayMouseEnter={onDayMouseEnter}
        onDayMouseLeave={onDayMouseLeave}
      />

      <h2>Short status (year)</h2>
      <p>Overall tasks: 14</p>

      <p>
        Current load:
        <br/>
        @Chris Watts – Todo: 4, In progress: 3, Done: 14
      </p>

      {console.log({hoverDayEvents})}
      {hoverDayEvents.length ?
        <DayHover events={hoverDayEvents} position={popupPosition} />
        :
        null
      }
    </div>
  );
}
export default IsLogged(
  connect(state => ({
    events: eventsSelector(state),
    list: eventsListSelector(state),
  }), null)(Dashboard)
)
