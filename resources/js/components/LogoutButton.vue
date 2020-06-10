<template>
  <a href="#" @click.prevent="logout">Log out</a>
</template>

<script>
export default {
  methods: {
    logout () {
      this.$store.dispatch('logout').finally(() => {
        this.$router.push({ name: 'Home' })
      })
    }
  }
}
</script>
