import React, {useState} from 'react'
import TextField from '../text_field'
import OutsideWrapper from '../click_outside_wrapper';
import './ac.css'

export default function Autocomplete({onChange, list, onSelect, managerId}) {
  const [focused, setFocused] = useState(false)
  const [userQuery, setUserQuery] = useState(null)
  const selectedUser = managerId && list.find(user => user.id === managerId)
  console.log({managerId})
  return (
    <OutsideWrapper callback={() => setFocused(false)}>
      <div className="ac">
        <TextField
          label="event manager"
          placeholder={'Type to add user'}
          onChange={(e) => {setUserQuery(e.target.value); onChange(e.target.value)}}
          value={focused || userQuery ? userQuery : selectedUser && `${selectedUser.first_name} ${selectedUser.last_name}`}
          onFocus={() => setFocused(true)}
        />

        {focused &&
        <ul className="ac__options">
          {
            list.length ?
              <>
                {list.map(item => <div key={item.id} onClick={() => {
                  onSelect(item);
                  setUserQuery(null)
                  setFocused(false)
                }}>{item.first_name} {item.last_name}</div>)}
              </>
              :
              <div className="ac__not_found">Users not found</div>
          }
        </ul>
        }

      </div>
    </OutsideWrapper>

  );
}
