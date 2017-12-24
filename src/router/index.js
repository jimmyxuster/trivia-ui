import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'
import Login from '../views/account/Login'
import Register from '../views/account/Register'
import Room from '../views/RoomList'
import GameView from '../views/GameView'

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
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/room',
      name: 'Room',
      component: Room
    },
    {
      path: '/gameview',
      name: 'GameView',
      component: GameView
    }
  ]
})
