import React, { useEffect, useState } from 'react';
import './event_selector.css'
import OutsideWrapper from 'components/click_outside_wrapper'

const  EventSelector = (props) => {
  console.log(props.list)
  const [isOpen, setOpen] = useState(false)

  const select = id => {
    props.setCurrent(id)
    setOpen(false)
  }

  return (
    <div className="event_selector">
      <label>The event you are working with:</label>
      <OutsideWrapper callback={() => setOpen(false)}>
        <div className="event_selector__wrapper">
          <div className="event_selector__select" onClick={() => setOpen(!isOpen)}>
            <div className="event_selector__arrow" />
            <div className="event_selector__date">July 15-19, 2019 </div>
            <div className="event_selector__title">{props.current && props.current.title.value}</div>
          </div>

          <div className="event_selector__tools">
            <div className="button button--small">Copy Link</div>
            <div className="event_selector__time_left">11d 23h</div>
          </div>
          { isOpen ?
            <div className="event_selector__list">
              <ul>
                {props.list.map(item => {
                  return <li onClick={() => select(item)}>{props.events[item].title.value}</li>})}
              </ul>
            </div>
            : null }
        </div>

      </OutsideWrapper>

    </div>
  );
}


export default EventSelector
