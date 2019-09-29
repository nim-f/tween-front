import React, {useState} from 'react';
import DayPicker from 'react-day-picker';
import ClickOutside from 'components/click_outside_wrapper'
import {DateTime} from 'luxon'
import 'react-day-picker/lib/style.css';
import './date_field.css'

export default function DateInput(props) {
  const handleDayClickStart = (day) => {
    props.onChange('start', day.toISOString())
  }
  const handleDayClickEnd = (day) => {
    props.onChange('end', day.toISOString())
  }

  const [isOpen, setOpen] = useState(false)
  const start = props.value.start ? DateTime.fromISO(props.value.start).toLocaleString() : ''
  const end = props.value.end ? DateTime.fromISO(props.value.end).toLocaleString()  : ''

  return (
    <div className="date text_field">
      { props.label ? <label>{props.label}</label> : null}
      <ClickOutside callback={() => setOpen(false)}>
        <input value={`${ start } - ${end}`}
               readOnly
               onFocus={() => setOpen(true)}
        />
        {isOpen ?
          <div className="date__popup">
            <div className="date__calendar">
              <div>start</div>
              <DayPicker onDayClick={handleDayClickStart}
              />
            </div>
            <div className="date__calendar">
              <div >end</div>
              <DayPicker onDayClick={handleDayClickEnd} />
            </div>
          </div>
          : null }
      </ClickOutside>
    </div>
  );
}
