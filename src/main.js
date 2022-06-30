import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import axios from 'axios'

import user from "./server/userData.json"
import cookie from "./server/cookie"

Vue.prototype.$http = axios

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  let user = cookie.getcookie("isactive")
  if (to.name !== 'UserLogin' && !user) next({ name: 'UserLogin' })
  else next()
})


new Vue({
  render: h => h(App),
  router
}).$mount('#app')
