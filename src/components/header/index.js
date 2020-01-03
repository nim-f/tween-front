import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom'
import {connect} from 'react-redux'
import Avatar  from 'components/avatar'
import EventSelector from 'components/event_selector'
import './header.css'
import { tokenSelector, currentUserAction, userSelector } from '../../ducks/login';
import { currentEventSelector, eventsListAction, eventsListSelector, eventsSelector, setCurrentEventAction } from '../../ducks/event';

function Header({token, currentUserAction, eventsListAction, setCurrentEventAction, events, list, user, current})  {
  useEffect(() => {
    if (token) {
      currentUserAction()
      eventsListAction()
    }

  }, [])

  return (
    <div className="header">
      <div className="header__line">
        <Avatar>
          <div className="email">{user && user.email}</div>
        </Avatar>
        <EventSelector list={list} events={events} current={current} setCurrent={setCurrentEventAction} />
      </div>
      <nav className="header__line">
        <ul>
          <li>
            <NavLink className="link--create" to={`/event/create`}>Create</NavLink>
          </li>
          {current &&
            <li>
              <NavLink to={`/event/${current.id}`}>Details</NavLink>
            </li>
          }
          <li>
            <NavLink to={`/`}>Workflow</NavLink>
          </li>
          <li>
            <NavLink to={`/chat`}>Chat</NavLink>
          </li>
          <li>
            <NavLink to={`/attendees`}>Attendees</NavLink>
          </li>
          <li>
            <NavLink to={`/agenda`}>Agenda</NavLink>
          </li>
          <li>
            <NavLink to={`/jira`}>Jira link</NavLink>
          </li>
          <li>
            <NavLink to={`/files`}>Work files</NavLink>
          </li>
          <li>
            <NavLink to={`/gallery`}>Gallery</NavLink>
          </li>
          <li>
            <input placeholder="Search"/>
          </li>
        </ul>
      </nav>
    </div>
  );

}

export default connect(state => ({
  token: tokenSelector(state),
  user: userSelector(state),
  list: eventsListSelector(state),
  events: eventsSelector(state),
  current: currentEventSelector(state),
}), {currentUserAction, eventsListAction, setCurrentEventAction})(Header);
