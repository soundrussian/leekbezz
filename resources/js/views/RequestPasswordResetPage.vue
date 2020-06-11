<template>
  <div>
    <div class="container mx-auto bg-white m-4 w-11/12 p-4 rounded shadow md:w-1/2 md:my-4">
      <form @submit.prevent="requestPasswordReset">
        <h1 class="text-xl">
          Reset password
        </h1>
        <div
          v-if="message"
          class="text-sm bg-teal-100 text-teal-600 p-4 rounded-md mt-4"
        >
          {{ message }}
        </div>
        <div class="my-4">
          <validatable-input
            v-model="email"
            type="email"
            name="email"
            placeholder="Email"
            :errors="errors"
          />
        </div>
        <div class="text-right">
          <submit-button
            :loading="isLoading"
            text="Send password reset instructions"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
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
      isLoading: false,
      message: '',
      errors: {}
    }
  },
  methods: {
    requestPasswordReset () {
      if (this.isLoading) {
        return
      }
      this.isLoading = true
      this.errors = {}
      this.$store.dispatch('requestPasswordReset', {
        email: this.email
      })
        .then(({ message }) => {
          this.message = message
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
