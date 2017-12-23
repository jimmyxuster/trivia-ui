import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)

/* eslint-disable */

const HOST = 'http://127.0.0.1:8080'

Vue.http.interceptors.push((request, next) => {
  request.credentials = true
  next()
})

/**
 * 调用接口
 * @param {string} apiContext
 * @param {string} method
 * @param {*} data
 * @return {Promise}
 */
const callApi = function (apiContext, method, data, option) {
  if (!Vue || !Vue.http) throw new Error('error: depended on Vue and Vue-resource')
  let uri = HOST + apiContext
  if (Vue.http[method]) {
    if (data) return Vue.http[method](uri, data, option)
    else return Vue.http[method](uri)
  } else {
    throw new Error('error: method: [' + method + '] not supported')
  }
}

const callApiPost = function (apiContext, data, option = {})/* : Promise */ {
  return callApi(apiContext, 'post', data, option)
}

const callApiDelete = function (apiContext, data, option = {})/* : Promise */ {
  return callApi(apiContext, 'delete', data, option)
}

const callApiGet = function (apiContext, data, option = {})/* : Promise */ {
  return callApi(apiContext, 'get', data, option)
}

class Api {
  login (data) {
    return callApiPost('/login', data)
  }

  register (data) {
    return callApiPost('/user', data)
  }

  logout () {
    return callApiGet('/logout')
  }

  getUserInfo () {
    return callApiGet('/user')
  }

  getRooms () {
    return new Promise((resolve) => {
      resolve({
        code: 0,
        body: [
          {
            roomNo: '001',
            roomStatus: 'avail',
            players: [
              {
                username: 'jimmy',
              }
            ]
          },
          {
            roomNo: '002',
            roomStatus: 'playing',
            players: [
              {
                username: 'van',
              },
              {
                username: 'billy',
              },
              {
                username: 'dark',
              },
              {
                username: '后母',
              }
            ]
          },
          {
            roomNo: '003',
            roomStatus: 'avail',
            players: [
              {
                username: 'van',
              },
              {
                username: 'billy',
              }
            ]
          },
        ]
      })
    })
  }
}

export default new Api()
