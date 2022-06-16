import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueCookie from 'vue-cookies';

import VueSocketIO from 'vue-socket.io-extended'
import SocketIO from 'socket.io-client'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueCookie)

const ioInstance = SocketIO('http://127.0.0.1:5000', {
        reconnection: true,
        reconnectionDelay: 500,
        maxReconnectionAttempts: Infinity
});
Vue.use(VueSocketIO,ioInstance,{ store })


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
