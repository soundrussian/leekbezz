import actions from '../actions'
import { fetchCurrentUser, login, logout, register } from 'api/api'
import flushPromises from 'flush-promises'

const blankUser = { username: '', role: 'guest' }

jest.mock('api/api')

describe('actions', () => {
  describe('fetchCurrentUser', () => {
    test('fetchCurrentUser calls commit with the result of the HTTP request', async () => {
      expect.assertions(1)
      const user = { email: 'john.doe@example.com' }
      fetchCurrentUser.mockImplementationOnce(() => {
        return Promise.resolve(user)
      })
      const context = {
        commit: jest.fn()
      }
      actions.fetchCurrentUser(context)
      await flushPromises()
      expect(context.commit).toHaveBeenCalledWith('setCurrentUser', { user })
    })

    test('unsuccessful fetch sets blankUser', async () => {
      expect.assertions(1)
      fetchCurrentUser.mockImplementationOnce(() => {
        return Promise.reject(new Error('unauthenticated'))
      })
      const context = {
        commit: jest.fn()
      }
      actions.fetchCurrentUser(context)
      await flushPromises()
      expect(context.commit).toHaveBeenCalledWith('setCurrentUser', { user: blankUser })
    })
  })

  describe('login', () => {
    test('login sets current user', async () => {
      expect.assertions(1)
      const user = { email: 'john.doe@example.com' }
      login.mockImplementationOnce(() => {
        return Promise.resolve(user)
      })
      const context = {
        commit: jest.fn()
      }
      actions.login(context, {})
      await flushPromises()
      expect(context.commit).toHaveBeenCalledWith('setCurrentUser', { user })
    })

    test('unsuccesful login sets blank user', async () => {
      expect.assertions(1)
      login.mockImplementationOnce(() => {
        return Promise.reject(new Error('unauthenticated'))
      })
      const context = {
        commit: jest.fn()
      }
      actions.login(context, {}).catch(() => {})
      await flushPromises()
      expect(context.commit).toHaveBeenCalledWith('setCurrentUser', { user: blankUser })
    })
  })

  describe('logout', () => {
    it('calls api logout and resets user', async () => {
      expect.assertions(1)
      logout.mockImplementationOnce(() => {
        return Promise.resolve()
      })
      const context = {
        commit: jest.fn()
      }
      actions.logout(context)
      await flushPromises()
      expect(context.commit).toHaveBeenCalledWith('setCurrentUser', { user: blankUser })
    })
  })

  describe('register', () => {
    it('calls api and sets user if successful', async () => {
      const user = { email: 'john.doe@example.com' }
      register.mockImplementationOnce(() => Promise.resolve(user))
      const context = { commit: jest.fn() }

      actions.register(context, user)
      await flushPromises()

      expect(context.commit).toHaveBeenCalledWith('setCurrentUser', { user })
    })

    it('calls api and sets blank if error', async () => {
      const user = { email: 'john.doe@example.com' }
      register.mockImplementationOnce(() => Promise.reject(new Error('invalid')))
      const context = { commit: jest.fn() }

      actions.register(context, user).catch(() => {})
      await flushPromises()

      expect(context.commit).toHaveBeenCalledWith('setCurrentUser', { user: blankUser })
    })
  })
})
