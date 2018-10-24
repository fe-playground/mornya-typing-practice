import Vue from 'vue'
import VeeValidate from 'vee-validate'
import * as utils from '@/utils'
import router from './router'
import store from './store'
import App from './App'

Vue.config.productionTip = false

Vue.filter('toTimeString', value => utils.TimeFormat.getTimeString(value))
Vue.filter('toTimeDiffString', value => utils.TimeFormat.diffTimeString(value))

Vue.use(VeeValidate)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
