import { fetchCurrentUser, login } from 'api/api'

const blankUser = { username: '', role: 'guest' }

export default {
  blankUser,

  fetchCurrentUser ({ commit }) {
    return fetchCurrentUser()
      .then(user => commit('setCurrentUser', { user }))
      .catch(() => commit('setCurrentUser', { user: blankUser }))
  },

  login ({ commit }, credentials) {
    return login(credentials)
      .then(user => commit('setCurrentUser', { user }))
      .catch(() => commit('setCurrentUser', { user: blankUser }))
  }
}
