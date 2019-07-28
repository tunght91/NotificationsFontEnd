import Vue from 'vue'
import Router from 'vue-router'

// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer')

// Views
// const Dashboard = () => import('@/views/Dashboard')

// Views - Pages
const Login = () => import('@/views/pages/Login')
const Register = () => import('@/views/pages/Register')
const News = () => import('@/views/pages/News')
const Notifications = () => import('@/views/pages/Notifications')
const NotificationDetail = () => import('@/views/pages/NotificationDetail')

// // Users
// const Users = () => import('@/views/users/Users')
// const User = () => import('@/views/users/User')

import {TokenService} from '../services/storage.service'

Vue.use(Router)

const router =  new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/notifications',
      name: 'Home',
      component: DefaultContainer,
      children: [
        {
          path: 'notifications',
          name: 'Notifications',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: '',
              name: 'List',
              component: Notifications
            },
            {
              path: 'create',
              name: 'CreateNews',
              component: News
            },{
              path: ':id',
              meta: { label: 'Detail'},
              name: 'Notification',
              component: NotificationDetail,
            },
          ]
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        public: true,  // Allow access to even if not logged in
        onlyWhenLoggedOut: true
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
  ]
})

router.beforeEach((to, from, next) => {
  const isPublic = to.matched.some(record => record.meta.public)
  const onlyWhenLoggedOut = to.matched.some(record => record.meta.onlyWhenLoggedOut)
  const loggedIn = !!TokenService.getToken();

  if (!isPublic && !loggedIn) {
    console.log(to, from);
    if (to.name == 'Register'){
      return next()
    }
    return next({
      path:'/login',
      query: {redirect: to.fullPath}  // Store the full path to redirect the user to after login
    });
  }

  // Do not allow user to visit login page or register page if they are logged in
  if (loggedIn && onlyWhenLoggedOut) {
    return next('/')
  }
  next();
})

export default router;
