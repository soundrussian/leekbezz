import HTTP from 'http-common'
import moxios from 'moxios'
import { fetchCurrentUser, login, logout, register, requestPasswordReset, resetPassword } from '../api'

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

    it('rejects if request unsuccessful', () => {
      const expected = { message: 'Unauthenticated.' }
      moxios.stubRequest('/api/user', {
        status: 401,
        response: expected
      })

      return expect(fetchCurrentUser()).rejects.toMatchObject({ response: { data: expected } })
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

    it('rejects with errors if request unsuccessful', () => {
      const expected = { errors: { email: ['Invalid credentials'] } }
      moxios.stubRequest('/api/login', {
        status: 401,
        response: expected
      })

      return expect(login({})).rejects.toMatchObject({ response: { data: expected } })
    })
  })

  describe('logout', () => {
    it('it resolves if request is successful', () => {
      moxios.stubRequest('/api/logout', {
        status: 204
      })

      return expect(logout()).resolves.toEqual('Logged out')
    })

    it('it rejects if failed to logout', () => {
      moxios.stubRequest('/api/logout', {
        status: 500
      })

      return expect(logout()).rejects.toMatchObject({ message: 'Failed to log out' })
    })
  })

  describe('register', () => {
    it('resolves with user if registration is successful', () => {
      const expected = { username: 'John Doe', role: 'student' }
      moxios.stubRequest('/api/users', {
        status: 200,
        response: expected
      })

      return expect(register({})).resolves.toEqual(expected)
    })

    it('correctly prepares params', (done) => {
      const params = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password',
        passwordConfirmation: 'password'
      }
      register(params)

      moxios.wait(function () {
        const request = moxios.requests.mostRecent()
        expect(JSON.parse(request.config.data)).toEqual({
          email: params.email,
          name: params.name,
          password: params.password,
          password_confirmation: params.passwordConfirmation
        })
        done()
      })
    })

    it('rejects with errors if request unsuccessful', () => {
      const expected = { errors: { email: ['Invalid email'] } }
      moxios.stubRequest('/api/users', {
        status: 422,
        response: expected
      })

      return expect(register({})).rejects.toMatchObject({ response: { data: expected } })
    })
  })

  describe('requestPasswordReset', () => {
    it('resolves with message if success', () => {
      const message = 'expected message'
      moxios.stubRequest('/api/forgot', {
        status: 200,
        response: { message }
      })

      return expect(requestPasswordReset({})).resolves.toEqual({ message })
    })

    it('rejects with errors if request unsuccessful', () => {
      const expected = { errors: { email: ['Invalid email'] } }
      moxios.stubRequest('/api/forgot', {
        status: 422,
        response: expected
      })

      return expect(requestPasswordReset({})).rejects.toMatchObject({ response: { data: expected } })
    })
  })

  describe('resetPassword', () => {
    it('resolves with user if reset is successful', () => {
      const expected = { username: 'John Doe', role: 'student' }
      moxios.stubRequest('/api/forgot', {
        status: 200,
        response: expected
      })

      return expect(resetPassword({})).resolves.toEqual(expected)
    })

    it('correctly prepares params', (done) => {
      const params = {
        email: 'john.doe@example.com',
        password: 'password',
        passwordConfirmation: 'password',
        token: 'example-token'
      }
      resetPassword(params)

      moxios.wait(function () {
        const request = moxios.requests.mostRecent()
        expect(JSON.parse(request.config.data)).toEqual({
          email: params.email,
          password: params.password,
          password_confirmation: params.passwordConfirmation,
          token: params.token
        })
        done()
      })
    })

    it('rejects with errors if request unsuccessful', () => {
      const expected = { errors: { email: ['Invalid email'] } }
      moxios.stubRequest('/api/forgot', {
        status: 422,
        response: expected
      })

      return expect(resetPassword({})).rejects.toMatchObject({ response: { data: expected } })
    })
  })
})
