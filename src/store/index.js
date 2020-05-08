import Vue from 'vue'
import Vuex from 'vuex'

import CreateTaskStore from './CreateTaskStore'
import EditTaskStore from './EditTaskStore'
import connect from './connect'
import global from './global'

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    createTaskStore: CreateTaskStore,
    editTaskStore: EditTaskStore,
    global: global,
    connect: connect
  }
})
