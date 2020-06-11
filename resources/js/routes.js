import LandingPage from 'views/LandingPage.vue'
import LoginPage from 'views/LoginPage'
import RegistrationPage from 'views/RegistrationPage.vue'

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
  }
]
