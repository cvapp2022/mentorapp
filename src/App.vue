<template>
  <div id="app">
    <router-view />
  </div>
</template>


<script>
import VueCookie from "vue-cookies";
import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions(["LoginMentorByCookie"]),
  },
  mounted() {
    //Check Cookie
    var Token = VueCookie.get("mentorToken");
    if (Token) {
      this.LoginMentorByCookie({ Token });
    }
  },
};
</script>


<style>
</style>
