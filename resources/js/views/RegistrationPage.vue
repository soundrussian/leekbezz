<template>
  <div>
    <div class="container mx-auto bg-white m-4 w-11/12 p-4 rounded shadow md:w-1/2 md:my-4">
      <form @submit.prevent="register">
        <h1 class="text-xl">
          Register
        </h1>
        <div class="my-4">
          <validatable-input
            v-model="name"
            type="text"
            name="name"
            placeholder="Your name"
            :errors="errors"
          />
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
          <validatable-input
            v-model="passwordConfirmation"
            type="password"
            name="password_confirmation"
            placeholder="Confirm password"
            :errors="errors"
          />
        </div>
        <div class="text-right">
          <submit-button
            :loading="isLoading"
            text="Register"
          />
        </div>
      </form>
    </div>
    <div class="text-center text-gray-500 text-sm">
      Already a member? <router-link :to="{ name: 'Login' }">
        Sign in here
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ValidatableInput from 'components/common/ValidatableInput'
import SubmitButton from 'components/common/SubmitButton'

export default {
  components: {
    SubmitButton,
    ValidatableInput
  },
  data () {
    return {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
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
    register () {
      if (this.isLoading) {
        return
      }
      this.isLoading = true
      this.errors = {}
      this.$store.dispatch('register', {
        name: this.name,
        email: this.email,
        password: this.password,
        passwordConfirmation: this.passwordConfirmation
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
