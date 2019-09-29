import {observable, computed, action, toJS} from "mobx"
import {fetchInstance} from "../helpers/fetch";
import { BASE_URL } from '../config';
import cookie from 'react-cookies'

class Users {
  @observable token = cookie.load('token')
  @observable currentUser = observable.map({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    admin: false,
  })
  @observable users = []

  @action fetchCurrentUser = () => {
    fetchInstance.get(`${BASE_URL}/users/current`, {headers: {
        'Authorization': `JWT ${this.token}`
      }}).then(data => {
      this.currentUser.replace(data.user)
    })
  }

  @action login = (email, password) => {
    fetchInstance.post(`${BASE_URL}/login`, {email, password}).then(data => {
        const { token } = data.user
        this.token = token
        cookie.save('token', token)
    })
  }
  @action register = () => {
    fetchInstance.post(`${BASE_URL}/users/add`, this.currentUser.toJSON()).then(data => {
      const { user } = data
      this.token = user.token
      this.currentUser.replace(user)
    })
  }

  @action fetchUsers = () => {
    fetchInstance.get(`${BASE_URL}/users`, {headers: {
        'Authorization': `JWT ${this.token}`
      }}).then(data => {
        this.users = data
      }
    )
  }

}
const usersStore = new Users()

export default usersStore
