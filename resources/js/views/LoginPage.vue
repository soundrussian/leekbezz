<template>
  <div class="container mx-auto bg-white m-4 w-11/12 p-4 rounded shadow sm:w-1/2 sm:my-4">
    <form @submit.prevent="login">
      <h1 class="text-xl">
        Log In
      </h1>
      <div class="my-4">
        <validatable-input
          v-model="email"
          type="email"
          name="email"
          placeholder="Email"
          :errors="errors"
        />
        <validatable-input
          v-model="password"
          type="password"
          name="password"
          placelholder="Password"
          :errors="errors"
        />
      </div>
      <div class="text-right">
        <button
          class="bg-purple-700 disabled:opacity-50 text-purple-050 px-4 py-2 rounded"
          type="submit"
          :disabled="isLoading"
        >
          <svg
            v-if="isLoading"
            class="w-4 h-4 fill-current inline-block spin align-middle"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M12 10a2 2 0 0 1-3.41 1.41A2 2 0 0 1 10 8V0a9.97 9.97 0 0 1 10 10h-8zm7.9 1.41A10 10 0 1 1 8.59.1v2.03a8 8 0 1 0 9.29 9.29h2.02zm-4.07 0a6 6 0 1 1-7.25-7.25v2.1a3.99 3.99 0 0 0-1.4 6.57 4 4 0 0 0 6.56-1.42h2.1z" />
          </svg>
          <span class="align-middle">Log In</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ValidatableInput from 'components/common/ValidatableInput.vue'

export default {
  components: {
    ValidatableInput
  },
  data () {
    return {
      email: '',
      password: '',
      isLoading: false,
      errors: {}
    }
  },
  computed: {
    ...mapGetters([
      'isAuthenticated'
    ]),
    hasPasswordError () {
      return this.errors && this.errors.password && this.errors.password.length
    },
    passwordError () {
      if (this.errors && this.errors.password && this.errors.password.length) {
        return this.errors.password.join(' ')
      }
      return ''
    }
  },
  methods: {
    login () {
      if (this.isLoading) {
        return
      }
      this.isLoading = true
      this.errors = {}
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
        .finally(() => {
          this.isLoading = false
        })
    }
  }
}
</script>
