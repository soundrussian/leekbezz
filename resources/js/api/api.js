import HTTP from 'http-common'

export function fetchCurrentUser () {
  return new Promise((resolve, reject) => {
    HTTP.get('/api/user')
      .then((resp) => resolve(resp.data))
      .catch((error) => reject(error))
  })
}

export function login (credentials) {
  return new Promise((resolve, reject) => {
    HTTP.get('/sanctum/csrf-cookie').then(() => {
      HTTP.post('/api/login', credentials)
        .then((resp) => resolve(resp.data))
        .catch((error) => reject(error))
    })
  })
}

export function logout () {
  return new Promise((resolve, reject) => {
    HTTP.delete('/api/logout')
      .then(() => resolve('Logged out'))
      .catch(() => reject(new Error('Failed to log out')))
  })
}
