export default {
  isAuthenticated (state) {
    return state.currentUser.role !== 'guest'
  }
}
