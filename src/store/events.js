import {observable, computed, action, toJS} from "mobx"
import {fetchInstance} from "../helpers/fetch";
import { BASE_URL } from '../config';

class Events {
  @observable currentEventId = 10
  @observable events = []

  @action fetchEventList = () => {
    fetchInstance.get(`${BASE_URL}/events/`).then(data => {
      this.events = data
    })
  }

  @action setCurrentEvent = id => {
    this.currentEventId = id
  }
}
const eventsStore = new Events()
export default eventsStore
