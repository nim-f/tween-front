import React, { useEffect, useState } from 'react';
import {connect} from 'react-redux'
import BootstrapTable from 'react-bootstrap-table-next';
import Modal from 'react-modal'
import { attendeeListSelector, getListAction, getFieldsAction, fieldsSelector } from '../../ducks/attendee';
import Filter from '../../components/filter';
import SearchField from '../../components/search_field';
import './attendees.css'
import Tip from '../../components/tip';
import CloseButton from '../../components/close_button';
import AttendeeFieldForm from '../../components/attendee_field_form';

function AttendeeList({attendees, currentEvent, getListAction, getFieldsAction, fields}) {

  useEffect(() => {
    getListAction(currentEvent)
    getFieldsAction(currentEvent)
  }, [])

  useEffect(() => {
    getListAction(currentEvent)
    getFieldsAction(currentEvent)
  }, [currentEvent])

  const customColumns = fields
    .filter(f => f.is_in_table)
    .map(f => ({
      dataField: f.name,
      text: f.value
    }))

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
    },
    ...customColumns
  ];

  const [filter, setFilter] = useState('all')
  const [isFieldOpen, setFieldOpen] = useState(false)
  return (
    <div>

      <div className="attendees__head box">
        <div className="attendees__filter">
          <Filter
            label="Quick filters"
            name="attendee"
            type="link"
            selected={filter}
            setFilter={setFilter}
            values={[
              {id: 'all', name: 'All'},
              {id: 'invited', name: 'Invited'},
              {id: 'registered', name: 'Registered'},
              {id: 'media', name: 'Media'},
              {id: 'acronis', name: 'Acronis'},
              {id: 'guests', name: 'Guests'},
            ]}
          />
          <SearchField />
        </div>

        <div className="import">
          <button>Import/Export</button>
        </div>
      </div>

      <div className="box">
        <Tip>
          Tip!  You can sort the table with two parameters at the same time. Example: Type (A-Z) + Name (A-Z), just click on the Type, then press CTRL and click on the Name.
        </Tip>
      </div>


      <div className="table_block">
        <BootstrapTable
          bordered={false}
          keyField='id'
          data={ attendees }
          columns={ columns }
        />
        <div className="add_column">
          <button onClick={() => setFieldOpen(true)}>Add column</button>
        </div>
      </div>

      <Modal
        isOpen={isFieldOpen}
        style={{
          overlay: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          },
          content: {
            position: 'relative',
            top: 'auto',
            left: 'auto',
            right: 'auto',
            bottom: 'auto',
            padding: 40,
          }
        }}
      >
        <CloseButton onClick={() => setFieldOpen(false)} />
        <h2>Add field for attendee</h2>
        <AttendeeFieldForm eventId={currentEvent} onSuccess={() => setFieldOpen(false)} column />
      </Modal>
    </div>
  );
}
export default connect(
  state => ({
    attendees: attendeeListSelector(state),
    fields: fieldsSelector(state),
    currentEvent: state.event.currentId,
  }),
  {
    getListAction,
    getFieldsAction,
  }
)(AttendeeList)
