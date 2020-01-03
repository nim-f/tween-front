import React, { Component } from 'react';
import { observer } from 'mobx-react'
import {observable, action, toJS} from "mobx"
import {fetchInstance} from "../../helpers/fetch";
import {BASE_URL} from "../../config";
import EventForm from 'components/event_form'
import IsLoggedIn from 'components/is_logged'
// import usersStore from 'store/users'

function NewEvent() {
  // event = observable.map({
  //   start:{
  //     value: '',
  //     updated_by: '',
  //   },
  //   end:{
  //     value: '',
  //     updated_by: '',
  //   },
  //   title: {
  //     value: '',
  //     updated_by: '',
  //   },
  //   subtitle: {
  //     value: '',
  //     updated_by: '',
  //   },
  //   description: {
  //     value: '',
  //     updated_by: '',
  //   },
  //   venue: {
  //     value: '',
  //     updated_by: '',
  //   },
  //   lpLink: {
  //     value: '',
  //     updated_by: '',
  //   },
  //   surveyLink: {
  //     value: '',
  //     updated_by: '',
  //   },
  //   color: {
  //     value: '',
  //     updated_by: '',
  //   },
  // })

  // @action change = (key, value) => {
  //   this.event.set(key, { value, updated_by: usersStore.currentUser.get('email') })
  // }
  //
  // @action save = () => {
  //   const { id } = this.props.match.params
  //   if (id) {
  //     fetchInstance.post(`${BASE_URL}/events/${id}`, toJS(this.event)).then(data => console.log(data))
  //   } else {
  //     fetchInstance.post(`${BASE_URL}/events`, toJS(this.event)).then(data => console.log(data))
  //
  //   }
  // }

  // @action fetchEvent = id => {
  //   fetchInstance.get(`${BASE_URL}/events/${id}`).then(data => {
  //     this.event.replace(data)
  //   })
  // }

  // componentDidMount() {
  //   const { id } = this.props.match.params
  //   // if (id) this.fetchEvent(id)
  //   // usersStore.fetchUsers()
  // }

    return (
      <EventForm />
    )


}

export default IsLoggedIn(NewEvent);
