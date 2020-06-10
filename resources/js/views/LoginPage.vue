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
        <submit-button
          :loading="isLoading"
          text="Log In"
        />
      </div>
    </form>
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
