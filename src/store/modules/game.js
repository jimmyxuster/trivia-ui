import * as types from '../mutation-types'

const state = {
  gameState: 'none',
  socket: null
}

const getters = {
  gameState: state => state.gameState,
  socket: state => state.socket
}

const actions = {}

const mutations = {
  [types.ENTER_GAME] (state) {
    state.gameState = 'playing'
  },
  [types.QUIT_GAME] (state) {
    state.gameState = 'none'
    if (state.socket && (state.socket.readyState === WebSocket.CONNECTING ||
        state.socket.readyState === WebSocket.OPEN)) {
      state.socket.close()
      state.socket = null
    }
  },
  [types.SET_SOCKET] (state, socket) {
    if (state.socket && (state.socket.readyState === WebSocket.CONNECTING ||
        state.socket.readyState === WebSocket.OPEN)) {
      state.socket.close()
      state.socket = null
    }
    state.socket = socket
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
