import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

// bootstrapVue
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)
import 'popper.js'

// axios
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios); //啟用 vue-axios, axios

// sweetalert2
import VueSweetalert2 from 'vue-sweetalert2';
// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';
Vue.use(VueSweetalert2);

// 多國語系 i18n
import i18n from './i18n/i18n'


Vue.config.productionTip = false

/// api
import apiService from './api.js';
Vue.prototype.$apiService = new apiService(axios, store);

new Vue({
  router,
  store,
  render: h => h(App),
  axios,
  VueAxios,
  i18n
}).$mount('#app')
