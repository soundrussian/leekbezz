import Vue from 'vue'
import Vuex from 'vuex'
import App from 'App.vue'
import Router from 'router'
import storeConfig from 'store/store-config'
require('bootstrap')

Vue.use(Vuex)
const store = new Vuex.Store(storeConfig)

const app = new Vue({ // eslint-disable-line no-unused-vars
  el: '#app',
  created () {
    this.$store.dispatch('fetchCurrentUser')
  },
  render: h => h(App),
  router: Router,
  store
})
