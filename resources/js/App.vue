<template>
  <div>
    <app-navbar />
    <router-view />
  </div>
</template>

<script>
import AppNavbar from 'components/AppNavbar.vue'

export default {
  components: {
    AppNavbar
  }
}

</script>
