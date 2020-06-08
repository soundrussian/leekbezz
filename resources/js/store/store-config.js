import actions from './actions'
import mutations from './mutations'
import getters from './getters'

const state = {
  currentUser: {
    username: '',
    role: 'guest'
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
