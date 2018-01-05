import * as types from '../mutation-types'

const state = {
  gameState: 'none',
  gameType: '',
  socket: null,
  roomName: 0
}

const gameTypeMapping = {
  'Literature': '文学类题型',
  'Movie': '影视类题型',
  'Military': '军事类题型',
  'Geography': '地理类题型'
}

const getters = {
  gameState: state => state.gameState,
  gameType: state => gameTypeMapping[state.gameType] || state.gameType,
  roomName: state => state.roomName,
  socket: state => state.socket
}

const actions = {
  quitGame ({ state, commit, rootState }) {
    commit(types.QUIT_GAME)
    if (state.socket && (state.socket.readyState === WebSocket.CONNECTING ||
        state.socket.readyState === WebSocket.OPEN)) {
      state.socket.close()
      commit(types.CLEAR_SOCKET)
    }
  },
  setSocket ({ state, commit, rootState }, socket) {
    if (state.socket && (state.socket.readyState === WebSocket.CONNECTING ||
        state.socket.readyState === WebSocket.OPEN)) {
      console.log('send', JSON.stringify({ type: 'exitRoom', username: rootState.username, roomName: state.roomName }))
      state.socket.send(JSON.stringify({ type: 'exitRoom', username: rootState.username, roomName: state.roomName }))
      state.socket.close()
      commit(types.CLEAR_SOCKET)
    }
    commit(types.SET_SOCKET, socket)
  }
}

const mutations = {
  [types.ENTER_GAME] (state, id) {
    state.gameState = 'playing'
    state.roomName = id
  },
  [types.QUIT_GAME] (state) {
    state.roomName = 0
    state.gameType = ''
    state.gameState = 'none'
  },
  [types.CLEAR_SOCKET] (state) {
    state.socket = null
  },
  [types.SET_SOCKET] (state, socket) {
    state.socket = socket
  },
  [types.SET_GAME_TYPE] (state, type) {
    state.gameType = type
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
