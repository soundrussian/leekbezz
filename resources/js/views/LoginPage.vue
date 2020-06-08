<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login">
      <input
        v-model="email"
        type="email"
        name="email"
      >
      <span v-if="emailErrors">
        {{ emailErrors }}
      </span>
      <input
        v-model="password"
        type="password"
        name="password"
      >
      <button type="submit">
        Login
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      email: '',
      password: '',
      errors: {}
    }
  },
  computed: {
    ...mapGetters([
      'isAuthenticated'
    ]),
    emailErrors () {
      if (this.errors.email && this.errors.email.length) {
        return this.errors.email.join('; ')
      } else {
        return false
      }
    }
  },
  methods: {
    login () {
      this.$store.dispatch('login', {
        email: this.email,
        password: this.password
      })
        .then(() => {
          this.$nextTick(() => {
            if (this.isAuthenticated) {
              this.$router.push({ name: 'Home' })
            }
          })
        })
        .catch((error) => {
          this.errors = error.response.data.errors
        })
    }
  }
}
</script>
