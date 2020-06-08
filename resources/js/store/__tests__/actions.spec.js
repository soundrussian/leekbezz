import actions from '../actions'
import { fetchCurrentUser, login } from 'api/api'
import flushPromises from 'flush-promises'

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
      expect(context.commit).toHaveBeenCalledWith('setCurrentUser', { user: actions.blankUser })
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
      actions.login(context, {})
      await flushPromises()
      expect(context.commit).toHaveBeenCalledWith('setCurrentUser', { user: actions.blankUser })
    })
  })
})
