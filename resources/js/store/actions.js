import { fetchCurrentUser, login, logout } from 'api/api'

const blankUser = { username: '', role: 'guest' }

export default {
  fetchCurrentUser ({ commit }) {
    return fetchCurrentUser()
      .then(user => commit('setCurrentUser', { user }))
      .catch(() => commit('setCurrentUser', { user: blankUser }))
  },

  login ({ commit }, credentials) {
    return login(credentials)
      .then(user => commit('setCurrentUser', { user }))
      .catch((error) => {
        commit('setCurrentUser', { user: blankUser })
        return Promise.reject(error)
      })
  },

  logout ({ commit }) {
    return logout().finally(() => commit('setCurrentUser', { user: blankUser }))
  }
}
