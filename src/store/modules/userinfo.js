import * as types from '../mutation-types'

const state = {
  username: '',
  token: ''
}

const getters = {
  username: state => state.username,
  token: state => state.token
}

const actions = {}

const mutations = {
  [types.SET_USERINFO] (state, userinfo) {
    state.username = userinfo.username || ''
    state.token = userinfo.token || ''
  },
  [types.CLEAR_USERINFO] (state) {
    state.username = ''
    state.token = ''
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
