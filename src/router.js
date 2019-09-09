import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'users',
      component: () => import('./views/Users.vue')
    },
    {
      path: '/saveOrEditUser/:userId?',
      name: 'saveOrEditUser',
      component: () => import('./views/SaveOrEditUser.vue')
    }
  ]
})
