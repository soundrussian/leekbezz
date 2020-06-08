<template>
  <div class="container mx-auto bg-white m-4 w-11/12 p-4 rounded shadow sm:w-1/2 sm:my-4">
    <form @submit.prevent="login">
      <h1 class="text-xl">
        Log In
      </h1>
      <div
        v-if="emailErrors"
        class="bg-red-600 text-red-100 p-4 mt-2 text-sm"
      >
        {{ emailErrors }}
      </div>
      <div class="my-4">
        <input
          v-model="email"
          type="email"
          name="email"
          placeholder="Email"
          class="block w-full bg-blue-grey-050 my-2 p-2 rounded border-2 border-blue-grey-050 placeholder-grey-900 focus:border-blue-grey-100"
        >
        <input
          v-model="password"
          type="password"
          name="password"
          placeholder="Password"
          class="block w-full bg-blue-grey-050 my-2 p-2 rounded border-2 border-blue-grey-050 placeholder-grey-900 focus:border-blue-grey-100"
        >
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
import _ from 'lodash'
import { mapGetters } from 'vuex'

export default {
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
    emailErrors () {
      if (this.errors && Object.values(this.errors).length) {
        return _.flatten(Object.values(this.errors)).join(' ')
      } else {
        return false
      }
    }
  },
  methods: {
    login () {
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
