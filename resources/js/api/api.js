export function fetchCurrentUser () {
  return new Promise((resolve) => {
    window.axios.get('/api/user')
      .then((resp) => resolve(resp))
      .catch(() => resolve({ role: 'guest' }))
  })
}
