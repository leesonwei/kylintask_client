import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import main from '@/components/main'
import KylinProject from '@/components/KylinProject'
import KylinTask from '@/components/KylinTask'
import KylinJob from '@/components/KylinJob'
import KylinLog from '@/components/KylinLog'

Vue.use(Router)

const routerPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return routerPush.call(this, location).catch(error => error)
}

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/logout',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/kylin',
      name: 'main',
      component: main,
      children: [
        {
          path: '/',
          redirect: '/kylin/project'
        },
        {
          path: '/kylin/project',
          name: 'project',
          component: KylinProject
        },
        {
          path: '/kylin/task',
          name: 'task',
          component: KylinTask
        },
        {
          path: '/kylin/job',
          name: 'job',
          component: KylinJob
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
