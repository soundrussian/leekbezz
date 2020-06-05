import Vue from 'vue'
import App from 'App.vue'
import Router from 'router'
require('bootstrap')

const app = new Vue({ // eslint-disable-line no-unused-vars
  el: '#app',
  render: h => h(App),
  router: Router
})
