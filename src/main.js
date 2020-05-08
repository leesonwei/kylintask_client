// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import qs from 'qs'
import store from './store'
import localStore from './store/localStore'

Vue.use(ElementUI)

Vue.config.productionTip = false
axios.defaults.baseURL = 'http://localhost:8061'
axios.interceptors.request.use(config => {
  config.headers.Authorization = store.state.global.token
  if (config.type === 'formData' || config.method !== 'post') {
    return config
  }
  config.data = qs.stringify(config.data)
  return config
}, (err) => {
  let error
  if (err && err.response) {
    if (err.response.data) {
      error = 'Status:' + err.response.status + ', ' + err.response.data.message
    } else {
      error = 'Status:' + err.response.status + ', ' + err.message
    }
  } else {
    error = err.message
  }
  return Promise.reject(error)
})
axios.interceptors.response.use((response) => {
  return response
}, function (err) {
  let error
  if (err && err.response) {
    if (err.response.data) {
      error = 'Status:' + err.response.status + ', ' + err.response.data.message
    } else {
      error = 'Status:' + err.response.status + ', ' + err.message
    }
  } else {
    error = err.message
  }
  return Promise.reject(error)
})
Vue.prototype.$http = axios
Vue.prototype.$localstore = localStore

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
