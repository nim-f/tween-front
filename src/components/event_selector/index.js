import React, { useEffect, useState } from 'react';
import './event_selector.css'
import OutsideWrapper from 'components/click_outside_wrapper'
import {
  eventsListAction,
  setCurrentEventAction,
  eventsListSelector,
  eventsSelector,
  currentEventSelector
} from '../../ducks/event';
import {connect} from 'react-redux'

const  EventSelector = ({events, list, current, setCurrentEventAction, eventsListAction}) => {
  useEffect(() => {
    eventsListAction()
  }, [])
  const [isOpen, setOpen] = useState(false)

  const select = id => {
    setCurrentEventAction(id)
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
            <div className="event_selector__title">{current && current.title.value}</div>
          </div>

          <div className="event_selector__tools">
            <div className="button button--small">Copy Link</div>
            <div className="event_selector__time_left">11d 23h</div>
          </div>
          { isOpen ?
            <div className="event_selector__list">
              <ul>
                {list.map(item => {
                  return <li onClick={() => select(item)}>{events[item].title.value}</li>})}
              </ul>
            </div>
            : null }
        </div>

      </OutsideWrapper>

    </div>
  );
}


export default connect(
  state => ({
    list: eventsListSelector(state),
    events: eventsSelector(state),
    current: currentEventSelector(state)
  }),
  {
    eventsListAction,
    setCurrentEventAction
  }
)(EventSelector)
