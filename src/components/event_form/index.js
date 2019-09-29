import React from 'react';
import TextField from 'components/text_field'
import TextArea from 'components/textarea'
import DateField from 'components/date_field'
import ColorField from 'components/color_field'
import { observer } from 'mobx-react'

export default observer(function EventForm(props) {
  const save = (e) => {
    e.preventDefault()
    props.save()
  }
  return (
    <div>
      <form onSubmit={save}>

        <div className="form form__2col">
          <div>
            <DateField
              label="Event dates"
              value={{start: props.start.value, end: props.end.value}}
              onChange={(name, e) => props.change(name, e)}
            />
            <ColorField
              label="Color"
              value={props.color.value}
              onChange={(e) => props.change('color', e)}
            />

            <TextField
              label={`Event title (${props.users.find(item => {
                  console.log(item)
                  console.log(props.title.updated_at)
                }
              )}`}
              value={props.title.value}
              onChange={(e) => props.change('title', e.target.value)}
            />
            <TextField
              label="Event subtitle"
              value={props.subtitle.value}
              onChange={(e) => props.change('subtitle', e.target.value)}
            />
            <TextField
              label="Venue"
              value={props.venue.value}
              onChange={(e) => props.change('venue', e.target.value)}
            />
            <TextField
              label="link to lp"
              value={props.lpLink.value}
              onChange={(e) => props.change('lpLink', e.target.value)}
            />
            <TextField
              label="link to survey"
              value={props.surveyLink.value}
              onChange={(e) => props.change('surveyLink', e.target.value)}
            />
            <TextArea label="Description: (updated by gaidar magdanurov)"
                      value={props.description.value}
                      onChange={(e) => props.change('description', e.target.value)}
            />

            <button className="button--link">save</button>
            <button className="button--link">add a field</button>
          </div>
          <div>
            <div className="text_field">
              <label>event local page:</label>
              <a href="">https://local.acronis.com/events/arw-in-hockenheim</a>
            </div>
            <TextField
              label="Event manager:"
              value={props.managerId}
              onChange={(e) => props.change('managerId', e.target.value)}
            />
            <div className="text_field">
              <label>event team:</label>
            </div>
          </div>

        </div>
      </form>
    </div>
  );
})
