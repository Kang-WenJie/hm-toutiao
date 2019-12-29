import App from './App.vue'
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from '@/router/index.js'
import axios from '@/api/index'
import plugin from '@/plugin/index.js'
import '@/styles/index.less'
Vue.use(plugin)
Vue.prototype.$http = axios
Vue.prototype.$http = axios
// import router2 from '@/router/welcome.js'
Vue.use(ElementUI)
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
