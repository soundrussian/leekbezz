import actions from '../actions'
import { fetchCurrentUser } from 'api/api'
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
})
