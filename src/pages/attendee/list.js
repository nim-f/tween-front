import React, { useEffect } from 'react'
import {connect} from 'react-redux'
import BootstrapTable from 'react-bootstrap-table-next';
import {attendeeListSelector, getListActions} from '../../ducks/attendee';

function AttendeeList({attendees, currentEvent, getListActions}) {

  useEffect(() => {
    getListActions(currentEvent)
  }, [])

  useEffect(() => {
    getListActions(currentEvent)
  }, [currentEvent])

  const columns = [
    {
      dataField: 'id',
      text: '#'
    },
    {
      dataField: 'invited',
      text: 'Invited'
    },
    {
      dataField: 'registered',
      text: 'Registered'
    },
    {
      dataField: 'type',
      text: 'Type'
    },
    {
      dataField: 'first_name',
      text: 'First Name'
    },
    {
      dataField: 'last_name',
      text: 'Last Name'
    },
    {
      dataField: 'title',
      text: 'Title'
    },
    {
      dataField: 'company',
      text: 'Company'
    }
  ];

  return (
    <div>


      <BootstrapTable
        bordered={false}
        keyField='id'
        data={ attendees }
        columns={ columns }
      />

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
