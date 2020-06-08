<template>
  <div>
    <app-navbar />
    <router-view />
  </div>
</template>

<script>
import AppNavbar from 'components/TheNavbar.vue'

export default {
  components: {
    AppNavbar
  }
}

</script>
