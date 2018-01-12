import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'
// import Login from '../views/account/Login'
// import Register from '../views/account/Register'
// import Room from '../views/RoomList'
// import GameView from '../views/GameView'
// import Person from '../views/Person'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'App',
      component: App
    },
    {
      path: '/login',
      name: 'Login',
      component: resolve => require(['../views/account/Login.vue'], resolve)
    },
    {
      path: '/register',
      name: 'Register',
      component: resolve => require(['../views/account/Register.vue'], resolve)
    },
    {
      path: '/room',
      name: 'Room',
      component: resolve => require(['../views/RoomList.vue'], resolve)
    },
    {
      path: '/gameview',
      name: 'GameView',
      component: resolve => require(['../views/GameView.vue'], resolve)
    },
    {
      path: '/me',
      name: 'Me',
      component: resolve => require(['../views/Person.vue'], resolve)
    }
  ]
})
