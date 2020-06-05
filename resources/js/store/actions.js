import fetchCurrentUser from 'api/api'

export default {
  fetchCurrentUser ({ commit }) {
    return fetchCurrentUser()
      .then(user => commit('setCurrentUser', { user }))
  }
}
