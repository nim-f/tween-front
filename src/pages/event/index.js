import React, { useEffect } from 'react'
import {connect} from 'react-redux'
import { singleEventSelector, getSingleEvent } from '../../ducks/event'
import EventForm from 'components/event_form'
import IsLogged from '../../components/is_logged';

function Event({event, match, getSingleEvent}) {
  const {id} = match.params

  useEffect(() => {
    getSingleEvent(id)
  }, [])

  return (
    <div>
      <EventForm initial={event} />
    </div>
  );
}
export default IsLogged(
  connect((state, props) => ({
    event: singleEventSelector(state, props.match.params.id)
  }), {getSingleEvent})(Event)
)
