import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import swal from 'sweetalert'
import toastr from './library/toastrOptions.js'
import jquery from 'jquery'
import vueCookies from 'vue-cookies'
import 'nprogress/nprogress.css'
import './assets/css/bootstrap.min.css'
import './assets/css/ready.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import moment from 'moment'

Vue.use(vueCookies)
moment.locale('id')

Vue.config.productionTip = false
Vue.prototype.axios = axios
Vue.prototype.toastr = toastr
Vue.prototype.axios = axios
Vue.prototype.swal = swal
Vue.prototype.$ = jquery
Vue.prototype.moment = moment
Vue.prototype.api = '/api'
Vue.prototype.token = window.$cookies.get('voicaT')

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
