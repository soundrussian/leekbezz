<template>
  <div class="flex justify-between p-4 bg-white border-b border-gray-300">
    <router-link
      to="/"
      class="font-bold"
    >
      LeekBezz
    </router-link>
    <current-user />
  </div>
</template>

<script>
import CurrentUser from 'components/CurrentUser'

export default {
  components: {
    CurrentUser
  }
}
</script>
