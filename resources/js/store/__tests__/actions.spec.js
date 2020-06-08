import actions from '../actions'
import { fetchCurrentUser, login } from 'api/api'
import flushPromises from 'flush-promises'

jest.mock('api/api')

describe('actions', () => {
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
})
