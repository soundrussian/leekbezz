import HTTP from 'http-common'
import moxios from 'moxios'
import { fetchCurrentUser, login } from '../api'

describe('api', () => {
  beforeEach(() => {
    moxios.install(HTTP)
  })

  afterEach(() => {
    moxios.uninstall(HTTP)
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

  describe('login', () => {
    beforeEach(() => {
      // mock request to /sanctum/csrf-cookie
      moxios.stubRequest('/sanctum/csrf-cookie', {
        status: 200
      })
    })

    it('resolves with user if login is successful', () => {
      const expected = { username: 'John Doe', role: 'student' }
      moxios.stubRequest('/api/login', {
        status: 200,
        response: expected
      })

      return expect(login({})).resolves.toEqual(expected)
    })

    it('resolves with empty guest user if request unsuccessful', () => {
      const expected = { username: '', role: 'guest' }
      moxios.stubRequest('/api/login', {
        status: 401
      })

      return expect(login({})).resolves.toEqual(expected)
    })
  })
})
