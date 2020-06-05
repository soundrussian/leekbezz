export default {
  isAuthenticated (state) {
    return state.currentUser.email !== undefined
  }
}
