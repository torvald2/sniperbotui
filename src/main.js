import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueCookies from 'vue-cookies'


Vue.config.productionTip = false

Vue.config.productionTip = false
// Vue.config.errorHandler = function (err, vm,) {
//   vm.$store.state.error = err.message
// }
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueCookies)
Vue.use(VueCookies)

Vue.$cookies.config('30d')



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


