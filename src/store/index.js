import Vue from 'vue'
import Vuex from 'vuex'


import mentor from './modules/mentor';
import request from './modules/request';
import session from './modules/session';

Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    mentor,
    request,
    session

  }
})
