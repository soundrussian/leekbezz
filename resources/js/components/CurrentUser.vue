<template>
  <div>
    <div v-if="isAuthenticated">
      <span class="hidden sm:block">{{ currentUser.name }}</span>
      <logout-button />
    </div>
    <div v-else>
      <router-link :to="{ name: 'Register' }">
        Register
      </router-link>
      <router-link :to="{ name: 'Login' }">
        Login
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import LogoutButton from 'components/LogoutButton'

export default {
  components: {
    LogoutButton
  },
  computed: {
    ...mapState([
      'currentUser'
    ]),
    ...mapGetters([
      'isAuthenticated'
    ])
  }
}
</script>
