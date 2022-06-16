import Vue from 'vue'
import VueRouter from 'vue-router'

import VueCookie from 'vue-cookies';
import _ from 'lodash';
import store from '../store/index'

import Home from '../views/Home.vue'


import { mentorRoutes } from './mentorRoutes'

Vue.use(VueRouter)


const mainroutes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },

]

const combineRoutes = [
  mainroutes,
  mentorRoutes
]

const routes = combineRoutes.flat();

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  //mentor guard start 

  var TokenM = store.getters.MentorToken
  if (to.meta.requireMentorGuest && !_.isEmpty(TokenM)) {
    router.push({ name: 'mentorDashboard' });
  }
  else if (to.meta.requireMentorAuth  && _.isEmpty(TokenM)) {
    //check if has cookie

    var MentorTokenC = VueCookie.get('mentorToken')
    if (MentorTokenC) {
      console.log()
    }
    else {
      router.push({ name: 'home' });
    }

  }

  //mentor guard end


  next()

})

export default router
