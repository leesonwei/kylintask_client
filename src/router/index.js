import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import main from '@/components/main'
import KylinTask from '@/components/KylinTask'
import KylinLog from '@/components/KylinLog'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/kylin',
      name: 'main',
      component: main,
      children: [
        {
          path: '/kylin/task',
          name: 'task',
          component: KylinTask
        },
        {
          path: '/kylin/log',
          name: 'log',
          component: KylinLog
        }
      ]
    }
  ]
})
