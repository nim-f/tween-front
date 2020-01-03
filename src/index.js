import React from 'react'
import ReactDOM from 'react-dom'
import { Switch, Route, BrowserRouter as Router, NavLink } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { Provider } from 'react-redux'
import './index.css'
import 'react-day-picker/lib/style.css';

import Header from 'components/header'
import Notification from 'components/notification'
import NewEvent from './pages/events/new_event'
import Register from './pages/register'
import Dashboard from './pages/dashboard'
import Event from './pages/event'
import createStore from 'reduxConfig'

import Login from './pages/login'
import Sidebar from './components/sidebar';
const { store, history } = createStore()

const App = () => (
  <Provider store={store}>

    <ConnectedRouter history={history}>
    <div>

      <Switch>
        <Route path="/login" render={() => null} />
        <Route path="/" render={() => <Header />} />
      </Switch>
      <div className="main">
        <Switch>
          <Route path="/login" render={() => null} />
          <Route path="/" render={() => <Sidebar />} />
        </Switch>

        <div className="col__right">
            <Switch>
              <Route path="/login" component={Login}  />
              <Route path="/register" component={Register} />
              <Route path="/event/create" component={NewEvent} exact />
              <Route path="/event/:id" component={Event} exact />
              <Route path="/" component={Dashboard} exact />
            </Switch>
        </div>
      </div>
      <Notification />
    </div>
    </ConnectedRouter>
  </Provider>
)
const wrapper = document.getElementById("App");
ReactDOM.render(<App />, wrapper)
