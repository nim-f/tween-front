import React, { useEffect, useState } from 'react';
import './event_selector.css'
import eventsStore from 'store/events'
import { observer } from "mobx-react"
import OutsideWrapper from 'components/click_outside_wrapper'

const  EventSelector = observer((props) => {

  const [isOpen, setOpen] = useState(false)

  const currentEvent = props.events.find(event => event.id === props.currentEventId)
  return (
    <div className="event_selector">
      <label>The event you are working with:</label>
      <OutsideWrapper callback={() => setOpen(false)}>
        <div className="event_selector__wrapper">
          <div className="event_selector__select" onClick={() => setOpen(!isOpen)}>
            <div className="event_selector__arrow" />
            <div className="event_selector__date">July 15-19, 2019 </div>
            <div className="event_selector__title">{currentEvent && currentEvent.title}</div>
          </div>

          <div className="event_selector__tools">
            <div className="button button--small">Copy Link</div>
            <div className="event_selector__time_left">11d 23h</div>
          </div>
          { isOpen ?
            <div className="event_selector__list">
              <ul>
                {props.events.map(item => (<li key={item.id} onClick={() => eventsStore.setCurrentEvent(item.id)}>{item.title}</li>))}
              </ul>
            </div>
            : null }
        </div>

      </OutsideWrapper>

    </div>
  );
})


export default EventSelector
