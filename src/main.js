import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueCookie from 'vue-cookies';

import VueSocketIO from 'vue-socket.io-extended'
import SocketIO from 'socket.io-client'
import VueI18n from 'vue-i18n'
import locals from './locals'
import VueFileAgent from "vue-file-agent";

import 'vue-file-agent/dist/vue-file-agent.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueCookie)
Vue.use(VueFileAgent);
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages:locals
});

const ioInstance = SocketIO(''+process.env.VUE_APP_URL, {
        reconnection: true,
        reconnectionDelay: 500,
        maxReconnectionAttempts: Infinity
});
Vue.use(VueSocketIO,ioInstance,{ store })


Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
