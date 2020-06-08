import HTTP from 'http-common'

const blankUser = { username: '', role: 'guest' }

export function fetchCurrentUser () {
  return new Promise((resolve) => {
    HTTP.get('/api/user')
      .then((resp) => resolve(resp.data))
      .catch(() => resolve(blankUser))
  })
}

export function login (credentials) {
  return new Promise((resolve, reject) => {
    HTTP.get('/sanctum/csrf-cookie').then(() => {
      HTTP.post('/api/login', credentials)
        .then((resp) => resolve(resp.data))
        .catch((error) => {
          reject(error.response.data)
        })
    })
  })
}
