import LandingPage from 'views/LandingPage.vue'
import LoginPage from 'views/LoginPage'
import RegistrationPage from 'views/RegistrationPage.vue'
import RequestPasswordResetPage from 'views/RequestPasswordResetPage'

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
  },
  {
    path: '/register',
    name: 'Register',
    component: RegistrationPage
  },
  {
    path: '/forgot',
    name: 'RequestPasswordReset',
    component: RequestPasswordResetPage
  }
]
