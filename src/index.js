import React from 'react'
import ReactDOM from 'react-dom'
import { Switch, Route, BrowserRouter as Router, NavLink } from 'react-router-dom'
import './index.css'
import Header from 'components/header'
import NewEvent from './pages/events/new_event'
import Register from './pages/register'
import Login from './pages/login'
import Dashboard from './pages/dashboard'

console.log('working')
const App = () => (
  <Router>
  <div>

    <Header></Header>
    <div className="main">
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
        </ul>
      </div>
      <div className="col__right">

          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/workflow" component={Dashboard} />
            <Route path="/register" component={Register} />
            <Route path="/event/create" component={NewEvent} />
            <Route path="/event/:id" component={NewEvent} />
          </Switch>

      </div>
    </div>

  </div>
  </Router>
)
const wrapper = document.getElementById("App");
ReactDOM.render(<App />, wrapper)
