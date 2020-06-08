import LandingPage from 'views/LandingPage.vue'
import LoginPage from 'views/LoginPage'

export default [
  {
    path: '/',
    name: 'Home',
    component: LandingPage
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  }
]
