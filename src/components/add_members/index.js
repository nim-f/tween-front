import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux'
import Autocomplete from '../autocomplete';
import { Field } from 'react-final-form';
import TextField from '../text_field';
import { filteredSelector, getUsersAction, userListSelector, userMapSelector } from '../../ducks/user';
import './add_members.css'

function AddMembers({members, users, filtered, usersMap, deleteMember, selectMember, selectManager, managerId, getUsersAction}) {
  const [isOpen, setIsOpen] = useState(false)
  useEffect(() => {
    getUsersAction()
  }, [])
  const searchUser = (e) => {
    getUsersAction(e)
  }
  return (
    <div className="event__members">
      <Field
        name="managerId"
        render={({ input, meta }) => (
          <TextField
            // label="event manager"
            hidden
            {...input}
          />
        )}
      />
      <div className="form_field">
        <Autocomplete
          label="event manager"
          placeholder={'Type to add user'}
          onChange={searchUser}
          list={filtered || users}
          managerId={managerId}
          onSelect={(user) => selectManager(user)}
        />
      </div>
      <div className="form_field">
        <label className="form_label">event team:</label>
        {members && members.map(member => (
          <ul className="members__list">
            { usersMap[member] &&
            <li>{usersMap[member].first_name} {usersMap[member].last_name} <button onClick={() => deleteMember(member)}>delete</button></li>
            }
          </ul>
        ))}

        {!members || !members.length ? (
          <div className="members__not_found">No members in the team</div>
        ) : null}

      </div>
      {isOpen ?
        <div className="form_field">
          <Autocomplete
            label="event manager"
            placeholder={'Type to find users'}
            onChange={searchUser}
            list={filtered || users}
            // managerId={values.memberId}
            onSelect={(user) => selectMember(user)}
          />
        </div>
        :
        <button className="button--link" onClick={() => setIsOpen(true)}>Add</button>
      }

    </div>
  );
}
export default connect(
  state => ({
    filtered: filteredSelector(state),
    users: userListSelector(state),
    usersMap: userMapSelector(state),
  }),
  { getUsersAction }
)(AddMembers)
