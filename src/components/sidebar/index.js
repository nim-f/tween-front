import React from 'react'
import { NavLink } from 'react-router-dom'
import {connect} from 'react-redux'
import {logOutAction} from '../../ducks/login'

function Sidebar({logOutAction}) {
  const logOut = (e) => {
    e.preventDefault()
    logOutAction()
  }
  return (
    <div className="col__left">
      <ul>
        <li>
          <NavLink to="/">Detailed status</NavLink>
        </li>
        <li>
          <NavLink to="/">Reports</NavLink>
        </li>
        <li>
          <NavLink to="/">Filters</NavLink>
        </li>
        <li>
          <NavLink to="/">Activity log</NavLink>
        </li>
        <li>
          <button onClick={logOut}>Log out</button>
        </li>
      </ul>
    </div>
  );
}
export default connect(null, {logOutAction})(Sidebar)
