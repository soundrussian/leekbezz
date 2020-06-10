<template>
  <div>
    <div v-if="isAuthenticated">
      <span class="hidden sm:block">{{ currentUser.name }}</span>
      <a href="#">Logout</a>
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
