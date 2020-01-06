import React from 'react'
import { Link } from 'react-router-dom'
import './events_list_popup.css'

export default function EventsListPopup({events}) {
  return (
    <div className={'events_list__popup'}>
      <ul>
        {events.map(event => (
          <li>
            <Link to={`/event/${event.id}`}>{event.title.value}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
