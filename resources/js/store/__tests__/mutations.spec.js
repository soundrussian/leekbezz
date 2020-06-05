import mutations from '../mutations'

describe('mutations', () => {
  test('setCurrentUser sets stat.currentUser to user', () => {
    const user = { email: 'jonh.doe@example.com' }
    const state = {
      currentUser: {}
    }
    mutations.setCurrentUser(state, { user })
    expect(state.currentUser).toBe(user)
  })
})
