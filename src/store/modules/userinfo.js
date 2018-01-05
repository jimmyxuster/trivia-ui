import * as types from '../mutation-types'

const state = {
  username: '',
  winCount: 0,
  totalPlay: 0,
  avatarUrl: ''
}

const getters = {
  username: state => state.username,
  winCount: state => state.winCount,
  totalPlay: state => state.totalPlay,
  avatarUrl: state => state.avatarUrl
}

const actions = {}

const mutations = {
  [types.SET_USERINFO] (state, userinfo) {
    state.username = userinfo.username || ''
    state.winCount = userinfo.winCount || 0
    state.totalPlay = userinfo.totalPlay || 0
    state.avatarUrl = userinfo.avatarUrl || ''
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
