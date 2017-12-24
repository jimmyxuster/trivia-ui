import * as types from '../mutation-types'

const state = {
  gameState: 'none'
}

const getters = {
  gameState: state => state.gameState
}

const actions = {}

const mutations = {
  [types.ENTER_GAME] (state) {
    state.gameState = 'playing'
  },
  [types.QUIT_GAME] (state) {
    state.gameState = 'none'
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
