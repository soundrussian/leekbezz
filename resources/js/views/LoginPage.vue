<template>
  <div>
    <div class="container mx-auto bg-white m-4 w-11/12 p-4 rounded shadow md:w-1/2 md:my-4">
      <form @submit.prevent="login">
        <h1 class="text-xl">
          Log
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
            placeholder="Password"
            :errors="errors"
          />
        </div>
        <div class="flex justify-between items-center">
          <div class="text-sm">
            <router-link :to="{ name: 'RequestPasswordReset' }">
              Forgot password?
            </router-link>
          </div>
          <submit-button
            :loading="isLoading"
            text="Log In"
          />
        </div>
      </form>
    </div>
    <div class="text-center text-blue-grey-400 text-sm">
      Not a member? <router-link :to="{ name: 'Register' }">
        Sign up here
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ValidatableInput from 'components/common/ValidatableInput.vue'
import SubmitButton from 'components/common/SubmitButton'

export default {
  components: {
    SubmitButton,
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
    ])
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
