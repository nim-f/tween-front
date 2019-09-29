import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import Avatar  from 'components/avatar'
import EventSelector from 'components/event_selector'
import './header.css'
import {observer} from 'mobx-react';
import usersStore from 'store/users'
import eventsStore from 'store/events'

@observer
class Header extends Component {
  componentDidMount() {
    if (usersStore.token) {
      usersStore.fetchCurrentUser()
      eventsStore.fetchEventList()
    }
  }

  render() {
    console.log(usersStore.currentUser.toJSON())
    return (
      <div className="header">
        <div className="header__line">
          {/*<div className="email">{usersStore.currentUser.get('email')}</div>*/}
          <Avatar></Avatar>
          <EventSelector events={eventsStore.events} currentEventId={eventsStore.currentEventId}></EventSelector>
        </div>
        <nav className="header__line">
          <ul>
            <li>
              <NavLink className="link--create" to={`/event/create`}>Create</NavLink>
            </li>
            <li>
              <NavLink to={`/event/${eventsStore.currentEventId}`}>Details</NavLink>
            </li>
            <li>
              <NavLink to={`/workflow`}>Workflow</NavLink>
            </li>
            <li>
              <NavLink to={`/event/chat`}>Chat</NavLink>
            </li>
            <li>
              <NavLink to={`/event/attendees`}>Attendees</NavLink>
            </li>
            <li>
              <NavLink to={`/event/agenda`}>Agenda</NavLink>
            </li>
            <li>
              <NavLink to={`/event/jira`}>Jira link</NavLink>
            </li>
            <li>
              <NavLink to={`/event/files`}>Work files</NavLink>
            </li>
            <li>
              <NavLink to={`/event/gallery`}>Gallery</NavLink>
            </li>
            <li>
              <input placeholder="Search"/>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Header;
