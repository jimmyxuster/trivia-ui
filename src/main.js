// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import * as mutationTypes from './store/mutation-types'
import api from './service/api'

Vue.use(ElementUI)
Vue.config.productionTip = false

let loginStatus = 200

router.beforeEach((to, from, next) => {
  if (to.path !== '/login' && to.path !== '/register') {
    if (store.state.userinfo.username === '' || loginStatus !== 200) {
      next('/login')
    }
  } else {
    next()
  }
})

/* eslint-disable no-new */
api.getUserInfo()
  .catch(err => {
    loginStatus = err.status
    return err
  })
  .then(res => {
    console.log('res', res)
    if (res.body.code === 0) {
      store.commit(mutationTypes.SET_USERINFO, {
        username: res.body.username
      })
    } else {
      loginStatus = res.body.code || res.status
    }
  })
  .then(() => {
    console.log('loginStatus', loginStatus)
    new Vue({
      el: '#app',
      router,
      store,
      template: '<App/>',
      components: {App}
    })
  })
