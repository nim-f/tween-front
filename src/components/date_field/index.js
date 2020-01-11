import React, {useState} from 'react';
import DayPicker from 'react-day-picker';
import ClickOutside from 'components/click_outside_wrapper'
import {DateTime} from 'luxon'
import 'react-day-picker/lib/style.css';
import './date_field.css'

export default function DateInput(props) {
  const handleDayClickStart = (day) => {
    props.onChange({...props.value, start: day.toISOString()})
  }
  const handleDayClickEnd = (day) => {
    props.onChange({...props.value, end: day.toISOString()})
  }

  const [isOpen, setOpen] = useState(false)
  const start = props.value && props.value.start ? DateTime.fromISO(props.value.start).toLocaleString() : ''
  const end = props.value && props.value.end ? DateTime.fromISO(props.value.end).toLocaleString()  : ''

  return (
    <div className="date text_field form_field">
      { props.label ? <label className="form_label">{props.label}</label> : null}
      <ClickOutside callback={() => setOpen(false)}>
        <input value={`${ start } - ${end}`}
               readOnly
               onFocus={() => setOpen(true)}
        />
        {props.error && <div className="field-error">{props.error}</div>}

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
