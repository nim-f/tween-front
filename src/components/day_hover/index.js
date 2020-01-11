import React from 'react';
import './day_hover.css'
import { DateTime } from 'luxon';
import { Link } from 'react-router-dom';

export default function DayHover({events, position, onHoverChange}) {

  return (
    <div
      className={'day__hover'}
      style={{top: position.y, left: position.x}}
      onMouseLeave={(e) => {onHoverChange(false); console.log('leave')}}
      onMouseEnter={(e) => {onHoverChange(true);console.log('enter')}}
    >
      {events.map(event => {
        if (!event) return null
        const start = DateTime.fromISO(event.start.value)
        const now = DateTime.local();
        const diffInDays = start.diff(now, ['months', 'days', 'hours']);
        const {months, days, hours} = diffInDays.toObject()


        return (
          <div
            className="day__hover__event"

          >
            <div className="popup__title">
              <Link to={`/event/${event.id}`}>{event.title.value}</Link>
            </div>
            <div className="popup__info">
              Ready: <b>69%</b><br />
              {now < start ?
                <>
                  Will start in:
                  {months > 0 && <b>{months}month(s)</b>}
                  {days > 0 && <b>{days}d</b>}
                  {hours > 0 && <b>{parseInt(hours)}h</b>}
                </>
                : <>Finished in: {months < 0 && <b>{-1*months}month(s)</b>} {days < 0 && <b>{-1*days}d</b>} {hours < 0 && <b>{-1*parseInt(hours)}h</b>}</>
              }
            </div>
          </div>
        )
      })}
    </div>
  )
}
