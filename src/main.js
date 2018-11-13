import Vue from 'vue'
import router from '@/router'
import store from '@/store'
import '@/plugins'
import * as utils from '@/utils'
import App from './App'

Vue.config.productionTip = false
Vue.prototype.$utils = utils

Vue.filter('toTimeString', value => utils.TimeFormat.getTimeString(value))
Vue.filter('toTimeDiffString', value => utils.TimeFormat.diffTimeString(value))

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
