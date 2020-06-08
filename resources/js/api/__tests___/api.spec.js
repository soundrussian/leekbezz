import moxios from 'moxios'
import { fetchCurrentUser } from '../api'

describe('api', () => {
  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  describe('fetchCurrentUser', () => {
    it('resolves with current user if request successful', () => {
      const expected = { username: 'John Doe', role: 'student' }
      moxios.stubRequest('/api/user', {
        status: 200,
        response: expected
      })

      return expect(fetchCurrentUser()).resolves.toBe(expected)
    })

    it('resolves with empty guest user if request unsuccessful', () => {
      const expected = { username: '', role: 'guest' }
      moxios.stubRequest('/api/user', {
        status: 401
      })

      return expect(fetchCurrentUser()).resolves.toEqual(expected)
    })
  })
})
