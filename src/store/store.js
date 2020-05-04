import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    createTaskVisiable: false,
    count: 6,
    userInfo: {},
    students: []
  },
  getters: {

  },
  mutations: {
    setCreateTaskVisiable (state, visiable) {
      state.createTaskVisiable = visiable
    },
    updateCount (state, count) {
      state.count = count
    },
    getUserInfo (state, userInfo) {
      state.userInfo = userInfo
    },
    getStudents (state, students) {
      state.students = students
    }
  },
  actions: {
    updateCountAsync ({commit, state}, count) {
      setTimeout(function () {
        console.log('count:' + count)
        commit('updateCount', count)
      }, 1000)
    },
    getUserInfo ({commit, state}, _this) {
      let _vm = _this
      console.log(_vm)
      _vm.$http.get('http://localhost:8080/static/data/user.json').then(res => {
        console.log(res)
        commit('getUserInfo', res.data)
      })
    },
    getStudents ({commit, state}, _this) {
      let _vm = _this
      _vm.$http.get('/api/students').then(res => {
        console.log(res)
        commit('getStudents', res.data.data.students)
      })
    }
  }
})
