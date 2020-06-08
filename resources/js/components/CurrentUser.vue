<template>
  <div>
    <div v-if="isAuthenticated">
      <span>{{ currentUser.name }}</span>
      Logout
    </div>
    <div v-else>
      <router-link to="/register">
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
export default {
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
