import { fetchCurrentUser, login } from 'api/api'

export default {
  fetchCurrentUser ({ commit }) {
    return fetchCurrentUser().then(user => commit('setCurrentUser', { user }))
  },

  login ({ commit }, credentials) {
    return login(credentials).then(user => commit('setCurrentUser', { user }))
  }
}
