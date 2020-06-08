import HTTP from 'http-common'

export function fetchCurrentUser () {
  return new Promise((resolve) => {
    HTTP.get('/api/user')
      .then((resp) => resolve(resp.data))
      .catch(() => resolve({ username: '', role: 'guest' }))
  })
}
