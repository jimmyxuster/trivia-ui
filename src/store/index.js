import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import userinfo from './modules/userinfo'
import game from './modules/game'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    userinfo,
    game
  },
  strict: debug
})
