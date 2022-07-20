<template>
  <div id="app">
    <mentorNavbar />
    <router-view />
  </div>
</template>


<script>
import VueCookie from "vue-cookies";
import { mapActions,mapGetters } from "vuex";
import mentorNavbar from "./components/widgets/mentorNavbar.vue";

export default {
  methods: {
    ...mapActions(["LoginMentorByCookie"]),
  },
  computed:{
    ...mapGetters(['Mentor'])
  },
  components: {
    mentorNavbar,
  },
  data() {
    return {
      hideOn: ["home", "login", "register", "mentorMeetPrepare", "mentorMeetRoom"],
    };
  },
  watch:{
    Mentor(newVal){
      if(newVal){
        this.$socket.client.emit('MENTOR_JOIN',newVal)
      }
    }
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
