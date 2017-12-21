import * as types from '../mutation-types'

const state = {
  username: ''
}

const getters = {
  username: state => state.username
}

const actions = {}

const mutations = {
  [types.SET_USERINFO] (state, userinfo) {
    state.username = userinfo.username || ''
  },
  [types.CLEAR_USERINFO] (state) {
    state.username = ''
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
