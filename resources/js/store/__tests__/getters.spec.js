import getters from '../getters'

describe('getters', () => {
  test('isAuthenticated returns true if there is current user', () => {
    const state = {
      currentUser: { role: 'student' }
    }
    expect(getters.isAuthenticated(state)).toBe(true)
  })

  test('isAuthenticated returns false if there is no current user', () => {
    const state = {
      currentUser: { role: 'guest' }
    }
    expect(getters.isAuthenticated(state)).toBe(false)
  })
})
