import axios from 'axios'

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

export function fetchCurrentUser () {
  return new Promise((resolve) => {
    axios.get('/api/user')
      .then((resp) => resolve(resp.data))
      .catch(() => resolve({ username: '', role: 'guest' }))
  })
}
