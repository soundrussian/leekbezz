<template>
  <div>
    <div v-if="isAuthenticated">
      <span>{{ currentUser.username }}</span>
      Logout
    </div>
    <div v-else>
      Register | Login
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
