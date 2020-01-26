import React, { useEffect } from 'react'
import {connect} from 'react-redux'
import {attendeeListSelector, getListActions} from '../../ducks/attendee';

function AttendeeList({attendees, currentEvent, getListActions}) {
  console.log({currentEvent})
  useEffect(() => {
    getListActions(currentEvent)
  }, [])
  return (
    <div>
      {attendees.map(attendee => (
        <div>{attendee.first_name} {attendee.last_name}</div>
      ))}
    </div>
  );
}
export default connect(
  state => ({
    attendees: attendeeListSelector(state),
    currentEvent: state.event.currentId,
  }),
  { getListActions }
)(AttendeeList)
